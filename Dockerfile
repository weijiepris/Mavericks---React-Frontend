# Use an official Node.js runtime as the base image
FROM node:14-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React app
RUN npm run build

# Create a new image for serving the application
FROM nginx:alpine

# Copy the built app from the build image to the nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# The default command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]
