# build stage
FROM node:18-alpine as build-stage
WORKDIR /app
RUN npm set registry "https://registry.npmmirror.com/"
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build:docs
RUN pnpm build:site

# production stage
FROM nginx:stable-alpine as production-stage

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV TZ Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build-stage /app/site /usr/share/nginx/html/site
COPY --from=build-stage /app/docs /usr/share/nginx/html/docs
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
