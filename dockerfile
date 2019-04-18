# STEP 1 build static website
FROM node:10.15-alpine as builder
RUN apk update && apk add --no-cache make git
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package.json package-lock.json  /app/

RUN cd /app
RUN npm install npm@latest -g
RUN npm install
RUN npm link @angular/cli@8.0.0-beta.15
# Copy project files into the docker image
COPY .  /app
RUN cd /app
RUN ng build --prod
# STEP 2 build a small nginx image with static website
FROM nginx:alpine
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
## From 'builder' copy website to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
