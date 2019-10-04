# build ===============================
FROM node:12.10 as build

WORKDIR /false-start

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# run ===============================
FROM nginx:1.17-alpine as run

COPY --from=build /false-start/build /var/www

COPY nginx.conf /etc/nginx

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
