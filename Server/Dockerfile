FROM node:14-alpine3.14

WORKDIR /Server

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "server"]