# Spaceify

**Version 0.9.0 Alpha Centauri (developer-pre-alpha)**

[Spaceify](https://spaceify.org/) is a client-edge-server ecosystem that seamlessly integrates your physical space with the web. With Spaceify you can give web apps controlled access to resources such as big screens, sensors and lighting in your space.


## Installation

### VirtualBox virtual machine

The easiest way to test Spaceify Edge node is to run ready-made VirtualBox image. Follow the instructions in [Spaceify.org](https://spaceify.org/virtual_machine.php).


### From package repository

If you have an existing Ubuntu installation and you wish to run Spaceify Edge on it then you can install ready-build package from out repository. Follow the instructions in [Spaceify.org](https://spaceify.org/debian_package.php).


### Building and installing the package from source

These instruction apply at least on vanilla Ubuntu 16.04.x server running inside VirtualBox.

There's an assumption that three network interfaces has been configured:

* `NAT` for Internet access
* Host-only `vbox0` for communication between host machine (192.168.56.1)
* Host-only `vbox1` for communication to Spaceify users). (192.168.56.2)

For the network setup details in VirtualBox, see this [guide](https://spaceify.org/wiki/doku.php?id=tutorials:running_spaceify_in_virtualbox).


#### 1. Setup your OS

1.1. Convert your ethernet interfaces to match the old naming convention (e.g. `ens33` -> `eth0`). Follow this [tutorial](http://www.itzgeek.com/how-tos/mini-howtos/change-default-network-name-ens33-to-old-eth0-on-ubuntu-16-04.html).


1.2. If you’re running inside VirtualBox then you need to setup the `eth1` interface to be available for communication between the host machine and virtual machine. Edit the file */etc/network/interface*:
```
sudo nano /etc/network/interface
```
and add the following lines there:
```
# Virtual machine interface
auto eth1
iface eth1 inet static 
address 192.168.56.2
netmask 255.255.255.0
```


1.3. It's handy to have a SSH server running
```
sudo apt-get install openssh-server
```


1.4. Reboot for network settings to take effect
```
sudo reboot
```


1.5. Now you should be able to access the virtual machine with SSH
```
ssh username@192.168.56.2
```


#### 2. Building the package

2.1. Retrieve the source code from github
```
git clone https://github.com/spaceify/spaceifyedge
cd spaceifyedge
```


2.2. Install prerequisites
```
sudo data/scripts/install_spaceify_prerequisite.sh
```


2.3. Build the Spaceify Edge package
```
sudo ./build_package.sh
```


#### 3. Installing the package

3.1. Package should reside now in */tmp/build*. Let’s install it:
```
sudo dpkg -i /tmp/build/spaceify_0.9.0_all.deb
sudo apt-get install -f
```


3.2. Danted SOCKS proxy is still missing from this version so it needs to be installed separately
```
sudo apt-get install danted
sudo cp data/scripts/danted.conf /etc/danted.conf
sudo service danted restart
```


#### 4. Configure the Socks Proxy Settings of Your Web Browser

In order to see the web the way Spaceify clients see it, you need to configure your web browser to use the socks proxy server of the Spaceify virtual machine. Configure your web browser to use sock proxy at `192.168.56.2` port `1080`. In the screenshot below you can see how this is done in the Firefox. Read more about DNS lookup from [here](http://www.commandlineisking.com/2008/09/firefox-have-your-proxy-do-dns-lookups.htm).
![Configure Firefox SOCKS proxy](https://spaceify.org/wiki/lib/exe/fetch.php?cache=&media=screen_shot_2014-07-12_at_09.49.19.png)


#### 5. You are All Set!

You can now browse to [http://edge.spaceify.net](http://edge.spaceify.net) with your web browser to see the main menu that the Spaceify clients would see. It should look something like this:
![Screenshot of your browser view](https://spaceify.org/wiki/lib/exe/fetch.php?cache=&media=screen_shot_2014-07-12_at_10.30.57.png)


## The Team

The Spaceify ecosystem was born as a collaborative effort of researchers from Helsinki Institute for Information Technology (HIIT), Aalto University, University of Helsinki and University of Florida. In late 2014 Spaceify was released as an open source project on github under the MIT license. The original Spaceify team continues active development of the ecosystem, but we also invite new developers to join us. A good way to get started is to publish Spaceify packages on the Spaceify package repository! 

More information about Spaceify, repository and packages can be found from [Spaceify's web page](https://spaceify.org).