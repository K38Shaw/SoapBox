# Use the official Python image
FROM python:3.9

# Set working directory inside the container
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code into the container
COPY . .

# Expose the port the backend service listens on
EXPOSE 8000

# Command to run the backend
CMD ["python", "app.py"]
