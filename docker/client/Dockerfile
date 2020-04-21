#FROM alsace_server:latest
FROM beevelop/ionic:v4.12.0


#RUN mkdir /home/node/app/client
#WORKDIR /home/node/app/client
WORKDIR /app/client

#COPY . .
#COPY ../public ../


#RUN npm install && npm rebuild node-sass
#RUN npm install -g ionic@4.12 cordova && npm i && npm rebuild node-sass
#CMD npm install && npm rebuild node-sass && ionic serve -p 8100
CMD npm i && npm rebuild node-sass && ionic serve -p 8100
