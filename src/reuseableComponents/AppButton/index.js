//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:10 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import PropTypes from 'prop-types';
import {Text, ViewPropTypes, StyleSheet} from 'react-native';
import ButtonView from '../ButtonView';
import {Metrics, AppStyles, Colors, Fonts} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

export default class AppButton extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  static defaultProps = {
    title: 'Click',
    onPress: () => {},
    style: {},
    textStyle: {},
  };

  render() {
    const {style, title, onPress, textStyle} = this.props;
    return (
      <LinearGradient
        colors={['#00A0B6', '#A6C522']}
        start={{x: 0, y: 0}}
        end={{x: 0.6, y: 0}}
        style={[
          {
            borderRadius: Metrics.smallMargin + 2,
          },
          style,
        ]}>
        <ButtonView style={[styles.container]} onPress={onPress}>
          <Text style={[styles.title, textStyle]}>{title}</Text>
        </ButtonView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Metrics.baseMargin,
    ...AppStyles.centerAligned,
    height: Metrics.heightRatio(52),
    borderRadius: Metrics.smallMargin + 2,
  },
  title: {
    fontSize: 16,
    ...Fonts.SemiBoldFont(),
    color: Colors.WHITE,
  },
});
