FROM node:14-alpine3.14

WORKDIR /Server

COPY package.json /Server
RUN npm install

COPY . /Server

CMD ["npm", "run", "server"]