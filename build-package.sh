#!/bin/bash

# Build Spaceify debian package
# Spaceify Oy 2013

printf "\n\e[4mBuilding Spaceify debian package\e[0m\n"

# ----------
# ----------
# ----------
# ----------
# ---------- VERSIONS ---------- #

versions=$(< versions)
edge=$(echo $versions | awk -F : '{print $2}')
edgeVersion=$(echo $edge | awk -F , '{print $1}')

. data/scripts/version_updater.sh

# ----------
# ----------
# ----------
# ----------
# ---------- DIRECTORIES ---------- #

printf "\n : Creating directories"

dstBase="/tmp/build"
dst="$dstBase/spaceify-$edgeVersion"

rm -r /tmp/build/ > /dev/null 2>&1 || true

mkdir -p $dst
mkdir "$dst/code/"
mkdir "$dst/data/"
mkdir "$dst/debian/"

# ----------
# ----------
# ----------
# ----------
# ----------COPYING FILES ---------- #

printf "\n : Copying files"

cp -r code/* "$dst/code/"
cp -r data/* "$dst/data/"
cp -r debian/* "$dst/debian/"

cp CHANGELOG "$dst"
cp LICENSE "$dst"
cp README.md "$dst"
cp versions "$dst"

# ----------
# ----------
# ----------
# ----------
# ----------COMPILING ---------- #

printf "\n : Compiling Spaceify version $edgeVersion\n\n"

chmod -R 0644 debian/

cd $dst

chown -R root:root debian/
dpkg-buildpackage -i.svn -us -uc

if [ $? == 0 ]; then
	printf "\n\e[42mPackage build. Files are in directory $dstBase\e[0m\n\n"
else
	printf "\n\e[41mBuilding package failed\e[0m\n\n"
fi
