//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TextInput,
  Animated,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import ButtonView from '../ButtonView';
import _ from 'lodash';
import PhoneInput from 'react-native-phone-input';
import {INPUT_TYPES} from '../FormHandler/Constants';
import {AppStyles, Fonts} from '../../theme';

export default class FocusTextInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onRightPress: PropTypes.func,
    rightIcon: PropTypes.any,
    rightText: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isEmpty: PropTypes.bool,
    leftIcon: PropTypes.any,
    leftActiveIcon: PropTypes.any,
    onLeftPress: PropTypes.func,
    rightIconPressed: PropTypes.func,
    labelBackgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    outlined: PropTypes.bool,
    textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func,
  };

  static defaultProps = {
    label: 'placeholder',
    error: 'Error',
    onRightPress: () => {},
    rightIcon: null,
    rightText: '',
    value: '',
    labelBackgroundColor: '#fff',
    activeTextColor: '#3D304B',
    inactiveColor: '#BCB5C6',
    activeColor: '#000',
    outlined: false,
    textInputStyle: {},
    style: {},
    onFocus: () => {},
    returnKeyType: 'default',
    onSubmitEditing: () => {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isFocused: false,
      error: '',
      val: props.value ? props.value : '',
      maxHeight: 0,
      minHeight: 72,
      expanded: false,
      isError: false,
      isValidNumber: false,
      cca2: 'US',
      countryCode: '+1',
    };
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }
  _animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  animation = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({val: this.props.value});
    }
  }

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this.validate);
    }
    const {val} = this.state;
    if (val) {
      this.props.getCode && this.props.getCode(val);
      this.setState({isValidNumber: true});
    }

    this.animation.setValue(this.state.minHeight);
  }
  handleFocus = () => {
    this.props.onFocus();
    this.setState({isFocused: true});
    console.log('handleFocus');
  };

  setFocus = () => {
    const {countryField} = this.props;
    if (countryField) {
      this.phone.focus();
    } else {
      this.textInput.focus();
    }
  };

  handleBlur = () => this.setState({isFocused: false});
  animate = toValue => {
    Animated.timing(this._animatedIsFocused, {
      toValue: toValue,
      duration: 200,
    }).start();

    Animated.spring(this.animation, {
      toValue: this.state.expanded
        ? 18 + this.state.minHeight
        : this.state.minHeight,
    }).start();
  };
  labelStyle = {
    position: 'absolute',
    left: 10,
    top: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [13, -9],
    }),
    fontSize: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 14],
    }),
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
    backgroundColor: this.props.labelBackgroundColor,
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
  };

  borderColorStyle = {
    borderColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  colorStyle = {
    color: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  tintColorStyle = {
    tintColor: this._animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    }),
  };
  borderStyle = this.props.outlined
    ? {
        borderWidth: 1,
      }
    : {
        borderBottomWidth: 1,
      };
  _setMaxHeight(event) {
    if (
      event.nativeEvent.layout.height !==
      Math.round(event.nativeEvent.layout.height)
    ) {
      this.setState({
        maxHeight: Math.round(event.nativeEvent.layout.height),
      });
    }
  }

  setError = (val, error = this.state.error) => {
    let switchAnimation = {
      duration: 150,
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    LayoutAnimation.configureNext(switchAnimation);
    this.setState({isError: val, error});
  };

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }
  onChangeText = val => {
    this.props.onChangeValue && this.props.onChangeValue(val);
    this.setState({val, isError: false, error: ''});
  };
  setText = value => {
    this.onChangeText(value);
  };

  getValue = () => {
    if (this.props.type == INPUT_TYPES.MOBILE_NUMBER) {
      return {
        isValidNumber: this.state.isValidNumber,
        value: this.state.val,
        // countryCode :
      };
    }
    return this.state.val;
  };

  componentIcon = () => {
    if (this.props.rightIcon || this.state.expanded) {
      return (
        <ButtonView onPress={this.props.rightIconPressed}>
          <Animated.Image
            resizeMode="contain"
            // source={this.state.expanded ? Images.icError : this.props.iconImg}
            source={
              this.state.expanded ? this.props.rightIcon : this.props.rightIcon
            }
            // style={[this.tintColorStyle, { width: 24, height: 24 }, { tintColor: this.state.expanded && '#B00020' }]}
            style={[{width: 24, height: 24}]}
          />
        </ButtonView>
      );
    } else {
      return (
        <Animated.Text style={this.colorStyle}>
          {this.props.rightText}
        </Animated.Text>
      );
    }
  };

  // phone number
  onPressFlag() {
    // console.log('this.countryPicker : ', this.countryPicker);
    this.countryPicker.onOpen();
    // this.selectCountry();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({
      cca2: country.cca2,
      countryCode: `+${country.callingCode[0]}`,
    });
  }

  focus = () => {
    const {countryField} = this.props;

    if (!countryField) this.textInput.focus();
  };
  render() {
    const {isFocused, val, isValidNumber} = this.state;
    const {
      isHideFocus,
      labelText,
      MainViewPress,
      countryField,
      isPassword = false,
    } = this.props;
    return (
      <>
        {labelText && <Text style={styles.addNote}>{labelText}</Text>}
        <Animated.View
          style={[
            {
              height: this.animation,
              marginTop: 12,
              marginBottom:
                isPassword && this.state.isError && val.length
                  ? 40
                  : this.state.isError
                  ? 20
                  : 0,
            },
            this.props.style,
          ]}>
          <ButtonView
            onPress={MainViewPress}
            style={
              !isHideFocus && isFocused
                ? [styles.borderStyle, styles.activeColor]
                : [
                    styles.borderStyle,
                    this.props.borderStyle,
                    this.props.viewStyle,
                  ]
            }>
            {this.props.leftIcon && (
              <TouchableOpacity
                onPress={this.props.onLeftPress}
                style={styles.iconStyle}>
                <Image
                  resizeMode="contain"
                  source={
                    !isHideFocus && isFocused
                      ? this.props.leftActiveIcon
                      : this.props.leftIcon
                  }
                  style={[
                    {width: 20, height: 20, tintColor: 'rgb(69, 79, 99)'},
                  ]}
                />
              </TouchableOpacity>
            )}
            {!_.isUndefined(countryField) ? (
              <PhoneInput
                initialCountry="us"
                handleFocusAnimation={this.handleFocus}
                handleBlurAnimation={this.handleBlur}
                style={
                  isFocused
                    ? styles.activeColor
                    : [
                        styles.txtInputStyle,
                        this.props.textInputStyle,
                        {color: this.props.activeTextColor},
                      ]
                }
                allowZeroAfterCountryCode={false}
                //   value={`+${this.state.val}`}
                value={this.state.val}
                textStyle={{
                  color: '#454F63',
                }}
                textProps={{maxLength: 20}}
                onChangePhoneNumber={text => {
                  this.setState({
                    val: text,
                    isError: false,
                    isValidNumber: false,
                  });

                  if (this.phone.isValidNumber()) {
                    const countryCode = `+${this.phone.getCountryCode()}`;
                    const number = text.replace(countryCode, '');
                    const formatedNumber =
                      number.indexOf('-') === -1
                        ? `${countryCode}-${number}`
                        : `${countryCode}${number}`;

                    this.setState({isValidNumber: true, val: formatedNumber});
                    // this.props.getCode(formatedNumber);
                  }
                }}
                disabled={this.props.disabled}
                ref={ref => {
                  this.phone = ref;
                }}
              />
            ) : (
              <TextInput
                ref={ref => (this.textInput = ref)}
                style={[
                  styles.txtInputStyle,
                  this.props.textInputStyle,
                  {color: this.props.activeTextColor},
                ]}
                pointerEvents={
                  !_.isUndefined(this.props.pointerEvents) ? 'none' : null
                }
                placeholder={this.props.label}
                placeholderTextColor={
                  !isHideFocus && isFocused
                    ? this.props.activeTextColor
                    : this.props.inactiveColor
                }
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChangeText={this.onChangeText}
                blurOnSubmit={this.props.blurOnSubmit}
                value={this.state.val}
                multiline={this.props.multiline && true}
                maxLength={this.props.maxLength}
                editable={this.props.editable}
                autoCorrect={false}
                keyboardType={this.props.keyboardType}
                secureTextEntry={this.props.secureTextEntry}
                selectionColor={this.props.selectionColor}
                returnKeyType={this.props.returnKeyType}
                onSubmitEditing={this.props.onSubmitEditing}
                autoCapitalize={this.props.autoCapitalize || 'sentences'}
              />
            )}
            {this.props.rightIcon && (
              <TouchableOpacity
                onPress={this.props.onRightPress}
                style={styles.iconRightStyle}>
                <Image
                  resizeMode="contain"
                  source={this.props.rightIcon}
                  style={[{width: 18, height: 18}]}
                />
              </TouchableOpacity>
            )}
          </ButtonView>
          {this.state.isError && (
            <Text style={styles.errorStyle}>{this.state.error}</Text>
          )}
        </Animated.View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  iconRightStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  txtInputStyle: {
    minHeight: 52,
    height: 52,
    // fontSize: 20,
    color: '#27AAE1',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    alignSelf: 'stretch',
    flex: 1,
  },
  activeColor: {
    borderColor: '#00AEB2',
    backgroundColor: '#F7F7FA',
    borderWidth: 1,
  },
  addNote: {
    marginTop: 20,

    ...Fonts.SemiBoldFont(13),
  },
  inactiveColor: {},
  errorStyle: {
    color: '#B00020',
    paddingLeft: 15,
    marginTop: 5,
    marginBottom: 5,
    // width: 200,
    height: 90,
  },
  borderStyle: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#F7F7FA',
  },
});
