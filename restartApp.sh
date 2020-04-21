#!/bin/bash

# install sshpass
apt-get install sshpass

# Environment variable and script
USERNAME=dje
PASS=uha40
HOSTS="10.3.1.78"
SCRIPT="
echo -e '\e[1m\e[96m moove to project folder \e[0m'
cd alsace-mirror/

echo -e '\e[1m\e[96m Stop docker compose \e[0m'
docker-compose stop

echo -e '\e[1m\e[96m Git pull \e[0m'
git pull

echo -e '\e[1m\e[96m Build docker compose \e[0m'
docker-compose build

echo -e '\e[1m\e[96m Up docker compose \e[0m'
docker-compose up -d
"
# ssh connect to host machine
sshpass -p ${PASS} ssh -o StrictHostKeyChecking=no -l ${USERNAME} ${HOSTS} "${SCRIPT}"
