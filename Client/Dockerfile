FROM node:14-alpine3.14

WORKDIR /client

COPY package.json /client
RUN npm install

COPY . /client

CMD ["npm", "client"]