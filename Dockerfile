FROM nodejs:v1
ENV NODE_ENV production
WORKDIR /home/app
RUN mkdir -p /authgrpc
WORKDIR /home/app/authgrpc
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY . .
RUN yarn
EXPOSE 3000
CMD yarn start:prod