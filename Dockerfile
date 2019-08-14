# FROM node:10.13-alpine
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 6661
# CMD npm start

FROM centos
MAINTAINER lemonpaimc
RUN yum -y install wget
RUN yum -y install git 
RUN yum -y install net-tools
RUN mkdir -p /home/app
WORKDIR /home/app
RUN mkdir -p /usr/local/nodejs
RUN wget https://nodejs.org/dist/v10.16.2/node-v10.16.2-linux-x64.tar.xz
RUN xz -d node-v10.16.2-linux-x64.tar.xz
RUN tar -xvf node-v10.16.2-linux-x64.tar
RUN rm -rf node-v10.16.2-linux-x64.tar.xz
RUN rm -rf node-v10.16.2-linux-x64.tar
RUN mv node-v10.16.2-linux-x64 /usr/local/nodejs

RUN ln -s  /usr/local/nodejs/node-v10.16.2-linux-x64/bin/* /usr/bin/
RUN npm install -g yarn
RUN npm install -g pm2
RUN ls -s /usr/local/nodejs/node-v10.16.2-linux-x64/bin/pm2* /usr/bin/
CMD [ "node", "--version" ]