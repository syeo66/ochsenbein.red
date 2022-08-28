FROM node:16 as node
WORKDIR /usr/src/app
COPY package*.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN make build

FROM nginx as server

EXPOSE 80

COPY --from=node /usr/src/app/public /usr/share/nginx/html

