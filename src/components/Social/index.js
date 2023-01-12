import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';
import {size as iconSize, Images} from '@theme';
import {ButtonView} from '@reuseableComponents';

function Social({img, styles, imgStyles, onPress, ...rest}) {
  return (
    <ButtonView style={[style.container, styles]} onPress={onPress}>
      <Image
        source={img}
        style={[{}, imgStyles]}
        // size={
        //   size ||
        //   (medium
        //     ? iconSize.ICON_MEDIUM
        //     : large
        //     ? iconSize.ICON_LARGE
        //     : iconSize.ICON)
        // }
        {...rest}
      />
    </ButtonView>
  );
}

export default Social;

const style = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 15,
    // backgroundColor: 'red',
    // overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 8,

    elevation: 5,
  },
});
