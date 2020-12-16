FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["npm", "run", "serve"]