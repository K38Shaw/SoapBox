# Use the official Node.js image
FROM node:16

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the React source code into the container
COPY . .

# Expose the port for the React development server
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
