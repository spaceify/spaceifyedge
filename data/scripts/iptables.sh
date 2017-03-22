#!/bin/bash

# iptables related commands collected from postinst in one script
# Spaceify Oy 16.8.2016

# ----------
# ----------
# ----------
# ----------
# ---------- CONSTANTS / VARIABLES ---------- #

start_spaceify="# Added by Spaceify"
end_spaceify="# Added by Spaceify ends"
comm_out_spaceify="# Commented out by Spaceify: "

eth=$(</var/lib/spaceify/data/interfaces/ethernet)
#appman_port=$(cat /var/lib/spaceify/code/config.json | grep "APPMAN_PORT_SECURE" | sed 's/[^0-9]*//g')

# ----------
# ----------
# ----------
# ----------
# ---------- RULES ---------- #

	# ----- RC.LOCAL AND ADD ARE AND MUST BE IDENTICAL!!! ----- #
if [ "$1" == "rclocal" ] || [ "$1" == "add" ]; then

	# Create mangle chain
	#mangle1="\/sbin\/iptables -t mangle -N Spaceify-mangle"
	#mangle2="\/sbin\/iptables -t mangle -A PREROUTING -j Spaceify-mangle"
	#mangle3="\/sbin\/iptables -t mangle -A Spaceify-mangle -i docker0 -j RETURN"
	#mangle4="\/sbin\/iptables -t mangle -A Spaceify-mangle -j MARK --set-mark 99"
	#mangle5="\/sbin\/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 80 -j DNAT --to-destination 10\.0\.0\.1"
	#mangle6="\/sbin\/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 443 -j DNAT --to-destination 10\.0\.0\.1"
	#mangle7="\/sbin\/iptables -t filter -A FORWARD -m mark --mark 99 -j DROP"

		# - create HTTP filter chain, NAT chain and redirect chain - #
	#http1="\/sbin\/iptables -t nat -N Spaceify-HTTP-Nat-Redir"
	#http2="\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-HTTP-Nat-Redir"
	#http3="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Redir -d 10\.0\.0\.1\/32 -j ACCEPT"
	#http4="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Redir -s 10\.0\.0\.0\/24 -p tcp --dport 80 -j REDIRECT --to-port 8888"

	http5="\/sbin\/iptables -t nat -N Spaceify-HTTP-Nat-Masq"
	http6="\/sbin\/iptables -t nat -A POSTROUTING -j Spaceify-HTTP-Nat-Masq"
	http7="\/sbin\/iptables -t nat -A Spaceify-HTTP-Nat-Masq -o "${eth}" -j MASQUERADE" 

		# - create HTTPS filter chain, NAT chain and redirect chain - #
	#https1="\/sbin\/iptables -t nat -N Spaceify-HTTPS-Nat-Redir"
	#https2="\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-HTTPS-Nat-Redir"
	#https3="\/sbin\/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -d 10\.0\.0\.1\/32 -j ACCEPT"
	#https4="\/sbin\/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -s 10\.0\.0\.0\/24 -p tcp --dport 443 -j REDIRECT --to-port 8889"

	https5="\/sbin\/iptables -t nat -N Spaceify-HTTPS-Nat-Masq"
	https6="\/sbin\/iptables -t nat -A POSTROUTING -j Spaceify-HTTPS-Nat-Masq"
	https7="\/sbin\/iptables -t nat -A Spaceify-HTTPS-Nat-Masq -o "${eth}" -j MASQUERADE"

		# - Docker container connection chains - #
	docker1="\/sbin\/iptables -t nat -N Spaceify-Nat-Connections"
	docker2="\/sbin\/iptables -t nat -A PREROUTING -j Spaceify-Nat-Connections"
	docker3="\/sbin\/iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections"
	docker4="\/sbin\/iptables -t nat -A OUTPUT ! -d 127\.0\.0\.0\/8 -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections"
	docker5="\/sbin\/iptables -t nat -A POSTROUTING -s 172\.17\.0\.0\/16 ! -o docker0 -j MASQUERADE"

	docker6="\/sbin\/iptables -t filter -N Spaceify-Filter-Connections"
	docker7="\/sbin\/iptables -t filter -A FORWARD -j Spaceify-Filter-Connections"

		# - Appication Manager rules - accept connections only from localhost - #
	#appman1="\/sbin\/iptables -A INPUT -p tcp -s localhost --dport $appman_port -j ACCEPT"
	#appman2="\/sbin\/iptables -A INPUT -p tcp --dport $appman_port -j DROP"

		# - Add the rules to rc.local or execute them
	if [ "$1" == "rclocal" ]; then

			# - Remove Spaceify's previous iptables entries -#
		sed -i "/${start_spaceify}/,/${end_spaceify}/d" /etc/rc.local

			# - append spaceify specific lines in rc.local before "exit 0" - #
		mangle_chain="" # "$mangle1\n$mangle2\n$mangle3\n$mangle4\n$mangle5\n$mangle6\n$mangle7\n"
		http_chain="$http5\n$http6\n$http7\n"
		https_chain="$https5\n$https6\n$https7\n"
		docker_chain="$docker1\n$docker2\n$docker3\n$docker4\n$docker5\n$docker6\n$docker7\n"
		appman_chain="" # "$appman1\n$appman2\n"

		sed -i "s/^exit.*/$start_spaceify\n$mangle_chain\n$http_chain\n$https_chain\n$docker_chain\n$appman_chain\n$end_spaceify\nexit 0/" /etc/rc.local

	else

		#$(echo $mangle1 | sed 's/\\//g')
		#$(echo $mangle2 | sed 's/\\//g')
		#$(echo $mangle3 | sed 's/\\//g')
		#$(echo $mangle4 | sed 's/\\//g')
		#$(echo $mangle5 | sed 's/\\//g')
		#$(echo $mangle6 | sed 's/\\//g')
		#$(echo $mangle7 | sed 's/\\//g')

		#$(echo $http1 | sed 's/\\//g')
		#$(echo $http2 | sed 's/\\//g')
		#$(echo $http3 | sed 's/\\//g')
		#$(echo $http4 | sed 's/\\//g')
		$(echo $http5 | sed 's/\\//g')
		$(echo $http6 | sed 's/\\//g')
		$(echo $http7 | sed 's/\\//g')

		#$(echo $https1 | sed 's/\\//g')
		#$(echo $https2 | sed 's/\\//g')
		#$(echo $https3 | sed 's/\\//g')
		#$(echo $https4 | sed 's/\\//g')
		$(echo $https5 | sed 's/\\//g')
		$(echo $https6 | sed 's/\\//g')
		$(echo $https7 | sed 's/\\//g')

		$(echo $docker1 | sed 's/\\//g')
		$(echo $docker2 | sed 's/\\//g')
		$(echo $docker3 | sed 's/\\//g')
		$(echo $docker4 | sed 's/\\//g')
		$(echo $docker5 | sed 's/\\//g')
		$(echo $docker6 | sed 's/\\//g')
		$(echo $docker7 | sed 's/\\//g')

		#$(echo $appman1 | sed 's/\\//g')
		#$(echo $appman2 | sed 's/\\//g')

	fi

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

	# ----- ADD RULES (IDENTICAL WITH RC.LOCAL) ----- #
