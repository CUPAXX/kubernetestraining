FROM node:alpine

WORKDIR /src/app

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]