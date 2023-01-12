import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {size as iconSize, Images} from '@theme';

function LogoImg({styles, ...rest}) {
  return (
    <Image
      source={Images.icLogo}
      style={[{}, styles]}
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
  );
}

export default LogoImg;
