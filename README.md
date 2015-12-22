# Corvallis Bus Web
This is a web client for the [Corvallis Bus API](https://github.com/RikkiGibson/Corvallis-Bus-Server).  
A running version of the app is available at <https://corvallisb.us>.

## Getting started

The following dependencies need to be installed globally using npm to build the app:

1. TypeScript
2. webpack
3. SASS
4. PostCSS
5. PostCSS Autoprefixer
6. cssnano

Then to build the app, go to the root project folder and run:
```npm run build``` or ```npm run devbuild```.

## Overview
The app is designed to allow users to find bus stops on the map and see detailed arrival information for those stops.  
It consists of 2 main view components:

1. A Google map controlled directly with JavaScript.
2. A stop details table, powered by React.js.

All the JavaScript on the page is produced by compiling TypeScript and using webpack to resolve module dependencies. TypeScript made a big difference in making the app sensical and maintainable. Styles were written in SASS and basically organized by which styles apply to React components and which styles don't.
