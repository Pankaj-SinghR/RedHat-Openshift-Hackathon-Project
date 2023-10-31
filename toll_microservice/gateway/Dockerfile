FROM node:18.12.1
COPY ./ /home/app
WORKDIR /home/app/
RUN npm install
RUN npx prisma generate
ENTRYPOINT [ "node","app.js" ]