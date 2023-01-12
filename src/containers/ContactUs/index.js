import {Block, Text} from '@components';
import {AppButton, FocusTextField} from '@reuseableComponents';
import {Colors, Metrics} from '@theme';
import React from 'react';
import {StyleSheet} from 'react-native';

export default params => {
  const renderEmailBlock = (title, dec) => {
    return (
      <Block flex>
        <Text body samiBold style={{marginBottom: Metrics.smallMargin}}>
          {title}
        </Text>
        <Text color={Colors.GREY}>{dec}</Text>
      </Block>
    );
  };

  return (
    <Block
      flex
      style={{
        paddingHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.WHITE,
      }}>
      <Text color={Colors.GREY} style={{marginTop: Metrics.baseMargin}}>
        Please contact us with your questions. Someone will reach out to you
        shortly. Thank you.
      </Text>
      <Block row style={{marginVertical: Metrics.baseMargin}}>
        {renderEmailBlock('Call', '+1 (469) 751-4052')}
        {renderEmailBlock('Email', 'support@pickryde.com')}
      </Block>
      <FocusTextField
        label={'Name'}
        isHideFocus={true}
        error="Invalid "
        inactiveColor={Colors.BACKGROUND}
        // type={INPUT_TYPES.PASSWORD}
        identifier="password"
        // value={'123456'}
        maxLength={50}
        blurOnSubmit={false}
      />
      <FocusTextField
        label={'Email address'}
        isHideFocus={true}
        error="Invalid "
        inactiveColor={Colors.BACKGROUND}
        // type={INPUT_TYPES.PASSWORD}
        identifier="password"
        // value={'123456'}
        maxLength={50}
        blurOnSubmit={false}
      />
      <FocusTextField
        label={'Message'}
        error="Enter message"
        isHideFocus={true}
        inactiveColor={Colors.BACKGROUND}
        identifier="description"
        maxLength={250}
        style={styles.inputTxtStyle}
        textInputStyle={styles.textInput}
        blurOnSubmit={false}
        multiline={true}
      />
      <AppButton title="SUBMIT" />
    </Block>
  );
};

const styles = StyleSheet.create({
  inputTxtStyle: {
    height: Metrics.heightRatio(120),
    marginBottom: Metrics.xDoubleBaseMargin,
  },
  textInput: {
    textAlignVertical: 'top',
    height: Metrics.heightRatio(120),
  },
});
