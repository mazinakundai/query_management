Query Management System
Overview
The Query Management System is a full-stack application designed to handle and manage queries efficiently. It comprises a backend built with Django and a frontend developed using React. The backend provides a RESTful API for managing queries, while the frontend offers a user-friendly interface for interacting with the system.

Features
User authentication and authorization
Query management (create, read, update, delete)
Custom exception handling
CORS support for frontend-backend communication
Technologies
Backend: Django, Django REST Framework, MySQL
Frontend: React, CSS/SCSS
Containerization: Docker
Prerequisites
Python 3.9
Node.js and npm
Docker and Docker Compose
MySQL
Backend Setup
Configuration
The backend configuration is managed in the query_management/settings.py file. Ensure you have the correct database configurations:

python
Copy code
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DATABASE_NAME'),
        'USER': os.environ.get('DATABASE_USER'),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD'),
        'HOST': os.environ.get('DATABASE_HOST'),
        'PORT': os.environ.get('DATABASE_PORT', '3306'),
    }
}
Database Setup
To create the database and user in MySQL, use the following script:

sql
Copy code
CREATE DATABASE query_management;
CREATE USER 'queryMgtUser'@'%' IDENTIFIED BY 'queryMgtPass01#';
GRANT ALL PRIVILEGES ON query_management.* TO 'queryMgtUser'@'%';
FLUSH PRIVILEGES;
You can execute this script in the MySQL shell:

sh
Copy code
mysql -u root -p
Then paste the script and execute it.

Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/query-management-system.git
cd query-management-system
Create a virtual environment and activate it:

sh
Copy code
python3 -m venv env
source env/bin/activate
Install dependencies:

sh
Copy code
pip install -r requirements.txt
Run database migrations:

sh
Copy code
python manage.py migrate
Create a superuser:

sh
Copy code
python manage.py createsuperuser
Run the development server:

sh
Copy code
python manage.py runserver
Docker Setup
Docker Configuration
Ensure the Dockerfile and docker-compose.yml are correctly configured.

Dockerfile
dockerfile
Copy code
# Use a base image with Python
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev-compat \
    libmariadb-dev \
    pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the backend requirements file
COPY requirements.txt .

# Install the dependencies 
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
Building and Running with Docker
Build the Docker image:

sh
Copy code
docker build -t query-management-backend .
Run the Docker container:

sh
Copy code
docker run -p 8000:8000 --env-file .env query-management-backend
Frontend Setup
Installation
Navigate to the frontend directory:

sh
Copy code
cd frontend
Install dependencies:

sh
Copy code
npm install
Run the development server:

sh
Copy code
npm start

Running the Application
Ensure the backend is running on http://localhost:8000.
Ensure the frontend is running on http://localhost:3000.
You should now be able to access the Query Management System at http://localhost:3000.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome! Please open an issue or submit a pull request.

