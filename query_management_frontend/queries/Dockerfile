# Use a base image with Node.js
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Install serve to run the production build# Use a base image with Node.js
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the frontend package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the React development server
CMD ["npm", "start"]

RUN npm install -g serve

# Expose the port serve runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
