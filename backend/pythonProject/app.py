import uuid
from bson import ObjectId
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import requests
from functools import wraps
from jose import jwt

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
ALGORITHMS = ["RS256"]

# Initialize Flask app

app = Flask(__name__)
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
CORS(app, origins=["http://localhost:5173"])


# Handle preflight (OPTIONS) requests
@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['Portfolio']
projects_collection = db['projects']

# Function to get Auth0 public key
def get_auth0_public_key():
    url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    response = requests.get(url)
    return response.json()

# Function to verify JWT token
def verify_jwt(token):
    try:
        header = jwt.get_unverified_header(token)
        keys = get_auth0_public_key()["keys"]

        rsa_key = {}
        for key in keys:
            if key["kid"] == header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break

        if rsa_key:
            payload = jwt.decode(token, rsa_key, algorithms=ALGORITHMS, audience=API_AUDIENCE,
                                 issuer=f"https://{AUTH0_DOMAIN}")
            return payload
        else:
            print("RSA key not found")
    except jwt.ExpiredSignatureError:
        print("Token has expired")
    except jwt.JWTClaimsError:
        print("Incorrect claims, please check the audience and issuer")
    except Exception as e:
        print(f"Unable to parse authentication token: {e}")
    return None  # Invalid token

# Auth0 authentication decorator with permission check
def requires_auth(permission=None):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            auth_header = request.headers.get("Authorization", None)
            if not auth_header:
                return jsonify({"message": "Authorization header is missing"}), 401

            parts = auth_header.split()
            if parts[0].lower() != "bearer" or len(parts) != 2:
                return jsonify({"message": "Invalid Authorization header"}), 401

            token = parts[1]
            payload = verify_jwt(token)
            if payload is None:
                return jsonify({"message": "Invalid or expired token"}), 401

            # Check for the 'permissions' claim if permission is provided
            if permission and permission not in payload.get("permissions", []):
                return jsonify({"message": "Permission denied"}), 403

            return f(*args, **kwargs)
        return decorated
    return decorator

def some_unique_value():
    return str(uuid.uuid4())  #

# Public API route (Anyone can access)
@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        # Fetch all projects
        projects = db.projects.find()  # Adjust the collection name if needed

        # Convert ObjectId to string and return the result
        projects_list = []
        for project in projects:
            # Convert MongoDB ObjectId to string for JSON compatibility
            project['_id'] = str(project['_id'])
            projects_list.append(project)

        return jsonify(projects_list), 200
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return jsonify({"error": "Failed to fetch projects"}), 500


# Protected route - Only Admins can add projects
@app.route('/api/projects', methods=['POST'])
def add_project():
    data = request.json
    if not data:
        return jsonify({"message": "Invalid request"}), 400

    projects_collection.insert_one(data)
    return jsonify({"message": "Project added successfully"}), 201

@app.route('/api/projects/<string:project_id>', methods=['DELETE'])
def delete_project(project_id):
    try:
        # Convert the project_id (which is a string) to ObjectId
        project_object_id = ObjectId(project_id)

        # Delete the project from the database
        result = db.projects.delete_one({"_id": project_object_id})

        if result.deleted_count > 0:
            return jsonify({"message": "Project deleted successfully"}), 200
        else:
            return jsonify({"error": "Project not found"}), 404
    except Exception as e:
        print(f"Error deleting project: {e}")
        return jsonify({"error": "Failed to delete project"}), 500

@app.route('/api/projects/<string:project_id>', methods=['PUT'])
def update_project(project_id):
    try:
        # Convert the project_id (which is a string) to ObjectId
        project_object_id = ObjectId(project_id)

        # Get the updated data from the request body
        updated_data = request.get_json()

        # Update the project in the database
        result = db.projects.update_one(
            {"_id": project_object_id},
            {"$set": updated_data}  # The updated data will be set
        )

        if result.matched_count > 0:
            return jsonify({"message": "Project updated successfully"}), 200
        else:
            return jsonify({"error": "Project not found"}), 404
    except Exception as e:
        print(f"Error updating project: {e}")
        return jsonify({"error": "Failed to update project"}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)