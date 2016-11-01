#!/bin/bash

echo "docker image to find: ${1}"

DOCKERID="$(sudo docker ps -aqf \"ancestor=${1}\")"
echo "docker id = ${DOCKERID}"
sudo docker exec -i -t ${DOCKERID} /bin/bash

