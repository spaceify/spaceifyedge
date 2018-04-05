#!/bin/bash

# iptables related commands collected from postinst to one script
# Spaceify Oy 16.8.2016

# ----------
# ----------
# ----------
# ----------
# ---------- CONSTANTS / VARIABLES ---------- #

start_spaceify="# Added by Spaceify"
end_spaceify="# Added by Spaceify ends"
comm_out_spaceify="# Commented out by Spaceify: "

eth=$(< /var/lib/spaceify/data/interfaces/ethernet)
wlan=$(< /var/lib/spaceify/data/interfaces/wlan)

# ----------
# ----------
# ----------
# ----------
# ---------- RULES ---------- #

	# ----- RC.LOCAL AND ADD ARE AND MUST BE IDENTICAL!!! ----- #
if [ "$1" == "rclocal" ] || [ "$1" == "add" ]; then

		# - Create HTTP NAT chain - #
	http1="\/sbin\/iptables -t nat -N Spaceify-HTTP-Nat-Masq"
	http2="\/sbin\/iptables -t nat -A POSTROUTING -j Spaceify-HTTP-Nat-Masq"
	http3="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Masq -o ${eth} -j MASQUERADE"

		# - Docker container connection chains - #
	docker1="" # "\/sbin\/iptables -t nat -N Spaceify-Nat-Connections"
	docker2="" # "\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-Nat-Connections"
	docker3="" # "\/sbin\/iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections"
	docker4="" # "\/sbin\/iptables -t nat -A OUTPUT ! -d 127\.0\.0\.0\/8 -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections"
	docker5="\/sbin\/iptables -t nat -A POSTROUTING -s 172\.17\.0\.0\/16 ! -o docker0 -j MASQUERADE"

		# - FORWARDING - #
	forward1="\/sbin\/iptables -A FORWARD -i ${eth} -o ${wlan} -m state --state RELATED,ESTABLISHED -j ACCEPT"
	forward2="\/sbin\/iptables -A FORWARD -i ${wlan} -o ${eth} -j ACCEPT"

		# - Add the rules to rc.local or execute them
	if [ "$1" == "rclocal" ]; then

			# - Remove Spaceify's previous iptables entries -#
		sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/rc.local

			# - Append spaceify specific lines in rc.local before "exit 0" - #
		http="$http1\n$http2\n$http3\n"
		docker="$docker1\n$docker2\n$docker3\n$docker4\n$docker5\n"
		forward="$forward1\n$forward2\n"

		sed -i "s/^exit.*/$start_spaceify\n$http\n$docker\n$forward\n$end_spaceify\nexit 0/" /etc/rc.local

	else

		$(echo $http1 | sed 's/\\//g')
		$(echo $http2 | sed 's/\\//g')
		$(echo $http3 | sed 's/\\//g')

		# $(echo $docker1 | sed 's/\\//g')
		# $(echo $docker2 | sed 's/\\//g')
		# $(echo $docker3 | sed 's/\\//g')
		# $(echo $docker4 | sed 's/\\//g')
		$(echo $docker5 | sed 's/\\//g')

		$(echo $forward1 | sed 's/\\//g')
		$(echo $forward2 | sed 's/\\//g')

	fi

	# ----- DELETE RULES ----- #
elif [ "$1" == "delete" ]; then

		# - -- Delete HTTP NAT chain -- - #
	/sbin/iptables -t nat -D POSTROUTING -j Spaceify-HTTP-Nat-Masq > /dev/null 2>&1 || true
	/sbin/iptables -t nat -F Spaceify-HTTP-Nat-Masq > /dev/null 2>&1 || true
	/sbin/iptables -t nat -X Spaceify-HTTP-Nat-Masq > /dev/null 2>&1 || true

		# - -- Delete Docker container connection chains -- - #
	# iptables-save | grep -v -- '-j Spaceify-Nat-Connections' | iptables-restore
	# /sbin/iptables -t nat -F Spaceify-Nat-Connections > /dev/null 2>&1 || true
	# /sbin/iptables -t nat -X Spaceify-Nat-Connections > /dev/null 2>&1 || true
	/sbin/iptables -t nat -D POSTROUTING -s 172\.17\.0\.0\/16 ! -o docker0 -j MASQUERADE > /dev/null 2>&1 || true

		# - -- Delete FORWARDING rules -- - #
	/sbin/iptables -D FORWARD -i $eth -o $wlan -m state --state RELATED,ESTABLISHED -j ACCEPT > /dev/null 2>&1 || true
	/sbin/iptables -D FORWARD -i $wlan -o $eth -j ACCEPT > /dev/null 2>&1 || true

fi
