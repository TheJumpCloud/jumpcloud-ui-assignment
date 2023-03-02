FROM node:16

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .
