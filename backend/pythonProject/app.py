from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client['Portfolio']  # Replace with your database name
projects_collection = db['projects']  # Replace with your collection name

print("Connected to MongoDB:", client.list_database_names())
print("Collections in 'portfolio_db':", db.list_collection_names())


# API Routes
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = list(projects_collection.find({}, {'_id': 0}))  # Exclude MongoDB's _id field
    return jsonify(projects)

@app.route('/api/test', methods=['GET'])
def test_route():
    return "Flask is working!"

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
