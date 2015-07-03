#!/bin/bash
#
# This file is optional for this project, and just do update of already installed node modules and bower components
#

#npm outdated --global --long # show the list of modules with Current/Wanted/Latest version columns

# npm update -g # this update works as expected. BUT BREAK NPM - remove from system. Tested with npm
# bug: https://github.com/npm/npm/issues/8549

#npm outdated --long 
#npm update # this doesn't work as expected. Looks like need to goo in loop of all modules, and one by one update.

# A: loop ls `npm root`
# B: loop outdated modules: `npm outdated`
# C: loop list of node modules (possibly filtered by matchdep for devOnly)
# // TODO
for i in $( ls `npm root` ); do
    # npm update "$i" --save-dev
    # npm update "$i"@latest --save-dev
    # npm install "$i" --save-dev
    npm install "$i"@latest --save-dev
done


#bower update