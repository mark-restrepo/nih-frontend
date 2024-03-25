# Dockerfile

FROM node:20.11.1-alpine3.18
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm install
RUN mkdir -p src/
COPY src/. src/
RUN mkdir -p public/
COPY public/. public/
EXPOSE 3000
CMD [ "npm", "start"]
