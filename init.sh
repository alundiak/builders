#!/bin/bash
#
# This file is optional for this project, and created as an example of good global packages to have in your work environment.
#

# In most cases these 2 are very frequently used.
npm install grunt-cli gulp bower -g

# https://www.npmjs.org/package/rimraf
npm install rimraf -g
# Remove node_modules like a boss (sudo rm -rf)

# https://github.com/remy/nodemon
npm install nodemon -g
# nodemon will watch the files in the directory that nodemon was started, 
# and if they change, it will automatically restart your node application.

# In case u need Shell.JS globally
npm install node-sass -g

# In case u need node-sass globally
npm install shelljs -g

# If u have many mardown files, and would like to lint them from any places:
npm install mdlint -g


#
# Ruby Gems
#
gem install sass compass scss-lint