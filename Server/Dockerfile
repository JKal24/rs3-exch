FROM node:14-alpine3.14

WORKDIR /Server

COPY package.json .
RUN npm install

COPY . /Server

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "server"]