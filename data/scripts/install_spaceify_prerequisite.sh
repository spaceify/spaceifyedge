#!/bin/bash -e
apt-get install apt-transport-https ca-certificates
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sh -c "echo deb https://apt.dockerproject.org/repo ubuntu-xenial main\ > /etc/apt/sources.list.d/docker.list"
apt-get update
apt-get install dpkg-dev debhelper dh-systemd nodejs
apt-get purge lxc-docker
apt-cache policy docker-engine
apt-get install docker-engine
apt-get install linux-image-extra-$(uname -r)
apt-get update
