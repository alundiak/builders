#!/bin/bash
#
# This file is optional for this project, and just do update of already installed node modules and bower components
#

npm cache clean --force

npm outdated --global --long # show the list of modules with Current/Wanted/Latest version columns

# npm update -g # this update works as expected. BUT BREAKs NPM - removes from system. Tested with npm
# bug: https://github.com/npm/npm/issues/8549
# Still reproduced with node v4.5.0 on my Mac OS v10.11.6 with npm v2.15.9

#
# APPROACH 1
#
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

#
# APPROACH 2
#
# But since package-lock.json exists, this approach above is rather NOT suggested for production. So instead, a better way would be:
npm upgrade
npm audit fix --force

#
# APPROACH 3
#
# "node-check-updates" aka "ncu" ("bower-check-updates" aka "bcu" - DEPRECATED)
ncu -u && npm install
# "-u" tells to update package.json
# And we have to install modules, based on upgraded package.json file, local modules (dev and prod)
# Then bower update
ncu -m "bower" && bower install

#
# Ruby updates
#

sudo gem update --system #updates ruby-gems to latest version (2016 => 2.4.4, May-2021 => 3.2.17)
