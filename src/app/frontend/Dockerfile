# Use an official node image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY src/ .

# Build the React app
RUN npm run build

# Serve the app using a static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose port 3000
EXPOSE 3000
