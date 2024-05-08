# Use the official Node.js 20 Alpine image as a base image
FROM node:20-alpine

# Install build dependencies
RUN apk --no-cache add \
    bash \
    g++ \
    ca-certificates \
    lz4-dev \
    musl-dev \
    cyrus-sasl-dev \
    openssl-dev \
    make \
    python3

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (or package-lock.json) files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Ensure .env file is copied (if you have one)
COPY .env ./

# Expose the port your app runs on
EXPOSE 8081

# Command to run the application
CMD ["node", "src/server.js"]
