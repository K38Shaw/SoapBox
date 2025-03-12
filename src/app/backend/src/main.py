from flask import Flask, jsonify # type: ignore

app = Flask(__name__)

test_data = {
    "message": "Welcome to the Flask API",
    "status": "success"
}
@app.route('/api/test', methods=['GET'])
def get_test_data():
    return jsonify(test_data)

if __name__ == '__main__':
    app.run(debug=True)
