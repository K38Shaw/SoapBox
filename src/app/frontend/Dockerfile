# Use the Node.js LTS image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Run the build command to generate the .next directory
RUN npm run build

RUN ls -la .next

# Expose the necessary port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
