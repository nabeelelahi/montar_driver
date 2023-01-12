export const SOCIAL = {
  FACEBOOK: '#3B5998',
  TWITTER: '#5BC0DE',
  DRIBBBLE: '#EA4C89',
};

export const THEME = {
  BLUE: '#3186F8',
  BACKGROUND: '#454F63',
  INPUT: '#F7F7FA',
  DARKGRAY: '#78849E',
  SMGRAY: '#454F63',
};

// export const SHADOWS = {
//   PRIMARY: 0 13px 11px -8 rgba(254, 36, 114, .30),
//   INFO: 0 13px 11px -8 rgba(14, 42, 221, .30),
//   SUCCESS: 0 13px 11px -8 rgba(24, 206, 15, .30),
//   WARNING: 0 13px 11px -8 rgba(255, 156, 9, .30),
//   DANGER: 0 13px 11px -8 rgba(255, 63, 49, .30),
//   BLACK: 0 13px 11px -8 rgba(0, 0, 0, .30),
//   WHITE: 0 10px 20px -8 rgba(210, 210, 210, .100),
//   GREY: 0 13px 11px -8 rgba(152, 152, 152, .30),
//   LIGHT_GREY: 0 13px 11px -8 rgba(149, 149, 149, .30),
// };

export const COMPONENTS = {
  INPUT: '#808080',
  PLACEHOLDER: '#9FA5AA',
  NAVBAR: '#F9F9F9',
  BLOCK: '#808080',
  ICON: '#000000',
};

const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GREEN: '#06BF28',
  GREY: 'rgb(69, 79, 99)',
  MUTED: '#9FA5AA',
  TRANSPARENT: 'transparent',
  NEUTRAL: 'rgba(255,255,255, 0.65)',
  SEPARTOR: '#ECEFF1',
  CLEAR_BLUE: 'rgb(49,134,248)',
  ...COMPONENTS,
  ...THEME,
  ...SOCIAL,

  //text colors
  LIGHT_GREY: 'rgb(120,132,158)',
  RED: 'rgb(255,0,0)',
};

export default COLORS;
