# Use an official Python runtime as a parent image
FROM python:3.10-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY src/ .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available
EXPOSE 8000

# Run the backend
CMD ["python", "app.py"]
