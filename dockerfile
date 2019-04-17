FROM node:11-alpine as node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm link @angular/cli
RUN ng build --prod --build-optimizer
FROM nginx:mainline-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /usr/src/app/dist/minhas-financas-webapp /usr/share/nginx/html
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
