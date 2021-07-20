FROM node:14-alpine3.14

WORKDIR /Client

RUN npm install -g serve

COPY package.json /Client
RUN npm install

COPY . /Client
RUN npm run build

CMD serve -p $PORT -s public