# Use Node 20
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies INSIDE container
RUN npm install

# Copy rest of files
COPY . .

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]