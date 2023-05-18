FROM node:alpine

WORKDIR /usr/app
COPY package.json .
RUN npm install && npm cache clean --force

COPY ./build ./build
COPY ./.env .

EXPOSE ${NODE_DOCKER_PORT}
CMD ["npm", "run", "start"]
