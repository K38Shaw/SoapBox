# Use the Node.js LTS image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose the port for the React development server
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
