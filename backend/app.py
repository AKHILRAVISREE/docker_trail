from flask import Flask, request, jsonify
from buisness import get_data

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!"

@app.route('/submit', methods=['POST', 'GET'])
def submit():
    if request.method == 'POST':
        data = request.get_json(silent=True) or request.form.to_dict()
    else:
        data = request.args.to_dict()
    # Process the submitted data
    return jsonify({"message": "Data received successfully", "received_data": data})

if __name__ == '__main__':
    app.run(port=8000, host='0.0.0.0', debug=True)