FROM node:10-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn
COPY . .

RUN yarn build

EXPOSE 80
EXPOSE 443
EXPOSE 8080
EXPOSE 3002
