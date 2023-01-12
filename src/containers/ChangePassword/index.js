import React, {useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Image} from 'react-native';
import {
  FocusTextField,
  ButtonView,
  FormHandlerUpdated,
  FlashMessage,
} from '@reuseableComponents';
import {Metrics, Images, Colors} from '@theme';
import {Block, Text, Checkbox} from '@components';
import {pop, push} from '@nav';
import _ from 'lodash';
import constant from '@constants';
import {DUMP} from '@actionTypes';
import {useDispatch} from 'react-redux';
import {request} from '@serviceAction';

export default ChangePassword = ({navigation}) => {
  const formHandler = useRef();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    isCheckbox: false,
    date: new Date(),
  });
  navigation.setOptions({
    headerRight: () => (
      <ButtonView onPress={onSubmit} style={styles.btnCont}>
        <Text size={15} color={Colors.BLUE}>
          Save
        </Text>
      </ButtonView>
    ),
    title: 'Change Password',
    headerTitleAlign: 'center',
  });

  const onSubmit = () => {
    let formData = formHandler.current.onSubmitForm();
    const payload = new FormData();
    if (!_.isEmpty(formData) && !_.isUndefined(formData)) {
      payload.append('current_password', formData.current_password);
      payload.append('new_password', formData.new_password);
      payload.append('confirm_password', formData.confirm_password);

      dispatch(
        request(
          DUMP,
          constant.changePassword,
          'POST',
          payload,
          true,
          () => {
            FlashMessage({
              message: 'Password has been updated successfully!.',
              type: 'success',
            });
            pop();
          },
          () => {},
        ),
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
      <FormHandlerUpdated ref={formHandler}>
        {(refCollector, onSubmitEditing, focusByRefCollectorKey) => {
          const {password, confirmPassword} = FormHandlerUpdated.INPUTS(
            refCollector,
            onSubmitEditing,
          );
          return (
            <>
              <FocusTextField
                {...password({
                  label: 'Old Password',
                  identifier: 'current_password',
                  error: 'Old password is required',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                autoCapitalize="none"
                isPassword={true}
                maxLength={50}
              />
              <FocusTextField
                {...password({
                  label: 'New Password',
                  identifier: 'new_password',
                  error: 'New password is required',
                })}
                isHideFocus={true}
                isPassword={true}
                inactiveColor={'#454F63'}
                autoCapitalize="none"
                maxLength={50}
              />

              <FocusTextField
                {...confirmPassword({
                  label: 'Confirm Password',
                  identifier: 'confirm_password',
                  error: 'Confirm password is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                isPassword={true}
                ConfirmTo="new_password"
                inactiveColor={'#454F63'}
                autoCapitalize="none"
                maxLength={50}
              />
            </>
          );
        }}
      </FormHandlerUpdated>
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
  mv20: {
    marginVertical: 20,
  },

  forgotStyle: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  add: {
    position: 'absolute',
    justifyContent: 'center',
    top: 50,
    left: 80,
  },
  aggreeTxt: {
    marginTop: Metrics.heightRatio(-8),
  },
  forgotBtn: {
    justifyContent: 'center',
  },
  checkbox: {
    marginTop: Metrics.heightRatio(15),
    marginBottom: Metrics.heightRatio(30),
  },
  scrollViewStyle: {flexGrow: 1, paddingVertical: Metrics.heightRatio(20)},
  signUpbtn: {
    width: Metrics.screenWidth - 50,
  },
  btnCont: {
    marginHorizontal: Metrics.heightRatio(15),
  },
  mvBase: {
    marginVertical: Metrics.xDoubleBaseMargin,
  },
});
