# VERSION 2.0.0
FROM ubuntu:16.04
MAINTAINER Spaceify Oy

RUN apt-get update

RUN apt-get upgrade -y

RUN apt-get install -y openssh-server screen unzip netcat nano dnsutils

RUN apt-get install -y python-software-properties python g++ make software-properties-common fakeroot curl

RUN apt-get install -y libssl-dev libsqlite3-dev libzip-dev

RUN apt-get install -y curl openssl sqlite3

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
#RUN npm cache clear -f
#RUN npm install -g npm
RUN npm install -g n
RUN n 6.2.2
RUN npm uninstall node-gyp
RUN npm install -g node-gyp
RUN npm uninstall bufferutil
RUN npm install -g bufferutil

RUN mkdir -p /var/run/sshd

# username: spaceify, password: spaceify123
RUN useradd -u 12345 -g users -d /home/spaceify -s /bin/bash -p '$1$xyz$YbrofsNE.j8evvfa3Sivo1' spaceify
RUN usermod -aG sudo spaceify

RUN apt-get clean

RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
