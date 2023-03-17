# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server files to the container
COPY . .

# Expose port 4001
EXPOSE 4001

# Start the server
CMD ["npm", "start"]
