FROM docker.io/node
MAINTAINER wangchao3012@163.com

ENV HTTP_PORT 3000

COPY . /app
WORKDIR /app

RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

EXPOSE 5000

CMD ["npm", "build"]