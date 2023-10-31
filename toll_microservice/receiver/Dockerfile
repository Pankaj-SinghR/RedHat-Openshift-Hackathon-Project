FROM node:18.12.1
COPY ./ /home/app
WORKDIR /home/app/
RUN npm install
EXPOSE 8080/tcp
ENTRYPOINT ["node","receiver.js"]