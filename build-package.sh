#!/bin/bash

# Build Spaceify debian package
# Spaceify Oy 2013

printf "\n\e[4mRetrieving git submodule(s)\e[0m\n"
git submodule update --init --recursive

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

# ----------
# ----------
# ----------
# ----------
# ---------- COPYING FILES ---------- #

printf "\n : Copying files"

cp -r code/ $dst
cp -r data/ $dst
cp -r debian/ $dst

cp CHANGELOG $dst
cp LICENSE $dst
cp README.md $dst
cp versions $dst

cp -r data/minify/ "$dst/data"

# ----------
# ----------
# ----------
# ----------
# ---------- UGLIFYING/MINIFYING  FILES ---------- #
nodecmd="node"
if type nodejs >/dev/null 2>&1; then
	nodecmd="nodejs"
fi
$nodecmd "$dst/data/minify/minify.js" $dst
uglifyMinifyError=$?

# ----------
# ----------
# ----------
# ----------
# ---------- DO SOME CLEANUP ---------- #

printf " : Cleanup files and directories"

rm -r "$dst/code/node_modules" > /dev/null 2>&1 || true
rm "$dst/code/www/spaceify.crt" > /dev/null 2>&1 || true
chmod -R 0644 "$dst/code" > /dev/null 2>&1 || true
rm "$dst/code/test*" > /dev/null 2>&1 || true
sed -i 's/spaceify\.csv/spaceify\.min\.csv/g' "$dst/code/www/libs/spaceifyinitialize.js"

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
dpkgBuildpackageError=$?

if [ $dpkgBuildpackageError == 0 ] && [ $uglifyMinifyError == 0 ]; then
	printf "\n\e[42mPackage build. Files are in directory $dstBase\e[0m\n\n"
else
	printf "\n\e[101mBuilding package failed: uglifyMinifyError=$uglifyMinifyError, dpkgBuildpackageError=$dpkgBuildpackageError\e[0m\n\n"

	rm -r /tmp/build/ > /dev/null 2>&1 || true
fi
