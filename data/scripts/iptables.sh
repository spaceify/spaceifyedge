#!/bin/bash

# ----------
# ----------
# ----------
# ----------
# ---------- CONSTANTS ---------- #
start_spaceify="# Added by Spaceify"
end_spaceify="# Added by Spaceify ends"
comm_out_spaceify="# Commented out by Spaceify: "

	# ----- RC.LOCAL ----- #
if [ "$1" == "rclocal" ]; then

		# - Remove Spaceify's previous iptables entries -#
	sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/rc.local

	# Create mangle chain
	#rclocal1="\/sbin\/iptables -t mangle -N Spaceify-mangle"
	#rclocal2="\/sbin\/iptables -t mangle -A PREROUTING -j Spaceify-mangle"
	#rclocal3="\/sbin\/iptables -t mangle -A Spaceify-mangle -i docker0 -j RETURN"
	#rclocal4="\/sbin\/iptables -t mangle -A Spaceify-mangle -j MARK --set-mark 99"
	#rclocal5="\/sbin\/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 80 -j DNAT --to-destination 10\.0\.0\.1"
	#rclocal6="\/sbin\/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 443 -j DNAT --to-destination 10\.0\.0\.1"
	#rclocal7="\/sbin\/iptables -t filter -A FORWARD -m mark --mark 99 -j DROP"

	#mangle_chain="$rclocal1\n$rclocal2\n$rclocal3\n$rclocal4\n$rclocal5\n$rclocal6\n$rclocal7\n"
	mangle_chain=""

		# - create HTTP filter chain, NAT chain and redirect chain - #
	#rclocal1="\/sbin\/iptables -t nat -N Spaceify-HTTP-Nat-Redir"
	#rclocal2="\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-HTTP-Nat-Redir"
	#rclocal3="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Redir -d 10\.0\.0\.1\/32 -j ACCEPT"
	#rclocal4="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Redir -s 10\.0\.0\.0\/24 -p tcp --dport 80 -j REDIRECT --to-port 8888"

	rclocal5="\/sbin\/iptables -t nat -N Spaceify-HTTP-Nat-Masq"
	rclocal6="\/sbin\/iptables -t nat -A POSTROUTING -j Spaceify-HTTP-Nat-Masq"
	rclocal7="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Masq -o "${eth}" -j MASQUERADE" 

	http_chain="$rclocal5\n$rclocal6\n$rclocal7\n"

		# - create HTTPS filter chain, NAT chain and redirect chain - #
	#rclocal1="\/sbin\/iptables -t nat -N Spaceify-HTTPS-Nat-Redir"
	#rclocal2="\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-HTTPS-Nat-Redir"
	#rclocal3="\/sbin\/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -d 10\.0\.0\.1\/32 -j ACCEPT"
	#rclocal4="\/sbin\/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -s 10\.0\.0\.0\/24 -p tcp --dport 443 -j REDIRECT --to-port 8889"

	rclocal5="\/sbin\/iptables -t nat -N Spaceify-HTTPS-Nat-Masq"
	rclocal6="\/sbin\/iptables -t nat -A POSTROUTING -j Spaceify-HTTPS-Nat-Masq"
	rclocal7="\/sbin\/iptables -t nat -A Spaceify-HTTPS-Nat-Masq -o "${eth}" -j MASQUERADE"

	https_chain="$rclocal5\n$rclocal6\n$rclocal7\n"

		# - Docker container connection chains - #
	rclocal1="\/sbin\/iptables -t nat -N Spaceify-Nat-Connections"
	rclocal2="\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-Nat-Connections"
	rclocal3="\/sbin\/iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections"
	rclocal4="\/sbin\/iptables -t nat -A OUTPUT ! -d 127.0.0.0\/8 -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections"
	rclocal5="\/sbin\/iptables -t nat -A POSTROUTING -s 172\.17\.0\.0\/16 ! -o docker0 -j MASQUERADE"

	rclocal6="\/sbin\/iptables -t filter -N Spaceify-Filter-Connections"
	rclocal7="\/sbin\/iptables -t filter -A FORWARD -j Spaceify-Filter-Connections"

	docker_chain="$rclocal1\n$rclocal2\n$rclocal3\n$rclocal4\n$rclocal5\n$rclocal6\n$rclocal7\n"

		# - Appication Manager rules - accept connections only from localhost - #
	#appman_port=$(cat /var/lib/spaceify/code/www/libs/config.json | grep "APPMAN_PORT_SECURE" | sed 's/[^0-9]*//g')
	#rclocal1="\/sbin\/iptables -A INPUT -p tcp -s localhost --dport $appman_port -j ACCEPT"
	#rclocal2="\/sbin\/iptables -A INPUT -p tcp --dport $appman_port -j DROP"

	appman_rules="" #"$rclocal1\n$rclocal2\n"

		# - append spaceify specific lines in rc.local before "exit 0" - #
	sed -i "s/^exit.*/$start_spaceify\n$mangle_chain\n$http_chain\n$https_chain\n$docker_chain\n$appman_rules\n$end_spaceify\nexit 0/" /etc/rc.local

	# ----- DELETE RULES ----- #
