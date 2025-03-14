#!/bin/sh

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE

# Install node start
brew install node
brew link node
# Install node end

# TODO: Replace "app" with the product name of Xcode project
node changeAppInfo.mjs app