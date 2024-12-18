FROM node

WORKDIR /backend

COPY package*.json /backend
RUN npm cache clean --force && npm install

COPY . .
EXPOSE 5000

CMD [ "npm", "start" ]