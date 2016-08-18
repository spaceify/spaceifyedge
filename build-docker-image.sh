#!/bin/bash
# Builds a new Docker image for a distribution
# Spaceify Inc. 16.8.2016

imageNames=""																		# The image name (directory) must exist
hasDirectory=0
directories=$(ls -d data/docker/*)
while read -r line;
do
	imagename=$(echo $line | awk -F / '{print $3}')
	if [ "$imagename" == "$1" ]; then hasDirectory=1; fi
	imageNames="${imageNames}${imagename}\n"
done <<< "$directories"

if [ $hasDirectory == 0 ]; then
	echo -e "\nUndefined distribution $1. This script expects as its first parameter one of the following distribution names:\n\n${imageNames}"
	exit 0
fi

printf "\nYou are now creating a new spaceify$1 image.\n"
printf "The existing spaceify$1 image or the application and spacelet images on the local machine are not updated or recreated.\n"

currentVersion=$(< ./data/docker/$1/image_version_ordinal)
currentImage="spaceify$1$currentVersion"
newVersion=$(($currentVersion + 1))
newImage="spaceify${1}${newVersion}"

printf "\nBased on the ./data/docker/$1/image_version_ordinal file the current image file name is \e[42m$currentImage.tgz\e[0m."
printf "\nThe new image file will be named \e[43m$newImage.tgz\e[0m if a new image is build. Othwerwise, if the current image is rebuild, the current image file name will be reused."

printf "\n\nSelect an operation.\n";

build="Build a new image and upload it to spaceify.org"
buildNo="Build a new image but do not upload it to spaceify.org"
rebuild="Rebuild the current image and upload it to spaceify.org"
rebuildNo="Rebuild the current image but do not upload it to spaceify.org"
cancel="Cancel"
select yn in "$build" "$buildNo" "$rebuild" "$rebuildNo" "$cancel"; do
	case $yn in
		"$build" ) selection=1; versionIncrement=1; break;;
		"$buildNo" ) selection=2; versionIncrement=1; break;;
		"$rebuild" ) selection=3; versionIncrement=0; break;;
		"$rebuildNo" ) selection=4; versionIncrement=0; break;;
		"$cancel" ) exit 0;;
	esac
done

newVersion=$(($currentVersion + $versionIncrement))
newImage="spaceify${1}${newVersion}"

echo $selection
echo $versionIncrement
echo $newVersion
echo $newImage

# --------- DO --------- #
cd "data/docker/$1"

docker build --no-cache --rm -t "spaceify${1}temp" .											# Build the image from the Dockerfile

ID=$(docker run -d "spaceify${1}temp" /bin/bash)												# Run container and get its ID

sudo docker export $ID > "$newImage.tar"														# Export the container

gzip "$newImage.tar"																			# Compress the image
mv "$newImage.tar.gz" "$newImage.tgz"

if [ $selection == 1 ] || [ $selection == 3 ]; then
	printf "\nEnter ssh username, to upload the $newImage.tgz to spaceify.org:"
	read username

	echo "Uploading the file $newImage.tgz to spaceify.org:/home/$username"							# Upload the new image file to spaceify.org:/home/<user>

	scp "$newImage.tgz" "$username@spaceify.org:/home/$username" 2>/tmp/Error 1>/dev/null

	if [[ $? -eq 0 ]]; then
		printf $newVersion > image_version_ordinal													# Increase version number

		echo "The $newImage.tgz file is now copied to $username@spaceify.org:/home/$username. Remember to manually move the image file to spaceify.org/downloads."
	else
		echo "Failed to upload the image to $username@spaceify.org:/home/$username."
	fi
fi

docker stop $ID	> /dev/null 2>&1 || true														# Cleanup
docker rm -f $ID > /dev/null 2>&1 || true
docker rmi "spaceify${1}temp" > /dev/null 2>&1 || true
rm "$newImage.tgz" > /dev/null 2>&1 || true

