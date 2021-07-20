FROM node:14-alpine3.14

WORKDIR /client

RUN npm install -g serve

COPY package.json /client
RUN npm install

COPY . /client
RUN npm run build

CMD serve -p $PORT -s public