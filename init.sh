#!/bin/bash
#
# This file is optional for this project, and created as an example of good global packages to have in your work environment.
#

# List of all globally installed NodeJS modules.
npm list -g --depth=0
# or
ls `npm root -g`

# In most cases these 2 are very frequently used.
npm install -g grunt-cli gulp bower

# Removes node_modules like a boss (sudo rm -rf).
npm install -g rimraf

# nodemon will watch the files in the directory that nodemon was started.
npm install -g nodemon
# And if they change, it will automatically restart your node application.

# Another server to run sites locally. Not sure about watch and restart.
npm install -g http-server

# In case u need node-sass globally.
npm install -g node-sass # last time I re-installing modules, this global module was kinda issue, so I uninstalled.

# In case u need Shell.JS globally.
npm install -g shelljs

# If u have many markdown files, and would like to lint them from any places.
npm install -g mdlint

# Great for checking and updating (-u) local node_modules and bower_components.
npm install -g npm-check-updates bower-check-updates

# Yeoman Generator of many JavaScript Frameworks
npm install -g yo

# Search using Google via CLI
npm install -g node-cli-google 
# buggy (Aug-25-2016) => https://github.com/hwclass/node-cli-google/issues/17 + https://nodejs.org/api/util.html#util_util_format_format

# Handy tool to test web page performance
npm install -g webpagetest

# Indeed awesome usage of above modules. It will fetch updates, and update json files.
ncu -u && bcu -u


#
# Ruby Gems
#
gem install sass compass scss-lint