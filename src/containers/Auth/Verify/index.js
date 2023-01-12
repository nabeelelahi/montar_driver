import React, { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { FocusTextField, ButtonView, AppButton } from '@reuseableComponents';
import { Metrics, Images, Colors, Fonts } from '@theme';
import { LogoImg, Block, Text, Social } from '@components';
import { pop, push } from '@nav';

export default Verify = () => {
  const pushTo = (screenName) => () => { push(screenName) }
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flexGrow}>
      <Block flex style={styles.blockmtop}>
        <Block style={styles.textView}>
          <Text samiBold h4 center style={styles.textStyle}>
            Verification Code
          </Text>
          <Text small center color={Colors.GREY}>{`Enter the verification code we just sent you on \nyour phone number`}</Text>
        </Block>
        <FocusTextField
          label={'Email Address'}
          isHideFocus={true}
          leftIcon={Images.icEmail}
          inactiveColor={'#454F63'}
          error="Invalid email format"
          autoCapitalize="none"
          identifier="email"
          maxLength={50}
          blurOnSubmit={false}
        />
        <AppButton
          title="VERIFY"
          style={styles.submitBtn}
          onPress={pop}
        />
        <Block
          center
          style={styles.mv30}>
          <Text small color={Colors.GREY}>If you didn’t receive a code!<Text small samiBold color={Colors.BLUE} style={styles.forgotStyle}> {`Resend`}</Text></Text>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },

  logoStyle: {
    marginTop: Metrics.xDoubleBaseMargin * 2.8 + Metrics.smallMargin,
  },
  textView: {
    marginTop: Metrics.xDoubleBaseMargin * 2,
    marginBottom: Metrics.xDoubleBaseMargin,
  },
  flexGrow: { flexGrow: 1 },
  textStyle: {
    marginBottom: Metrics.smallMargin,
    color: Colors.GREY
  },
  mv30: {
    marginVertical: Metrics.heightRatio(30)
  },
  forgotStyle: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  forgotBtn: {
    justifyContent: 'center',
  },
  submitBtn: {
    width: Metrics.screenWidth - 50,
    // marginTop: Metrics.heightRatio(10)
    marginVertical: 10
  },
  resetTxt: {
    marginVertical: Metrics.xDoubleBaseMargin,
    // justifyContent: 'flex-end',
  },
  blockmtop: { marginTop: Metrics.screenHeight / 8 }

});
