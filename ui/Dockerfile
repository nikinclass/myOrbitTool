FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 3000
CMD ["npm","run","dev"]