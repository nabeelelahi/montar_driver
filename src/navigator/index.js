//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {forwardRef, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack, HomeStack} from './Stacks';
import {LoginContext} from '../contexts';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const rootNavigator = forwardRef((props, ref) => {
  const {isLogin} = useContext(LoginContext);
  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLogin ? (
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default rootNavigator;
