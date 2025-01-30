# Use the official Python image
FROM python:3.9

# Set working directory inside the container
WORKDIR /app

# Copy the Python dependencies list (if it exists later, uncomment this)
COPY requirements.txt .

# Temporarily skip dependency installation until `requirements.txt` is available
RUN if [ -s requirements.txt ]; thenpip install --no-cache-dir -r requirements.txt; fi

# Copy all backend source files into the container
COPY . .

# Adjust entry point based on your structure (e.g., src/main.py or similar)
CMD ["python", "src/main.py"]
