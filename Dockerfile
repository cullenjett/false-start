# build ===============================
FROM node:12.10 as build

ENV NODE_ENV production

ENV PORT 3000

WORKDIR /false-start

COPY package*.json ./

RUN npm install

COPY . .

RUN node scripts/generate-nginx-config.js

RUN npm run build

# run ===============================
FROM nginx:1.17-alpine as run

COPY --from=build /false-start/build /var/www

COPY --from=build /false-start/nginx.conf /etc/nginx

EXPOSE ${PORT}

CMD ["nginx","-g","daemon off;"]
