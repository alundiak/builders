#!/bin/bash
#
# This file is optional for this project, and created as an example of good global packages to have in your work environment.
#

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
npm install -g node-sass

# In case u need Shell.JS globally.
npm install -g shelljs

# If u have many markdown files, and would like to lint them from any places.
npm install -g mdlint

# Great for shecking and updating (-u) local packages/components.
npm install -g npm-check-updates
npm install -g bower-check-updates


#
# Ruby Gems
#
gem install sass compass scss-lint