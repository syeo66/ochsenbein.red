FROM node:18 as node
WORKDIR /usr/src/app
RUN apt-get update && apt-get install -y libvips
COPY package*.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN make build

RUN find /usr/src/app/public -type f -exec chmod 644 {} \;

FROM nginx as server

EXPOSE 80

COPY --from=node /usr/src/app/public /usr/share/nginx/html

