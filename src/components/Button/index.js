import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";

import { Text, Icon } from "..";
import { size as SIZE, Colors } from "../../theme";

const { width } = Dimensions.get("window");

function Button({
  color,
  children,
  capitalize,
  disabled,
  iconSize,
  icon,
  iconRight,
  iconFamily,
  iconColor,
  loading,
  loadingSize,
  loadingColor,
  lowercase,
  onlyIcon,
  opacity,
  round,
  style,
  size,
  shadowless,
  shadowColor,
  textStyle,
  uppercase,
  ...rest
}) {
  function renderContent() {
    const textStyles = [styles.customText, textStyle];

    // workaround for textTransform not supported on Expo SDK 29.0.0 or 30.0.0
    // More info: https://docs.expo.io/versions/latest/sdk/index.html#sdk-version
    // waiting for Expo SDK to support react-native 56.0.0

    let content = children;
    const isString = children && typeof children === "string";

    if (uppercase && isString) content = children.toUpperCase();
    if (lowercase && isString) content = children.toLowerCase();
    if (capitalize && isString) {
      content = `${children.charAt(0).toUpperCase()}${children.slice(1)}`;
    }

    if (icon && !onlyIcon && !iconRight) {
      content = (
        <>
          <Icon
            name={icon}
            family={iconFamily}
            size={iconSize}
            color={iconColor || Colors.WHITE}
          />{" "}
          <Text>{content}</Text>
        </>
      );
    }
    if (iconRight && !onlyIcon) {
      content = (
        <>
          <Text>{content}</Text>{" "}
          <Icon
            name={icon}
            family={iconFamily}
            size={iconSize}
            color={iconColor || Colors.WHITE}
          />
        </>
      );
    }

    if (onlyIcon) {
      content = (
        <Icon
          name={icon}
          family={iconFamily}
          size={iconSize}
          color={iconColor || Colors.WHITE}
        />
      );
    } else if (isString) {
      content = <Text style={textStyles}>{content}</Text>;
    }

    if (loading) {
      content = (
        <ActivityIndicator
          size={loadingSize}
          color={loadingColor || Colors.WHITE}
        />
      );
    }

    return content;
  }

  const colorStyle = styles[color];

  const buttonStyles = [
    styles.defaultButton,
    color && colorStyle,
    color && !colorStyle && { backgroundColor: color }, // color set & no styles for that color
    color === "transparent" || styles.androidShadow,
    color === "transparent" &&
      !shadowless && { borderWidth: 1, borderColor: Colors.WHITE },
    size === "large"
      ? { width: width * 0.9 }
      : size === "small"
      ? { width: width * 0.3 }
      : { width: width * 0.42 },
    round && { borderRadius: SIZE.BASE * 2 },

    onlyIcon && {
      width: iconSize * 2.75,
      height: iconSize * 2.75,
      borderWidth: 0,
      borderRadius: iconSize * 2,
    },
    !shadowless && styles.shadow,
    { shadowColor: shadowColor || Colors[color.toUpperCase()] },
    { zIndex: 2 },
    style,
  ];

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={opacity}
      style={buttonStyles}
      {...rest}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  color: "primary",
  size: "default",
  disabled: false,
  uppercase: false,
  lowercase: false,
  capitalize: false,
  shadowless: false,
  shadowColor: false,
  onlyIcon: false,
  loading: false,
  loadingSize: "small",
  opacity: 0.8,
  icon: false,
  iconRight: false,
  iconFamily: false,
  iconSize: 16,
  iconColor: null,
};

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      "theme",
      "primary",
      "info",
      "danger",
      "warning",
      "success",
      "black",
      "grey",
      "secondary",
      "transparent",
      "white",
    ]),
    PropTypes.string,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["large", "default", "small"]),
    PropTypes.number,
  ]),
  iconColor: PropTypes.string,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  lowercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  loading: PropTypes.bool,
  loadingSize: PropTypes.oneOf(["small", "default", "large"]),
  opacity: PropTypes.number,
  shadowless: PropTypes.bool,
  shadowColor: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onlyIcon: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  iconRight: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  iconFamily: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  iconSize: PropTypes.number,
};

const styles = StyleSheet.create({
  defaultButton: {
    borderRadius: 4,
    width: SIZE.BUTTON_WIDTH,
    height: SIZE.BUTTON_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  shadow: {
    shadowColor: Colors.BLOCK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: SIZE.OPACITY,
    shadowRadius: SIZE.BUTTON_SHADOW_RADIUS,
  },
  customText: {
    fontSize: SIZE.FONT,
    color: Colors.WHITE,
  },
  theme: {
    backgroundColor: Colors.THEME,
  },
  primary: {
    backgroundColor: Colors.PRIMARY,
  },
  info: {
    backgroundColor: Colors.INFO,
  },
  danger: {
    backgroundColor: Colors.DANGER,
  },
  warning: {
    backgroundColor: Colors.WARNING,
  },
  success: {
    backgroundColor: Colors.SUCCESS,
  },
  white: {
    backgroundColor: Colors.WHITE,
  },
  black: {
    backgroundColor: Colors.BLACK,
  },
  secondary: {
    backgroundColor: Colors.SECONDARY,
  },
  grey: {
    backgroundColor: Colors.GREY,
  },
  transparent: {
    backgroundColor: Colors.TRANSPARENT,
  },
  androidShadow: {
    elevation: SIZE.ANDROID_ELEVATION,
  },
});

export default Button;