#elif [ "$1" == "add" ]; then

#		# - ++ Add mangle chain ++ - #
#	#/sbin/iptables -t mangle -N Spaceify-mangle
#	#/sbin/iptables -t mangle -A PREROUTING -j Spaceify-mangle
#	#/sbin/iptables -t mangle -A Spaceify-mangle -i docker0 -j RETURN
#	#/sbin/iptables -t mangle -A Spaceify-mangle -j MARK --set-mark 99
#	#/sbin/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 80 -j DNAT --to-destination 10.0.0.1
#	#/sbin/iptables -t nat -A PREROUTING -m mark --mark 99 -p tcp --dport 443 -j DNAT --to-destination 10.0.0.1
#	#/sbin/iptables -t filter -A FORWARD -m mark --mark 99 -j DROP

#		# - ++ Add HTTP filter chain, NAT chain and redirect chain ++ - #
#	#/sbin/iptables -t nat -N Spaceify-HTTP-Nat-Redir
#	#/sbin/iptables -t nat -A PREROUTING -j Spaceify-HTTP-Nat-Redir
#	#/sbin/iptables -t nat -A Spaceify-HTTP-Nat-Redir -d 10.0.0.1/32 -j ACCEPT
#	#/sbin/iptables -t nat -A Spaceify-HTTP-Nat-Redir -s 10.0.0.0/24 -p tcp --dport 80 -j REDIRECT --to-port 8888

#	/sbin/iptables -t nat -N Spaceify-HTTP-Nat-Masq
#	/sbin/iptables -t nat -A POSTROUTING -j Spaceify-HTTP-Nat-Masq
#	/sbin/iptables -t nat -A Spaceify-HTTP-Nat-Masq -o "${eth}" -j MASQUERADE

#		# - ++ Add HTTPS filter chain, NAT chain and redirect chain ++ - #
#	#/sbin/iptables -t nat -N Spaceify-HTTPS-Nat-Redir
#	#/sbin/iptables -t nat -A PREROUTING -j Spaceify-HTTPS-Nat-Redir
#	#/sbin/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -d 10.0.0.1/32 -j ACCEPT
#	#/sbin/iptables -t nat -A Spaceify-HTTPS-Nat-Redir -s 10.0.0.0/24 -p tcp --dport 443 -j REDIRECT --to-port 8889

#	/sbin/iptables -t nat -N Spaceify-HTTPS-Nat-Masq
#	/sbin/iptables -t nat -A POSTROUTING -j Spaceify-HTTPS-Nat-Masq
#	/sbin/iptables -t nat -A Spaceify-HTTPS-Nat-Masq -o "${eth}" -j MASQUERADE

#		# - ++ Add Docker container connection chains ++ - #
#	/sbin/iptables -t nat -N Spaceify-Nat-Connections
#	/sbin/iptables -t nat -A PREROUTING -j Spaceify-Nat-Connections
#	/sbin/iptables -t nat -A PREROUTING -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections
#	/sbin/iptables -t nat -A OUTPUT ! -d 127.0.0.0/8 -m addrtype --dst-type LOCAL -j Spaceify-Nat-Connections
#	/sbin/iptables -t nat -A POSTROUTING -s 172.17.0.0/16 ! -o docker0 -j MASQUERADE

#	/sbin/iptables -t filter -N Spaceify-Filter-Connections
#	/sbin/iptables -t filter -A FORWARD -j Spaceify-Filter-Connections

#		# - ++ Add Application Manager rules ++ - #
#	#/sbin/iptables -A INPUT -p tcp -s localhost --dport $appman_port -j ACCEPT
#	#/sbin/iptables -A INPUT -p tcp --dport $appman_port -j DROP

fi