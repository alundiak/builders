#!/bin/bash
#
# This file is optional for this project, and just do update of already installed node modules and bower components
#

npm cache clean # 

npm outdated --global --long # show the list of modules with Current/Wanted/Latest version columns

# npm update -g # this update works as expected. BUT BREAK NPM - remove from system. Tested with npm
# bug: https://github.com/npm/npm/issues/8549
# Still reproduced with node v4.5.0 on my Mac OS v10.11.6 with npm v2.15.9


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

# ha-ha, Now I have "node-check-updates" aka "ncu" and "bower-check-updates" aka "bcu", so command will be more elegant now:
ncu -u && bcu -u
# "-u" tells to update package.json and bower.json

# But now, we have to install modules, based on upgraded package.json file.
npm install # it will install local modules (dev and prod)