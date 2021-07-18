FROM node:14-alpine3.14

WORKDIR /server

COPY package.json /server
RUN npm install

COPY . /server

CMD ["npm", "server"]