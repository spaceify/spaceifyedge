# VERSION 2.2.0
FROM resin/rpi-raspbian:jessie
MAINTAINER Spaceify Oy

RUN apt-get update

RUN apt-get install -y apt-utils

RUN apt-get upgrade -y

RUN apt-get install -y screen unzip netcat nano dnsutils

RUN apt-get install -y python-software-properties python g++ make software-properties-common fakeroot curl sudo net-tools

RUN apt-get install -y libssl-dev libsqlite3-dev libzip-dev

RUN apt-get install -y curl openssl sqlite3

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install npm -g
RUN npm cache clear -f
RUN npm install -g n
RUN n 6.2.2
RUN sudo npm uninstall node-gyp
RUN sudo npm install --unsafe-perm -g node-gyp
RUN sudo npm uninstall bufferutil
RUN sudo npm install --unsafe-perm -g bufferutil

# RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get autoremove -y
RUN apt-get clean
RUN apt-get autoclean
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
