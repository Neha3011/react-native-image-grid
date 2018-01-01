# React Native Image Grid App

Image grid app which uses 
- [create-react-native-app](https://github.com/react-community/create-react-native-app.git) for the client 
- [pixabay](https://pixabay.com/api/docs/#api_search_images) for the images

# Setup

- Install dependencies: `yarn install`
- Run: `yarn start` follow the steps given in terminal to run the app in expo

# Download App
- Download expo app in your phone
- Search for https://exp.host/@nehasingh/imagesgrid

# Run test
- npm run test

# Implementation overview

- `App` component: 
  - Handles searching of images from keyword
  - Renders empty and loading state
  - Renders searched images once data is fetched
  - Provides Infinite scrolling