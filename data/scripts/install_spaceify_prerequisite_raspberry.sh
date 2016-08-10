#!/bin/bash -e

#install docker

curl -sSL http://downloads.hypriot.com/docker-hypriot_1.10.1-1_armhf.deb >/tmp/docker-hypriot_1.10.3-1_armhf.deb
sudo dpkg -i /tmp/docker-hypriot_1.10.3-1_armhf.deb
rm -f /tmp/docker-hypriot_1.10.3-1_armhf.deb
sudo sh -c 'usermod -aG docker $SUDO_USER'
sudo systemctl enable docker.service


