# Use the official image as a parent image.
FROM node:15.4.0-slim

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package*.json ./

# Run the command inside your image filesystem.
RUN npm install
RUN npm install -g typescript
RUN npm install -g typeorm
RUN npm install -g ts-node

# COPY . .
# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

WORKDIR /usr/src/app/src
# Run the specified command within the container.
CMD [ "npm", "start" ]