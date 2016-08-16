#!/bin/bash

# Push the latest changes to GitHub tagging it as a new version.
# Spaceify Oy 2014

printf "\n\e[4mPushing changes as a new tagged version to GitHub\e[0m\n"

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
# ---------- GitHub ---------- #
printf "\n\n"


git add --all .													# Add changes

git commit -m "version ${edgeVersion}"							# Commit the changes

git tag -a v${edgeVersion} -m "version ${edgeVersion}"			# Tag the commit

git push														# Push to GitHub
