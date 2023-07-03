FROM node:18-alpine

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /front_bioinf

# Update working directory
WORKDIR /front_bioinf

COPY package*.json ./

RUN npm install --legacy-peer-deps

CMD npm start

