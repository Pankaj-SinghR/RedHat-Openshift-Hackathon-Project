FROM node:18.12.1
COPY ./ /home/app
WORKDIR /home/app/
RUN npm install
ENTRYPOINT ["node","main.js"]