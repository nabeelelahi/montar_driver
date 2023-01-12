import { StyleSheet, Platform } from 'react-native';
import { Fonts, DefaultTheme, Colors, Metrics } from '../../../theme';

// const { colors } = DefaultTheme;

export const CELL_SIZE = 60;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = 'red';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  mv30: {
    marginVertical: Metrics.heightRatio(30)
  },
  bg: {
    backgroundColor: 'white'
  },
  blockmtop: { marginTop: Metrics.screenHeight / 8 },
  submitBtn: {
    width: Metrics.screenWidth - 50,
    // marginTop: Metrics.heightRatio(30),
    // paddingTop: 5
    // marginVertical: 10
  },
  btnMargin: {
    marginTop: Metrics.heightRatio(30),
    alignItems: 'center'
  },
  textStyle: {
    marginBottom: Metrics.smallMargin,
    color: Colors.GREY
  },
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 40,
    marginBottom: 15,

    paddingHorizontal: 20,
    justifyContent: 'center',

  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: Metrics.heightRatio(10),
    borderWidth: 1,
    color: Colors.BLACK,
    borderColor: 'transparent',
    backgroundColor: 'rgb(247, 247, 250)',
    overflow: 'hidden'

    // IOS
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // // Android
    // elevation: 3,
  },
  title: {
    paddingTop: 50,
    // fontSize: 25,
    ...Fonts.SemiBoldFont(),
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    textAlign: 'center',
  },

  focusCell: {
    borderColor: 'rgba(68, 79, 98, 0.3)',
    backgroundColor: 'rgb(255, 255, 255)'
  },
});

export default styles;
