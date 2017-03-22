#!/bin/bash -e
apt-get install -y apt-transport-https ca-certificates

apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
sh -c "echo deb https://apt.dockerproject.org/repo ubuntu-xenial main\ > /etc/apt/sources.list.d/docker.list"

sudo rm /etc/apt/sources.list.d/spaceify.list > /dev/null 2>&1
sudo sh -c "wget -qO- https://spaceify.net/repo/gpg | apt-key add -"
sudo sh -c "echo deb [ arch=all,amd64,i386 ] http://spaceify.net/repo stable/spaceify main > /etc/apt/sources.list.d/spaceify.list"

apt-get update

apt-get install -y dpkg-dev debhelper dh-systemd nodejs
apt-get purge -y lxc-docker
apt-cache policy docker-engine
apt-get install -y docker-engine
apt-get install -y linux-image-extra-$(uname -r)
apt-get update
