# VERSION 1.0.0
FROM resin/rpi-raspbian:jessie
MAINTAINER Spaceify Oy

RUN apt-get update

RUN apt-get install apt-utils

RUN apt-get upgrade -y

RUN apt-get install -y openssh-server screen unzip netcat nano dnsutils

RUN apt-get install -y python-software-properties python g++ make software-properties-common fakeroot

RUN apt-get install -y libssl-dev libsqlite3-dev libzip-dev

RUN apt-get install -y curl openssl sqlite3

RUN apt-get install -y nodejs

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get install -y npm

RUN npm install npm -g

RUN npm cache clear -f

RUN npm install -g n

RUN n 6.2.2

RUN mkdir -p /var/run/sshd

# username: spaceify, password: spaceify123
RUN useradd -u 12345 -g users -d /home/spaceify -s /bin/bash -p '$1$xyz$YbrofsNE.j8evvfa3Sivo1' spaceify
RUN usermod -aG sudo spaceify

RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
