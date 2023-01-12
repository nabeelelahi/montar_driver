import React from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Login,
  SignUp,
  PersonalInfo,
  ForgotPassword,
  Home,
  Faqs,
  ChangePassword,
  TripHistory,
  PrivacyPolicy,
  Settings,
  ContactUs,
  Verification,
  Chat,
  Profile,
  EditProfile,
  MyEarning,
  Notifications,
  TripDetail,
  PaymentMethod,
  LocationPicker,
  MyTrips,
} from '@containers';
import {
  drawerOpts,
  backButton,
  headerTransparent,
  removeHeader,
  rightButton,
} from '../navigatorHelper';
import {Images} from '@theme';
import AppDrawer from '../Drawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigate} from '@nav';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...backButton(),
      headerShadowVisible: false,
    }}>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        // headerShown: true,
        title: 'Create Account',
      }}
    />
    <Stack.Screen
      name="LocationPicker"
      component={LocationPicker}
      options={{
        // headerShown: true,
        ...backButton(),

        title: 'Select Address',
      }}
    />
    <Stack.Screen
      name="PersonalInfo"
      component={PersonalInfo}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{
        title: '',
      }}
    />
    <Stack.Screen
      name="Verification"
      component={Verification}
      options={{title: ''}}
    />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="DrawerStack"
      component={DrawerStack}
      options={{...removeHeader}}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        ...backButton(),
        title: 'Profile',
        ...rightButton(Images.icEdit, () => navigate('EditProfile')),
      }}
    />

    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{
        ...backButton(),
        title: 'Notifications',
      }}
    />

    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        ...backButton(),
        title: 'EditProfile',
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        ...backButton(),
        title: 'Change Password',
        headerBackVisible: false,
      }}
    />
    <Stack.Screen
      name="LocationPicker"
      component={LocationPicker}
      options={{
        ...backButton(),

        // headerShown: true,
        title: 'Create Account',
      }}
    />

    <Stack.Screen
      name="Chat"
      component={Chat}
      options={{
        ...backButton(),
        title: 'Alexa Marston',
      }}
    />

    <Stack.Screen
      name="TripDetail"
      component={TripDetail}
      options={{
        title: 'Trip Details',
        ...backButton(),
      }}
    />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

const DrawerStack = () => (
  <Drawer.Navigator drawerContent={props => <AppDrawer {...props} />}>
    <Drawer.Screen
      name="Home"
      component={Home}
      options={drawerOpts('Home', Images.icHome)}
    />
    <Drawer.Screen
      name="My Trips"
      component={MyTrips}
      options={drawerOpts('My Trips', Images.icLoc)}
    />
    <Drawer.Screen
      name="Settings"
      component={Settings}
      options={drawerOpts('Settings', Images.icSettings)}
    />
    <Drawer.Screen
      name="MyEarning"
      component={MyEarning}
      options={drawerOpts('My Earning', Images.icDollar)}
    />
    <Drawer.Screen
      name="PaymentMethod"
      component={PaymentMethod}
      options={drawerOpts('Bank Details', Images.icDollar)}
    />
    <Drawer.Screen
      name="Help & FAQs"
      component={Faqs}
      options={drawerOpts('Help & FAQs', Images.icFaqs)}
    />
    <Drawer.Screen
      name="Privacy Policy"
      component={PrivacyPolicy}
      options={drawerOpts('Privacy Policy', Images.icPrivacy)}
    />
    <Drawer.Screen
      name="Contact Us"
      component={ContactUs}
      options={drawerOpts('Contact Us', Images.icEmailLight)}
    />
  </Drawer.Navigator>
);

export {AuthStack, HomeStack};