elif [ "$1" == "delete" ]; then

		# - -- Delete mangle chain -- - #
	#/sbin/iptables -t mangle -D PREROUTING -j Spaceify-mangle > /dev/null 2>&1 || true
	#/sbin/iptables -t mangle -F Spaceify-mangle > /dev/null 2>&1 || true
	#/sbin/iptables -t mangle -X Spaceify-mangle > /dev/null 2>&1 || true
	#/sbin/iptables -t nat -D PREROUTING -m mark --mark 99 -p tcp --dport 80 -j DNAT --to-destination 10.0.0.1 > /dev/null 2>&1 || true
	#/sbin/iptables -t nat -D PREROUTING -m mark --mark 99 -p tcp --dport 443 -j DNAT --to-destination 10.0.0.1 > /dev/null 2>&1 || true
	#/sbin/iptables -t filter -D FORWARD -m mark --mark 99 -j DROP > /dev/null 2>&1 || true

		# - -- Delete HTTP filter chain, NAT chain and redirect chain -- - #
	#/sbin/iptables -t nat -D PREROUTING -j Spaceify-HTTP-Nat-Redir > /dev/null 2>&1 || true
	/sbin/iptables -t nat -D POSTROUTING -j Spaceify-HTTP-Nat-Masq > /dev/null 2>&1 || true
	/sbin/iptables -t nat -F Spaceify-HTTP-Nat-Masq > /dev/null 2>&1 || true
	/sbin/iptables -t nat -X Spaceify-HTTP-Nat-Masq > /dev/null 2>&1 || true
	#/sbin/iptables -t nat -F Spaceify-HTTP-Nat-Redir > /dev/null 2>&1 || true
	#/sbin/iptables -t nat -X Spaceify-HTTP-Nat-Redir > /dev/null 2>&1 || true

		# - -- Delete HTTPS filter chain, NAT chain and redirect chain -- - #
	#/sbin/iptables -t nat -D PREROUTING -j Spaceify-HTTPS-Nat-Redir > /dev/null 2>&1 || true
	/sbin/iptables -t nat -D POSTROUTING -j Spaceify-HTTPS-Nat-Masq > /dev/null 2>&1 || true
	/sbin/iptables -t nat -F Spaceify-HTTPS-Nat-Masq > /dev/null 2>&1 || true
	/sbin/iptables -t nat -X Spaceify-HTTPS-Nat-Masq > /dev/null 2>&1 || true
	#/sbin/iptables -t nat -F Spaceify-HTTPS-Nat-Redir > /dev/null 2>&1 || true
	#/sbin/iptables -t nat -X Spaceify-HTTPS-Nat-Redir > /dev/null 2>&1 || true

		# - -- Delete Docker container connection chains -- - #
	iptables-save | grep -v -- '-j Spaceify-Nat-Connections' | iptables-restore
	/sbin/iptables -t nat -F Spaceify-Nat-Connections > /dev/null 2>&1 || true
	/sbin/iptables -t nat -X Spaceify-Nat-Connections > /dev/null 2>&1 || true
	/sbin/iptables -t nat -D POSTROUTING -s 172\.17\.0\.0\/16 ! -o docker0 -j MASQUERADE > /dev/null 2>&1 || true

	/sbin/iptables -t filter -D FORWARD -j Spaceify-Filter-Connections > /dev/null 2>&1 || true
	/sbin/iptables -t filter -F Spaceify-Filter-Connections > /dev/null 2>&1 || true
	/sbin/iptables -t filter -X Spaceify-Filter-Connections > /dev/null 2>&1 || true

		# - -- Delete Application Manager rules -- - #
	#/sbin/iptables -D INPUT -p tcp -s localhost --dport $appman_port -j ACCEPT > /dev/null 2>&1 || true
	#/sbin/iptables -D INPUT -p tcp --dport $appman_port -j DROP > /dev/null 2>&1 || true

	# ----- ADD RULES ----- #
