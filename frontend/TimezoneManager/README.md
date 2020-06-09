# Timezone Manager

Assignment was done using React Native 0.60+, React Navigation v4, Redux, Redux-Saga, Redux-Persist. No Class based components were used only Functional components with Hooks.

### Setting up Development Environment
Install the necessary development packages. This includes:

a.) Install everything under React Native CLI Quickstart, [guide found here](https://facebook.github.io/react-native/docs/getting-started.html)

b.) Install IOS and Android simulators. Android emulators can be installed through Android Studio, IOS through XCode.

c.) Run **npm install** inside root project directory.

d.) cd into the ios folder and run **pod install**

e.) cd back into the root directory, and run the npm script for the device you would like to run on.

### Running test
Jest tests are located in rootDir/tests/, to run them use: **npm test**
Detox tests are located in rootDir/e2e, before running them the app must be running in ios simulator, after that run **detox test**
Check [detox documentation](https://github.com/wix/Detox) if are having issues running detox tests.
