#!/bin/sh

# Note: Xcode will run ci_post_clone.sh at ci_scripts directory

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE

# Install node start
brew install node
brew link node
# Install node end

# Change App info
node changeAppInfo.mjs
