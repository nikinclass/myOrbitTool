# Specify the node base image with your desired version, e.g. node:<version>
FROM node:alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
EXPOSE 8080
CMD ["npm", "run", "dev"]
