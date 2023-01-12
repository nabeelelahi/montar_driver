//
// Fonts.js:
// BoilerPlate
//
// Created by Retrocube on 10/4/2019, 9:47:26 AM.
// Copyright © 2019 Retrocube. All rights reserved.
//
import {Metrics, Colors} from '.';

export default class Fonts {
  static FontFamily = {
    default: 'Gibson',
    secondary: 'Gibson',
  };

  static Type = {
    BoldItalic: 'BoldItalic',
    Regular: 'Regular',
    SemiboldIt: 'SemiBoldItalic',
    // Italic: "Italic",
    Bold: 'Bold',
    LightIt: 'LightItalic',
    SemiBold: 'SemiBold',
    Light: 'Light',
  };

  static Size = {
    xxxSmall: 11,
    xxSmall: 13,
    xSmall: 14,
    small: 15,
    normal: 17,
    medium: 19,
    large: 21,
    xLarge: 23,
    xxLarge: 28,
    xxxLarge: 31,
    huge: 34,
    xhuge: 37,
    xxhuge: 40,
    xxxhuge: 43,
  };

  static font = (
    fontFamily = Fonts.FontFamily.default,
    type = Fonts.Type.Regular,
    size = Fonts.Size.medium,
  ) => {
    return {
      fontFamily: fontFamily + '-' + type,
    };
  };

  static SemiBoldFont = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.SemiBold, size),
    };
  };

  static RegularFont = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Regular, size),
    };
  };
  static BoldFont = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Bold, size),
    };
  };

  //   static MediumFont = size => {
  //     return {
  //       ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Medium, size),
  //       color: Colors.BLACK,
  //     };
  //   };

  static BookFont = size => {
    return {
      ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Book, size),
      color: Colors.BLACK,
    };
  };
}
