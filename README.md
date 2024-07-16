![Screenshot_1720796075](https://github.com/user-attachments/assets/81f93d1a-c603-43dd-afe0-ad675f8744bb)# React Native Typescript Setup

## Setup Navigation

### Install Navigation Packages

```bash
yarn add @react-navigation/native
yarn add react-nat![Screenshot_1720794765](https://github.com/user-attachments/assets/aed2a349-cd98-405d-8a5d-3b96bb5ae113)
![Screensho![Screenshot_1720795952](https://github.com/user-attachments/assets/00d25752-167c-4a0f-a991-5a0c0b308c11)
![Screenshot_1720730098](https://github.com/user-attachments/assets/66a3f122-1977-4f17-a357-80263acb927c)
![Screenshot_1720730046](https://github.com/user-attachments/assets/29232e40-ad68-487f-94fd-5b4b07243d69)
![Screenshot_1720730019](https://github.com/user-attachments/assets/d58674fd-78a8-456e-873d-664b045ea88d)
![Screenshot_1720794798](https://github.com/user-attachments/assets/ba410b58-8a44-4024-9f8f-9794f6c9a9a6)
![Screenshot_1720698052](https://github.com/user-attachments/assets/60c64e95-c4db-4d65-99db-f5d5ce20191c)
t_1720794750](https://github.com/user-attachments/assets/d3363b98-f58d-4fc7-b8e5-5eca869e594![Screenshot_1720794772](https://github.com/user-attachments/assets/7be63f9a-4315-4fa8-9f01-d7a41a0cb6cd)
8)
![Screenshot_1720758119](https://github.com/user-attachments/assets/b0a701a4-e03e-4aad-8907-38cadb719316)
![Screenshot_1720730108](https://github.com/user-attachments/assets/69a19519-2505-42f0-bf0d-c82ba24e8160)
![Screenshot_1720796109](https://github.com/user-attachments/assets/3ae86e05-cb4b-4a53-98a2-17d4fe70ff77)
![Screenshot_1720796144](https://github.com/user-attachments/assets/bc9b2645-952f-4b6f-b222-0a569f2c45a9)
![Screenshot_1720796085](https://github.com/user-attachments/assets/155ca6a3-c8c0-47d7-b4df-a877d9af2a63)
![Screenshot_1720796130](https://github.com/user-attachments/assets/b2a12c62-793c-44d6-842f-2633496b9751)
ive-screens react-native-safe-area-context
```![Screenshot![U![Screenshot_1720796079](https://github.com/user-attachments/assets/ba87056d-a5c2-4538-8664-54b549ed0345)
ploading Screenshot_1720796075.png…]()
![Screenshot_1720796068](https://github.com/user-attachments/assets/6b00defd-9779-4f16-ac88-f28b62e188f6)
![Screenshot_1720795977](https://github.com/user-attachments/assets/dc75b50c-1ef2-450d-92a5-6d5c73bc509d)
![Screenshot_1720795959](https://github.com/user-attachments/assets/76ad594f-4458-405a-b155-a734867327e6)
_1720606877](https://github.com/user-attachments/assets/3ab2f1da-ac16-43aa-aed1-96c610dde05c)


### Install Pod for above dependencies

```bash
cd ios && arch -x86_64 pod install
```

### Set up `react-native-screens` by updating `android/app/src/main/java/<your package name>/MainActivity.java` file

```java
import android.os.Bundle;

public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}
```

### Install stack navigation

```bash
yarn add @react-navigation/native-stack
```

### Wrap the navigation with navigation container

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

### Install Drawer Navigation package & other dependencies

```bash
yarn add @react-navigation/drawer react-native-gesture-handler react-native-reanimated
cd ios && arch -x86_64 pod install
```

### Setup `react-native-gesture-handler` in `index.js`

```js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'; // this line add
AppRegistry.registerComponent(appName, () => App);
```

### Settings up `react-native-reanimated/plugin`

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // this line add
};
```

### Reset the server cache

```bash
yarn start --reset-cache
```

### Install Bottom Navigation package

```bash
yarn add @react-navigation/bottom-tabs
```

### Setup absolute imports

#### Install `babel-plugin-module-resolver`

```bash
yarn add -D babel-plugin-module-resolver
```

#### Update the `babel.config.js` file

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~/assets': './src/assets',
          '~/components': './src/components',
          '~/components/core': './src/components/core',
          '~/components/containers': './src/components/containers',
          '~/components/shared': './src/components/shared',
          '~/configs': './src/configs',
          '~/constant': './src/constant',
          '~/hooks': './src/hooks',
          '~/routes': './src/routes',
          '~/screens': './src/screens',
          '~/styles': './src/styles',
          '~/types': './src/types',
        },
      },
    ],
  ],
};
```

#### Update `tsconfig.json` file

```json
{
  "extends": "@tsconfig/react-native/tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

### Install lottie animation library

```bash
yarn add lottie-react-native lottie-ios@3.4.0
```

### Install Image Picker library

#### Install `react-native-image-crop-picker` library

```bash
yarn add react-native-image-crop-picker
```

#### Update permissions in `AndroidManifest.xml` file for android

```xml
<!-- Camera permission required to access picture from camera -->
<uses-permission android:name="android.permission.CAMERA" />
```

#### Update permission in `info.plist` for ios

```plist
<key>NSPhotoLibraryUsageDescription</key>
<string>This app uses the gallery to update photo of your profile</string>
<key>NSCameraUsageDescription</key>
<string>This app uses the camera to take pictures for updating profile photo</string>
```

### Add Custom Font Family To Your Application

#### Create a file named `react-native.config.js`

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'], // path to the fonts directory
};
```

#### Run the following command to add all the assets to both the platforms

```bash
npx react-native-asset
```

### Install vector icons

#### Install `react-native-vector-icons` and its types

```bash
yarn add react-native-vector-icons
yarn add -D @types/react-native-vector-icons
```

#### For android open `android/app/build.gradle` and add following

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### Update following in `info.plist` for ios

```plist
<key>UIAppFonts</key>
<array>
  <string>AntDesign.ttf</string>
  <string>Entypo.ttf</string>
  <string>EvilIcons.ttf</string>
  <string>Feather.ttf</string>
  <string>FontAwesome.ttf</string>
  <string>FontAwesome5_Brands.ttf</string>
  <string>FontAwesome5_Regular.ttf</string>
  <string>FontAwesome5_Solid.ttf</string>
  <string>Foundation.ttf</string>
  <string>Ionicons.ttf</string>
  <string>MaterialIcons.ttf</string>
  <string>MaterialCommunityIcons.ttf</string>
  <string>SimpleLineIcons.ttf</string>
  <string>Octicons.ttf</string>
  <string>Zocial.ttf</string>
  <string>Fontisto.ttf</string>
</array>
```

#### Install Pod

```bash
cd ios && arch -x86_64 pod install --repo-update && cd ..
```
