//
//  navigatorHelper.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:20:00 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {Images, Metrics, AppStyles, Colors, Fonts} from '@theme';
import {Image, TouchableOpacity, View} from 'react-native';
import {ImageButton, ButtonView} from '../reuseableComponents';
import {HeaderBackButton} from '@react-navigation/elements';
import utility from '../utility';
import {pop} from '../services/NavigationService';
import {Text} from '@components';

const headerColor = {
  headerStyle: {
    backgroundColor: '#ffffff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
};

const headerTransparent = {
  headerTransparent: true,
};
const backImage = (tintColor = Colors.BLACK) => {
  return {
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <Image
        source={Images.icBack}
        style={{
          marginLeft: Metrics.baseMargin,
          tintColor: tintColor,
        }}
      />
    ),
  };
};
const title = title => ({
  title,
  headerTitleStyle: {
    color: '#313131',
    ...Fonts.font(
      Fonts.FontFamily.default,
      Fonts.Type.SemiBold,
      Fonts.Size.medium,
    ),
  },
});
const defaultNavOptions = navOptions => {
  return {
    defaultNavigationOptions: ({navigation}) => navOptions,
  };
};
const navOptions = navOptions => {
  return {
    navigationOptions: ({navigation}) => navOptions,
  };
};

const navButton = (image, key = 'headerRight', navOptions, style) => {
  return {
    navigationOptions: ({navigation}) => {
      return {
        [key]: () => (
          <ImageButton
            source={image}
            style={{
              justifyContent: 'center',
              marginHorizontal: Metrics.smallMargin,
              height: 40,
              ...style,
            }}
            onPress={navigation.getParam('onPress', () =>
              global.log('onPress'),
            )}
          />
        ),
        ...navOptions,
      };
    },
  };
};
const dyanimcTitle = (navOptions = {}) => {
  return {
    navigationOptions: ({navigation}) => {
      console.log('navigation-navButton', navigation);
      return {
        title: navigation.getParam('title', ''),
        ...navOptions,
      };
    },
  };
};

const backButton = (onPress = () => pop()) => {
  return {
    headerLeft: props => (
      <HeaderBackButton
        backImage={() => <Image source={Images.icBack} resizeMode="contain" />}
        labelVisible={false}
        onPress={onPress}
        style={{
          height: 30,
          width: 30,
          ...AppStyles.centerAligned,
          paddingHorizontal: utility.isPlatformAndroid() ? 0 : 16,
        }}
      />
    ),
  };
};

const backButtonWithHeader = (name = '', title = true) => {
  return {
    headerLeft: () => (
      <View style={{flexDirection: 'row'}}>
        <ButtonView onPress={() => pop()}>
          <Image source={Images.icBack} />
        </ButtonView>
        <Text>{name}</Text>
      </View>
    ),
  };
};

const rightButton = (image, onPress = () => {}, style) => {
  return {
    headerRight: props => (
      <ImageButton
        source={image}
        style={{
          justifyContent: 'center',
          height: 40,
          //   marginRight: 10,
          ...style,
        }}
        onPress={onPress}
      />
    ),
  };
};

const drawerOpts = (title, icon) => {
  return {
    title,
    label: title,
    drawerLabel: title,
    headerTintColor: '#000',
    drawerLabelStyle: {
      color: 'white',
    },
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      elevation: 0,
    },

    drawerIcon: ({focused, size}) => <Image source={icon} />,
  };
};

const removeHeader = {
  headerShown: false,
};

const removeBorder = {
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
};

export {
  headerColor,
  removeBorder,
  removeHeader,
  headerTransparent,
  backImage,
  title,
  defaultNavOptions,
  navOptions,
  navButton,
  dyanimcTitle,
  backButton,
  backButtonWithHeader,
  rightButton,
  drawerOpts,
};
