import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PrivateRoutesTypes } from '~/routes/private/types';
import { Private } from '~/screens';
import { TabLayout } from '../layouts';
import { Provider } from 'react-redux';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import store from '../../redux/store';


const Stack = createSharedElementStackNavigator<PrivateRoutesTypes>();

export default function PrivateRoutes({ }) {
  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Private.Home} />
        <Stack.Screen name="Profile" component={Private.Profile} />
        <Stack.Screen name="CreateAbha" component={Private.CreateAbha} />
        <Stack.Screen name="AbhaProfile" component={Private.AbhaProfile} />
        <Stack.Screen name="CreatePassword" component={Private.CreatePassword} />
        <Stack.Screen name="PersonlDetails" component={Private.PersonlDetails} />
        <Stack.Screen name="OtpScreen" component={Private.OtpScreen} />

      </Stack.Navigator>
    </Provider>
  );
}
