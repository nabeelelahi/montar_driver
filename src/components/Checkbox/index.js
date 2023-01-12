/* eslint-disable object-curly-newline */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
// galio dependency
import { Block, Icon, Text } from '..';
import { AppStyles, Colors, size } from '@theme';
import { ButtonView } from '@reuseableComponents';

function Checkbox({
  checkboxStyle,
  color,
  disabled,
  flexDirection,
  image,
  imageStyle,
  iconColor,
  iconFamily,
  iconName,
  iconSize,
  initialValue,
  label,
  hyperLinkText,
  labelStyle,
  hyperLinkTextStyle,
  onChange,
  onLinkPressed,
  style,
}) {
  const [checked, setChecked] = React.useState(initialValue);

  // adding the necessary margins depending on the flexDirection
  function spaceAround(direction) {
    switch (direction) {
      case 'row-reverse':
        return { marginRight: 10 };
      case 'column':
        return { marginTop: 10 };
      case 'column-reverse':
        return { marginBottom: 10 };
      default:
        return { marginLeft: 10 };
    }
  }

  // rendering the image/text for the checkbox
  function renderLabel() {
    const labelStyles = [
      styles.textStyles,
      disabled && styles.disabledLabel,
      labelStyle,
      flexDirection && spaceAround(flexDirection),
    ];
    const hyperLinkTextStyles = [
      styles.hyperTextStyles,
      disabled && styles.disabledLabel,
      hyperLinkTextStyle,
      flexDirection && spaceAround(flexDirection),
    ];
    const imageStyles = [
      styles.imgStyles,
      imageStyle,
      flexDirection && spaceAround(flexDirection),
    ];

    if (image && !label) {
      return <Image style={imageStyles} source={{ uri: image }} />;
    }
    if (!image && label) return (
      <Block row>
        <Text style={labelStyles}>{label}</Text>
        <ButtonView onPress={onLinkPressed} style={styles.removeSpace}>
          <Text style={hyperLinkTextStyles}>{hyperLinkText}</Text>
        </ButtonView>
      </Block>
    );
    // if (!label && !image) return null;
    return null;
  }

  // adding the check icon
  function renderChecked() {
    if (checked) {
      return (
        <Icon
          name={iconName}
          family={iconFamily}
          color={iconColor}
          size={iconSize}
        />
      );
    }

    return null;
  }

  // onPress function that changes the component's state and callbacks the onChange prop
  function _onPress() {

    const current = !checked;
    onChange(current);
    setChecked(current);
  }

  const colorStyle = Colors[color.toUpperCase()]; // this sets the correct color for the theme file

  const checkBoxContainerStyle = [
    styles.container,
    flexDirection && { flexDirection },
    style,
  ];

  const checkedInnerStyles = [
    styles.checked,
    color && { backgroundColor: colorStyle, borderColor: colorStyle },
    color && !colorStyle && { backgroundColor: color, borderColor: color },
  ];

  const checkBoxViewStyles = [
    styles.checkBoxView,
    styles.uncheckedBoxView,
    color && { borderColor: colorStyle },
    color && !colorStyle && { borderColor: color },
    checked && checkedInnerStyles, // apply the ckecked styling
    disabled && styles.disabled,
    checkboxStyle,
  ];

  return (
    <TouchableOpacity
      onPress={() => _onPress()}
      style={checkBoxContainerStyle}
      activeOpacity={0.8}
      disabled={disabled}>
      <View style={checkBoxViewStyles}>{renderChecked()}</View>
      {renderLabel()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  removeSpace: {
    marginLeft: -5
  },
  checkBoxView: {
    width: size.CHECKBOX_WIDTH,
    height: size.CHECKBOX_HEIGHT,
    borderWidth: size.BORDER_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: size.BORDER_RADIUS,
  },
  uncheckedBoxView: {
    backgroundColor: Colors.TRANSPARENT,
    borderColor: Colors.GREY,
  },
  checked: {
    backgroundColor: Colors.THEME,
    borderColor: Colors.THEME,
  },
  disabled: {
    borderColor: Colors.MUTED,
  },
  textStyles: {
    color: Colors.BLACK,
  },
  hyperTextStyles: {
    color: 'rgb(49, 134, 248)',
    textDecorationLine: 'underline',
    fontWeight: '600'
    // ...AppStyles.gbRe(17, 'rgb(49, 134, 248)'),
  },
  disabledLabel: {
    color: Colors.MUTED,
    opacity: size.OPACITY,
  },
  imgStyles: {
    width: 200,
    height: 200,
  },
});

Checkbox.defaultProps = {
  checkboxStyle: null,
  color: 'theme',
  disabled: false,
  flexDirection: 'row',
  iconColor: '#000000',
  iconName: 'check',
  iconSize: 15,
  iconFamily: 'AntDesign',
  image: null,
  imageStyle: null,
  initialValue: false,
  label: null,
  labelStyle: null,
  onChange: () => { },
};

Checkbox.propTypes = {
  checkboxStyle: PropTypes.any,
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      'primary',
      'theme',
      'error',
      'warning',
      'success',
      'transparent',
      'info',
    ]),
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  flexDirection: PropTypes.oneOfType([
    PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    PropTypes.string,
  ]),
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconFamily: PropTypes.string,
  image: PropTypes.string,
  imageStyle: PropTypes.any, // style the image
  initialValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.any, // style the text
  onLinkPressed: PropTypes.func,
  hyperLinkText: PropTypes.string.isRequired,
  hyperLinkTextStyle: PropTypes.any, // style the text
  onChange: PropTypes.func,
};

export default Checkbox;
