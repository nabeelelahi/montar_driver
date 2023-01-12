//
//  AppStyles.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:42 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { StyleSheet } from 'react-native';
import Metrics from './Metrics';
import Colors from './Colors';
import Fonts from './Fonts';

const gbRe = (size = 16, color = 'black') => ({
  ...Fonts.RegularFont(size),
  color,
});

const roundImage = (radius, resizeMode = 'contain') => {
  return {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    resizeMode,
  };
};

export default StyleSheet.create({
  gbRe, roundImage,
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  defaultPending: { top: 40, right: 40, bottom: 40, left: 40 },
  flex: {
    flex: 1,
  },
  htmlContainer: {
    marginTop: -Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  textCenter: {
    textAlign: 'center',
  },
  centerAligned: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowAligned: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percent100: {
    width: '100%',
    height: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTabBar: {
    width: 28,
    height: 28,
  },
  lightShadow: {
    shadowColor: 'rgba(69,91,99,0.08)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 4,
  },
  dropShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowRadius: 26,
    shadowOpacity: 1,
    elevation: 5,
  },
  dropRedShadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});
