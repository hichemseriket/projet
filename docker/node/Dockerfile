FROM node:12

WORKDIR /app

#COPY package.json .

#RUN npm install ts-node -g && npm i typeorm -g

#COPY . .

#RUN npm run build && pwd && ls -la
#RUN pwd && ls -la

CMD rm -Rf dist && npm i && npm run start
#CMD chmod 777 restartApp.sh && npm i && typeorm migration:run && npm run start
