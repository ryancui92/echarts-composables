# build stage
FROM node:16.13.0 as build-stage
WORKDIR /app
RUN npm set registry "https://registry.npmmirror.com/"
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:docs

# production stage
FROM nginx:stable-alpine as production-stage

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV TZ Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build-stage /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
