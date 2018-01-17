#!/bin/bash
# Cleanup changes made by Spaceify before package is removed or installing package failed
# Spaceify Oy, 2015

printf "\n\e[42mRemoving Spaceify's installation\e[0m\n"

# ----------
# ----------
# ----------
# ----------
# ---------- Constants ---------- #

start_spaceify="# Added by Spaceify"
end_spaceify="# Added by Spaceify ends"
comm_out_spaceify="# Commented out by Spaceify: "

# ----------
# ----------
# ----------
# ----------
# ---------- Remove Spaceify's entries/comments from configuration files ---------- #

printf "\n\e[4mRestoring system configuration files and removing configuration files created by Spaceify.\e[0m\n"

	# - /etc/network/interfaces - #

sed -i -e "s/${comm_out_spaceify}//g" -e "/${start_spaceify}/,/${end_spaceify}/d" /etc/network/interfaces > /dev/null 2>&1 || true

	# - /etc/default/docker - #

sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/default/docker > /dev/null 2>&1 || true

	# - /etc/rc.local - #

sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/rc.local > /dev/null 2>&1 || true

	# - /etc/sysctl.conf - #

sed -i -e "s/${comm_out_spaceify}//g" -e "/${start_spaceify}/,/${end_spaceify}/d" /etc/sysctl.conf > /dev/null 2>&1 || true

	# - /etc/default/hostapd - #

sed -i -e "s/${comm_out_spaceify}//g" -e "/${start_spaceify}/,/${end_spaceify}/d" /etc/default/hostapd > /dev/null 2>&1 || true

	# - /etc/monit/monitrc - #

#sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/monit/monitrc > /dev/null 2>&1 || true

	# - /etc/udhcpd.conf, /etc/default/udhcpd - #

rm /etc/udhcpd.conf > /dev/null 2>&1 || true
rm /etc/default/udhcpd > /dev/null 2>&1 || true

mv /etc/udhcpd.conf.original /etc/udhcpd.conf > /dev/null 2>&1 || true
mv /etc/default/udhcpd.original /etc/default/udhcpd > /dev/null 2>&1 || true

	# - DNS: /etc/resolvconf/resolv.conf.d/base, /etc/NetworkManager/NetworkManager.conf, /etc/dhcp/dhclient.conf - #
if [ -f /etc/NetworkManager/NetworkManager.conf ]; then
	sed -i -e "s/${comm_out_spaceify}//g" /etc/NetworkManager/NetworkManager.conf > /dev/null 2>&1 || true
fi

if [ -f /etc/dhcp/dhclient.conf ]; then
	sed -i -e "s/${comm_out_spaceify}//g" -e "/${start_spaceify}/,/${end_spaceify}/d" /etc/dhcp/dhclient.conf > /dev/null 2>&1 || true
fi

sed -i -e "s/${comm_out_spaceify}//g" -e "/${start_spaceify}/,/${end_spaceify}/d" /etc/resolvconf/resolv.conf.d/base > /dev/null 2>&1 || true

printf "\nOK\n"

# ----------
# ----------
# ----------
# ----------
# ---------- Remove Spaceify's files etc. ---------- #

eth=$(< /var/lib/spaceify/data/interfaces/ethernet)
wlan=$(< /var/lib/spaceify/data/interfaces/wlan)
appman_port=$(cat /var/lib/spaceify/code/config.json | grep "APPMAN_PORT_SECURE" | sed 's/[^0-9]*//g') > /dev/null 2>&1 || true

printf "\n\e[4mStopping services.\e[0m\n"
service spaceifyhttp stop > /dev/null 2>&1 || true
service spaceifyappman stop > /dev/null 2>&1 || true
service spaceify stop > /dev/null 2>&1 || true
service spaceifyipt stop > /dev/null 2>&1 || true
service spaceifydns stop > /dev/null 2>&1 || true

printf "\nOK\n"

# ----------
# ----------
# ----------
# ----------
# ---------- Restore network ---------- #

printf "\n\e[4mTrying to restart network\e[0m\n"
if [[ -n $(service network-manager status |& grep unrecognized) ]]; then

	ifdown $eth > /dev/null 2>&1 || true
	ifup $eth > /dev/null 2>&1 || true

elif [[ -n $(service network-manager status |& grep running) ]]; then

	service network-manager restart > /dev/null 2>&1 || true

	resolvconf -u
fi

. /var/lib/spaceify/data/scripts/wait_network.sh 0 300 50 "Please wait, restarting the network."

printf "If the network did not restart, please do it manually.\n"

# ----------
# ----------
# ----------
# ----------
# ---------- Stop and remove docker container and images ---------- #
. /var/lib/spaceify/data/scripts/remove_images.sh

printf "\nOK\n"

# ----------
# ----------
# ----------
# ----------
# ---------- Remove spaceify's chains from iptables ---------- #

printf "\n\e[4mRemoving iptables chains\e[0m\n"

sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/rc.local

. /var/lib/spaceify/data/scripts/iptables.sh "delete"

printf "\nOK\n\n"

# ----------
# ----------
# ----------
# ----------
# ---------- Remove files on purge ---------- #
# See: debian/postrm
