#!/bin/bash

sudo add-apt-repository ppa:cwchien/gradle
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get upgrade gradle openjdk-8-jdk
/home/ubuntu/workspace/andoridsdk/bin/sdkmanager --sdk_root=/home/ubuntu/workspace/androidsdk/ "platforms;android-26" "tools" "platform-tools"
sdkmanager --sdk_root=/home/ubuntu/workspace/androidsdk/ "system-images;android-23;google_apis;x86"
sdkmanager .. "extras;m2repository"

219  android update sdk --no-ui --all --filter android-23,build-tools-23.0.1,extra-android-m2repository,extra-google-m2repository
  220  android update sdk --no-ui --all
  221  cordova build android
  222  cordova build android --info
  223  android update sdk --no-ui --all --filter android-23,build-tools-23.0.1,extra-android-m2repository,extra-google-m2repository
  224  cordova build android
  225  cordova build android --release