elif [ "$1" == "add" ]; then

		# - ++ Add mangle chain ++ - #
	#/sbin/iptables -t mangle -N Spaceify-mangle
	#/sbin/iptables -t mangle -A PREROUTING -j Spaceify-mangle
	#/sbin/iptables -t mangle -A Spaceify-mangle -i docker0 -j RETURN
	#/sbin/iptables -t mangle -A Spaceify-mangle -j MARK --set-mark 99
	#/sbin/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 80 -j DNAT --to-destination 10.0.0.1
	#/sbin/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 443 -j DNAT --to-destination 10.0.0.1
	#/sbin/iptables -t filter -A FORWARD -m mark --mark 99 -j DROP

		# - ++ Add HTTP filter chain, NAT chain and redirect chain ++ - #
	#/sbin/iptables -t nat -N Spaceify-HTTP-Nat-Redir
	#/sbin/iptables -t nat -A PREROUTING -j Spaceify-HTTP-Nat-Redir
	#/sbin/iptables -t nat -A Spaceify-HTTP-Nat-Redir -d 10.0.0.1/32 -j ACCEPT
	#/sbin/iptables -t nat -A Spaceify-HTTP-Nat-Redir -s 10.0.0.0/24 -p tcp --dport 80 -j REDIRECT --to-port 8888

	/sbin/iptables -t nat -N Spaceify-HTTP-Nat-Masq
	/sbin/iptables -t nat -A POSTROUTING -j Spaceify-HTTP-Nat-Masq
	/sbin/iptables -t nat -A Spaceify-HTTP-Nat-Masq -o "${eth}" -j MASQUERADE 

		# - ++ Add HTTPS filter chain, NAT chain and redirect chain ++ - #
	#/sbin/iptables -t nat -N Spaceify-HTTPS-Nat-Redir
	#/sbin/iptables -t nat -A PREROUTING -j Spaceify-HTTPS-Nat-Redir
	#/sbin/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -d 10.0.0.1/32 -j ACCEPT
	#/sbin/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -s 10.0.0.0/24 -p tcp --dport 443 -j REDIRECT --to-port 8889

	/sbin/iptables -t nat -N Spaceify-HTTPS-Nat-Masq
	/sbin/iptables -t nat -A POSTROUTING -j Spaceify-HTTPS-Nat-Masq
	/sbin/iptables -t nat -A Spaceify-HTTPS-Nat-Masq -o "${eth}" -j MASQUERADE 

		# - ++ Add Docker container connection chains ++ - #
	/sbin/iptables -t nat -N Spaceify-Nat-Connections
	/sbin/iptables -t nat -A PREROUTING -j Spaceify-Nat-Connections
	/sbin/iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections
	/sbin/iptables -t nat -A OUTPUT ! -d 127.0.0.0/8 -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections
	/sbin/iptables -t nat -A POSTROUTING -s 172.17.0.0/16 ! -o docker0 -j MASQUERADE

	/sbin/iptables -t filter -N Spaceify-Filter-Connections
	/sbin/iptables -t filter -A FORWARD -j Spaceify-Filter-Connections

		# - ++ Add Application Manager rules ++ - #
	#/sbin/iptables -A INPUT -p tcp -s localhost --dport $appman_port -j ACCEPT
	#/sbin/iptables -A INPUT -p tcp --dport $appman_port -j DROP

fi