import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { PublicRoutes } from '~/routes';
import PrivateRoutes from '~/routes/private';
import CustomTheme from '~/styles';
import Router from './src/Router';
export default function App(): JSX.Element {
  return (
    <NativeBaseProvider
      theme={CustomTheme}
      config={{
        dependencies: {
          'linear-gradient': require('react-native-linear-gradient').default,
        },
      }}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}