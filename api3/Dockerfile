FROM node:16.11.1
WORKDIR /usr/app
ADD package*.json ./
RUN npm install -qyg nodemon@2.0.15
RUN npm install
ADD . .
EXPOSE 49153
CMD ["npm start dev"]