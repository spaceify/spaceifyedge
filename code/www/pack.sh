#!/bin/bash

#
npm run webpack-edge-prod
npm run webpack-edge-bundle

npm run webpack-api-prod
npm run webpack-api-bundle

npm run webpack-api-prod-jquery
npm run webpack-api-bundle-jquery

#
node src/webpack/make.locales.js
node src/webpack/make.config.js

#
cp libs/spaceify.api.* ~/projects/spaceifyedge/code/www/libs/ > /dev/null 2>&1 || true
cp libs/spaceify.edge.* ~/projects/spaceifyedge/code/www/libs/ > /dev/null 2>&1 || true
cp libs/spaceify.locales.js ~/projects/spaceifyedge/code/www/libs/ > /dev/null 2>&1 || true
cp libs/spaceify.config.js ~/projects/spaceifyedge/code/www/libs/ > /dev/null 2>&1 || true
