from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# MongoDB connection
client = MongoClient("mongodb://localhost:27017/asigndata")
db = client["asigndata"]
users_collection = db["asigndata"]
intros_collection = db["introductions"]

@app.route('/')
def home():
    return render_template("login.html")

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username == 'mahesh' and password == '123':
        return jsonify({"success": True})
    return jsonify({"success": False})

@app.route('/admin')
def admin():
   
    intros = intros_collection.find({"status": "Pending for Super Admin Approval"})
    intros_list = [{"_id": str(intro["_id"]), "introduction": intro["introduction"], "status": intro["status"]} for intro in intros]
    return render_template("admin.html", intros=intros_list)

@app.route('/introduce')
def introduce():
    return render_template("introduce.html")

@app.route('/submit-intro', methods=['POST'])
def submit_intro():
    data = request.get_json()
    introduction = data.get('introduction')

    intros_collection.insert_one({"introduction": introduction, "status": "Pending for Super Admin Approval"})
    return jsonify({"success": True})

@app.route('/get-intros', methods=['GET'])
def get_intros():
    intros = intros_collection.find()
    intros_list = [{"_id": str(intro["_id"]), "introduction": intro["introduction"], "status": intro["status"]} for intro in intros]
    return jsonify({"intros": intros_list})

@app.route('/approve-intro', methods=['POST'])
def approve_intro():
    data = request.get_json()
    intro_id = data.get('id')
    
    intros_collection.update_one({"_id": ObjectId(intro_id)}, {"$set": {"status": "Approved"}})
    return jsonify({"success": True})

@app.route('/reject-intro', methods=['POST'])
def reject_intro():
    data = request.get_json()
    intro_id = data.get('id')

    intros_collection.update_one({"_id": ObjectId(intro_id)}, {"$set": {"status": "Rejected"}})
    return jsonify({"success": True})

@app.route('/logout')
def logout():
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
