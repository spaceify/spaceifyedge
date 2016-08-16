#!/bin/bash

# Push the latest changes to GitHub without tagging it as a new version (= update existing version).
# Spaceify Oy 2014

printf "\n\e[4mPushing the latest changes to GitHub without tagging it as a new version\e[0m\n"

versions=$(< versions)											# Get the current version string
edge=$(echo $versions | awk -F : '{print $2}')
edgeVersion=$(echo $edge | awk -F , '{print $1}')

commitDate=$( date +"%F %H:%M:%S" )

git add --all .													# Add changes

git commit -m "version ${edgeVersion} ${commitDate}"			# Commit the changes

git push														# Push to GitHub
