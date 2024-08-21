from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb+srv://tminhthong1999:Concac321!@cluster0.klyz7gr.mongodb.net/')
db = client['courses_db']
collection = db['courses']


def serialize_doc(doc):
    """Helper function to convert MongoDB document to JSON serializable format."""
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
    return doc


@app.route('/get_courses', methods=['GET'])
def get_courses():
    courses = collection.find()
    serialized_courses = [serialize_doc(course) for course in courses]
    return jsonify(serialized_courses)


@app.route('/update_course/<course_id>', methods=['PUT'])
def update_course(course_id):
    """Update a course by ID."""
    course_data = request.json
    result = collection.update_one(
        {"_id": ObjectId(course_id)},
        {"$set": course_data}
    )

    if result.matched_count > 0:
        return jsonify({"status": "success", "modified_count": result.modified_count})
    else:
        return jsonify({"status": "error", "message": "Course not found"}), 404


@app.route('/delete_course/<course_id>', methods=['DELETE'])
def delete_course(course_id):
    """Delete a course by ID."""
    result = collection.delete_one({"_id": ObjectId(course_id)})

    if result.deleted_count > 0:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": "Course not found"}), 404


@app.route('/create_course', methods=['POST'])
def create_course():
    """Create a new course."""
    course_data = request.json
    result = collection.insert_one(course_data)

    return jsonify({"status": "success", "id": str(result.inserted_id)})


if __name__ == '__main__':
    app.run(debug=True)
