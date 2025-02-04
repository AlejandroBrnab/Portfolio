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
CORS(app)

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
                                 issuer=f"https://{AUTH0_DOMAIN}/")
            return payload
    except Exception:
        return None  # Invalid token


# Auth0 authentication decorator
def requires_auth(f):
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

        return f(*args, **kwargs)

    return decorated


# Public API route (Anyone can access)
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = list(projects_collection.find({}, {'_id': 0}))
    return jsonify(projects)


# Protected API route (Only authenticated users can access)
@app.route('/api/projects', methods=['POST'])
@requires_auth
def add_project():
    data = request.json
    if not data:
        return jsonify({"message": "Invalid request"}), 400

    projects_collection.insert_one(data)
    return jsonify({"message": "Project added successfully"}), 201


@app.route('/api/auth0-config', methods=['GET'])
def get_auth0_config():
    return jsonify({
        "domain": AUTH0_DOMAIN,
        "clientId": os.getenv("AUTH0_CLIENT_ID")
    })

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
