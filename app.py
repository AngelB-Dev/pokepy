from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)

DATA_FILE = os.path.join('data', 'game_data.json')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/save', methods=['POST'])
def save_progress():
    data = request.json
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)
    return jsonify({"status": "success"}), 200

@app.route('/api/load', methods=['GET'])
def load_progress():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
        return jsonify(data), 200
    else:
        return jsonify({"status": "error", "message": "No data found"}), 404

if __name__ == '__main__':
    app.run(debug=True)