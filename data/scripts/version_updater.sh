#!/bin/bash

# Updates version information to files
# Building debian package executes this script and it must not be executed manually.
#
# Spaceify Oy 2014

printf "\n : Updating version information to files"

versions=$(< versions)
edge=$(echo $versions | awk -F : '{print $2}')
edgeVersion=$(echo $edge | awk -F , '{print $1}')
edgeTag=$(echo $edge | awk -F , '{print $2}')
databaseVersion=$(echo $versions | awk -F : '{print $6}')

# ----------
# ----------
# ----------
# ----------
# ---------- debian/changelog ---------- #

#previousEdgeVersion=$( grep -Po "(?<=\()\b$edgeVersion\b(?=\))" debian/changelog )
previousEdgeVersion=$( grep -m 1 "(\(.*\))" debian/changelog | sed 's/.*(//g' | sed 's/).*//g')

if [ "$edgeVersion" = "$previousEdgeVersion" ]; then
	printf " > using current $previousEdgeVersion version"
else
	printf " > updating version $previousEdgeVersion to $edgeVersion"

	versionInfo=$( LANG=EN_US date +"%a, %d %b %Y %H:%M:%S %z" )

	versionRow="spaceify ($edgeVersion) unstable; urgency=low\n\n  * Release $edgeVersion $edgeTag\n\n -- Spaceify Oy <admin@spaceify.net>  $versionInfo\n\n"

	changelog=$(< debian/changelog)
	changelog="${versionRow}${changelog}"

	printf "$changelog" > debian/changelog
fi

# ----------
# ----------
# ----------
# ----------
# ---------- README.md ---------- #

readme=$(< documentation/README.template)
readme=${readme//_version_/$edgeVersion}
readme=${readme/_tag_/$edgeTag}

printf "$readme" > README.md

# ----------
# ----------
# ----------
# ----------
# ---------- package.json ---------- #
regx=".*\\\"version\\\":.*\\\".*\\\""
repl="  \"version\": \"$edgeVersion\""

sed -i "s/$regx/$repl/g" code/package.json

# ----------
# ----------
# ----------
# ----------
# ---------- data/db/create.template ---------- #

rm data/db/create.sql > /dev/null 2>&1 || true
cp data/db/create.template data/db/create.sql > /dev/null 2>&1 || true
sed -i -e "s/_version_/$edgeVersion/g" data/db/create.sql > /dev/null 2>&1 || true
sed -i -e "s/_tag_/$edgeTag/g" data/db/create.sql > /dev/null 2>&1 || true
sed -i -e "s/_database_/$databaseVersion/g" data/db/create.sql > /dev/null 2>&1 || true
sed -i -e "s/_release_/ubuntu/g" data/db/create.sql > /dev/null 2>&1 || true

# ----------
# ----------
# ----------
# ----------
# ---------- data/docker/<distributions>/image_versions ---------- #

distributions=$(ls -d data/docker/*)
while read -r distribution;
do
	imageVersions=$(< $distribution/image_versions)

	topmostLine=$(< "$distribution/image_versions")							# Remove line with same version number
	topmostLine=$(echo $topmostLine | awk -F " " '{print $1}')				# because every version can have only one image
	topmostVersion=$(echo $topmostLine | awk -F : '{print $1}')

	if [ "$topmostVersion" == "$edgeVersion" ]; then
		imageVersions=$(echo $imageVersions | sed "s/^$topmostLine//" | sed "s/^[ ]//")
		imageVersions=${imageVersions// /\\n}
	fi

	name=$(echo $distribution | awk -F / '{print $3}')						# Write new image version line
	ordinal=$(< "$distribution/image_version_ordinal")
	newImageLine="$edgeVersion:spaceify$name$ordinal.tgz\n"
	printf "$newImageLine$imageVersions" > "$distribution/image_versions"

done <<< "$distributions"
