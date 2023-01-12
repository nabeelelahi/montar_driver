import React, {useCallback, useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {
  FocusTextField,
  ButtonView,
  AppButton,
  FlashMessage,
  FormHandlerUpdated,
} from '@reuseableComponents';
import {Metrics, Images, Colors, Fonts, AppStyles} from '@theme';
import {LogoImg, Block, Text, Social} from '@components';
import {pop, push} from '@nav';
import {DUMP} from '@actionTypes';
import constant from '@constants';
import utility from '@utils';
import {useDispatch} from 'react-redux';
import {request} from '@serviceAction';

export default ForgotPassword = () => {
  let formHandler = useRef();
  let dispatch = useDispatch();

  const onSubmit = () => {
    let formData = formHandler.current.onSubmitForm();
    if (!utility.isUndefined(formData) && !utility.isEmpty(formData)) {
      let payload = new FormData();
      payload.append('email', formData.email);

      dispatch(
        request(
          DUMP,
          constant.forgotPassword,
          'POST',
          payload,
          true,
          cbSuccess,
          cbFailure,
        ),
      );
    }
  };

  function cbSuccess(response, message) {
    FlashMessage({
      message: message,
      type: 'success',
      hideOnPress: pop(),
    });
  }

  function cbFailure(error) {}
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flexGrow}>
      <Block flex style={[styles.blockmtop]}>
        <Block style={[styles.textView]}>
          <Text samiBold h4 style={styles.textStyle}>
            Forgot Password?
          </Text>
          <Text
            size={19}
            color={Colors.GREY}
            style={
              styles.forgotText
            }>{`Enter the email address \nassociated with your account.`}</Text>
        </Block>
        <Block style={styles.semiCont}>
          <FormHandlerUpdated ref={formHandler}>
            {(refCollector, onSubmitEditing, focusByRefCollectorKey) => {
              const {email, password} = FormHandlerUpdated.INPUTS(
                refCollector,
                onSubmitEditing,
              );
              return (
                <>
                  <FocusTextField
                    {...email({
                      label: 'Email Address',
                      identifier: 'email',
                      error: 'Invalid email format',
                      returnKeyType: 'done',
                    })}
                    isHideFocus={true}
                    leftIcon={Images.icEmail}
                    inactiveColor={Colors.BACKGROUND}
                    autoCapitalize="none"
                    maxLength={50}
                    // value={'john13@yopmail.com'}
                    blurOnSubmit={true}
                  />
                </>
              );
            }}
          </FormHandlerUpdated>

          <Block style={styles.mt20}>
            <AppButton
              title="SUBMIT"
              style={styles.submitBtn}
              onPress={onSubmit}
            />
          </Block>
        </Block>

        <Block center flex style={styles.resetTxt}>
          <Text small center color={Colors.GREY}>
            We will email you a link to reset your{`\n`} password.
          </Text>
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
  mt20: {
    marginTop: Metrics.heightRatio(15),
  },
  semiCont: {
    marginTop: Metrics.heightRatio(-20),
  },

  logoStyle: {
    marginTop: Metrics.xDoubleBaseMargin * 2.8 + Metrics.smallMargin,
  },
  textView: {
    marginTop: Metrics.xDoubleBaseMargin * 2,
    marginBottom: Metrics.xDoubleBaseMargin,
  },
  flexGrow: {flexGrow: 1},
  textStyle: {
    marginBottom: Metrics.smallMargin,
    color: Colors.GREY,
  },

  forgotStyle: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  forgotBtn: {
    justifyContent: 'center',
  },
  submitBtn: {
    width: Metrics.screenWidth - 50,
    marginVertical: Metrics.heightRatio(10),
  },
  resetTxt: {
    marginVertical: Metrics.xDoubleBaseMargin,
    justifyContent: 'flex-end',
  },
  forgotText: {
    // flex: 1,
    // paddingHorizontal: Metrics.baseMargin,
    ...AppStyles.gbRe(30, 'rgb(69, 79, 99)'),
  },
  blockmtop: {marginTop: Metrics.screenHeight / 4},
});
