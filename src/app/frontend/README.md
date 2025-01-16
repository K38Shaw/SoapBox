
# Frontend Service

This directory contains the frontend service for the fullstack application. It is a React-based application that communicates with the backend service via APIs.

## Setup Instructions

### Environment Variables

- Create a `.env` file in this directory.
- Add the following environment variables:

```
REACT_APP_API_URL=http://localhost:8000/api
PORT=3000
```

### Docker Setup

1. The `Dockerfile` defines the configuration for the React frontend.
2. Build and run the container:
   ```bash
   docker-compose up --build
   ```

### Running the Frontend Locally

You can also run the frontend locally without Docker:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the frontend:
   ```bash
   npm start
   ```

### Testing

Tests are located in the `__tests__` directory. Run the tests with:

```bash
npm test
```
### Features
This frontend service provides the following features:
This frontend services needs to be updated with the features that are provided by the frontend service.
### App Structure

The frontend uses the following directory structure:

```
src/
├── components/         # Reusable components
├── pages/              # Page components
├── hooks/              # Custom hooks
└── services/           # API service logic
```

### Build

To build the frontend for production:

```bash
npm run build
```
