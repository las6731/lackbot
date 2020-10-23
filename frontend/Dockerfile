FROM node:current-alpine AS build-env
WORKDIR src/

# install dependencies
COPY package*.json ./
RUN npm install

# build angular application
COPY . .
RUN npm run build

FROM nginx:1.19.3-alpine

# copy angular app
COPY --from=build-env src/dist/* /usr/share/nginx/html
