FROM node:latest

ENV DEBIAN_FRONTEND noninteractive
RUN npm install
RUN npm start
WORKDIR /home/node
EXPOSE 8000