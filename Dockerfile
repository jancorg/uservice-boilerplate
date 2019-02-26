FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8000
CMD [ "npm", "start" ]