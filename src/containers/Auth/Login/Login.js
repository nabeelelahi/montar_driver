import React, {useContext, useRef} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {
  FocusTextField,
  ButtonView,
  AppButton,
  FormHandlerUpdated,
  FlashMessage,
} from '@reuseableComponents';
import {Metrics, Images, Colors, Fonts} from '@theme';
import {LogoImg, Block, Text, Social} from '@components';
import {navigate, push} from '@nav';
import {LoginContext} from '@contexts';
import HttpServiceManager from '@serviceManager';
import utility from '@utils';
import _ from 'lodash';
import constant from '@constants';
import {useDispatch} from 'react-redux';
import {request} from '@serviceAction';
import {USER} from '@actionTypes';
import {setIsEmailVerify} from '@utils';

export default Login = () => {
  const formHandler = useRef();
  const {isLogin, setLogin} = useContext(LoginContext);
  const dispatch = useDispatch();

  const pushTo = screenName => () => {
    push(screenName);
  };

  const onSubmit = () => {
    let formData = formHandler.current.onSubmitForm();
    if (!_.isUndefined(formData) && !_.isEmpty(formData)) {
      let payload = new FormData();
      payload.append('email', formData.email);
      payload.append('password', formData.password);
      payload.append(
        'device_type',
        utility.isPlatformAndroid() ? 'android' : 'ios',
      );
      payload.append('device_token', '432784687');
      payload.append('user_type', 'rider');

      dispatch(
        request(
          USER,
          constant.loginUser,
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
    let {api_token, is_mobile_verify} = response;

    HttpServiceManager.getInstance().userToken = `Bearer ${utility.getCryptoJSToken(
      api_token,
    )}`;

    //set flag for account is not verified
    setIsEmailVerify(is_mobile_verify);

    if (is_mobile_verify) {
      setTimeout(() => {
        setLogin();
      }, 800);
    } else {
      navigate('Verification');
    }
  }

  function cbFailure(error) {}

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flexGrow}>
      <LogoImg styles={styles.logoStyle} />
      <Block style={styles.textView}>
        <Text samiBold h3 style={styles.textStyle}>
          Hello There.
        </Text>
        <Text p>Login or sign up to continue.</Text>
      </Block>
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
                })}
                isHideFocus={true}
                leftIcon={Images.icEmail}
                inactiveColor={Colors.BACKGROUND}
                autoCapitalize="none"
                maxLength={50}
                // blurOnSubmit={false}
                // value={'john13@yopmail.com'}
              />
              <FocusTextField
                {...password({
                  label: 'Password',
                  identifier: 'password',
                  error: 'Password is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                leftIcon={Images.icPassword}
                inactiveColor={Colors.BACKGROUND}
                maxLength={50}
                blurOnSubmit={true}
              />
            </>
          );
        }}
      </FormHandlerUpdated>
      <Block bottom>
        <ButtonView style={styles.forgotBtn} onPress={pushTo('ForgotPassword')}>
          <Text small samiBold color={Colors.BLUE} style={styles.forgotStyle}>
            Forgot Password?
          </Text>
        </ButtonView>
      </Block>
      <AppButton
        title="SIGN IN"
        style={styles.signInBtn}
        onPress={() => onSubmit()}
      />
      <Block center style={styles.mvDouble}>
        <Text small>or you can also login with:</Text>
      </Block>

      <Block row center>
        <Social img={Images.icFb} styles={styles.mrDouble} onPress={() => {}} />
        <Social
          img={Images.icGoogle}
          styles={styles.mrDouble}
          onPress={() => {}}
        />
        <Social img={Images.icApple} onPress={() => {}} />
      </Block>

      <Block row center style={styles.mvDouble}>
        <ButtonView style={{}} onPress={() => {}}>
          <Text small>Don’t have an account?</Text>
        </ButtonView>
        <ButtonView style={{}} onPress={pushTo('SignUp')}>
          <Text samiBold color={Colors.BLUE}>{` SIGN UP`}</Text>
        </ButtonView>
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
  textStyle: {
    marginBottom: Metrics.smallMargin,
  },

  forgotStyle: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  flexGrow: {flexGrow: 1},
  forgotBtn: {
    justifyContent: 'center',
  },
  signInBtn: {
    width: Metrics.screenWidth - 50,
  },
  mrDouble: {marginRight: Metrics.doubleBaseMargin},
  mvDouble: {
    marginVertical: Metrics.xDoubleBaseMargin,
  },
});
