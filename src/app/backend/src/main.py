from flask import Flask, jsonify
from services.couchbaseServices import SoapboxAPIService
from routes import init_app

# Create the Flask app
app = Flask(__name__)

# Home route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Soapbox API!"})

# Initialize the API routes
init_app(app)

def main():
    # Initialize and setup the SoapboxAPIService
    api_service = SoapboxAPIService()
    api_service.setup()
    print("Soapbox API Service is ready.")
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == "__main__":
    main()


