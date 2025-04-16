from flask import Flask, jsonify
from services.couchbaseServices import SoapboxAPIService
# from app.backend.src.services.couchbaseServices import SoapboxAPIService

# Create the Flask app
app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask App!"})

if __name__ == "__main__":
    app.run(debug=True)

def main():
    api_service = SoapboxAPIService()
    api_service.setup()
    print("Soapbox API Service is ready.")

if __name__ == "__main__":
    main()


