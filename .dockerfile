FROM node:alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn -i

COPY . .

CMD [ "node", "src/server.js" ]