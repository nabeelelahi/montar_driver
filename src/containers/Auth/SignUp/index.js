import React, {useCallback, useRef, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  FocusTextField,
  AppButton,
  ButtonView,
  FormHandlerUpdated,
  ImageHandler,
  DateTime,
  FlashMessage,
} from '@reuseableComponents';
import ActionSheet from 'react-native-actionsheet';
import {
  selectCameraImage,
  selectSingleImage,
} from '../../../services/PickerUtiles';
import _ from 'lodash';
import {Metrics, Images, Colors} from '@theme';
import {Block, Text, Checkbox} from '@components';
import {pop, push, navigate} from '@nav';
import utility, {setIsEmailVerify} from '../../../utility';
import {dispatchRequest} from '../../../reuseableFunctions';
import constant from '@constants';
import {SIGNUP} from '@actionTypes';
import HttpServiceManager from '@serviceManager';
import {useDispatch} from 'react-redux';
import {request} from '@serviceAction';
import {USER} from '@actionTypes';

function SignUp({route}) {
  const formHandler = useRef();
  const actionSheet = useRef();
  const [isCheckbox, setCheckBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const dispatch = useDispatch();

  const popScreen = useCallback(() => {
    pop();
  }, []);
  const pushTo = screenName => () => {
    push(screenName);
  };

  useEffect(() => {
    setSelectedAddress(route?.params?.address);
  }, [route.params]);

  const showAction = () => {
    actionSheet.current.show();
  };
  const actionSheetOption = index => {
    switch (index) {
      case 0:
        return setTimeout(() => onCameraSelected(), 1000);
      case 1:
        return setTimeout(() => onGallerySelected(), 1000);

      default:
        () => {};
    }
  };

  const onGallerySelected = () => {
    selectSingleImage()
      .then(images => {
        setSelectedImage(images);
      })
      .catch(e => {});
  };

  const onCameraSelected = () => {
    selectCameraImage()
      .then(images => {
        setSelectedImage(images);
      })
      .catch(e => {});
  };

  const isAgreed = () => {
    if (isCheckbox) return true;
    else {
      FlashMessage({
        message: 'Please accept Terms & Condition',
      });
      return false;
    }
  };

  const isImageUploaded = () => {
    if (_.isEmpty(selectedImage)) {
      FlashMessage({
        message: 'Please upload image',
      });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    let formData = formHandler.current.onSubmitForm();

    if (
      !_.isUndefined(formData) &&
      !_.isEmpty(formData) &&
      isImageUploaded() &&
      isAgreed()
    ) {
      let payload = new FormData();
      payload.append('image_url', {
        uri: utility.isPlatformAndroid()
          ? selectedImage.path
          : 'file://' + selectedImage.path,
        type: 'image/jpg',
        name: 'Profile.jpeg',
      });
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('mobile_no', formData.mobile_no);
      payload.append('password', formData.password);
      payload.append('confirm_password', formData.confirm_password);
      payload.append('address', formData.location);
      payload.append('zipcode', formData.zipcode);
      payload.append('city', 'Dallas');
      payload.append('state', 'Texas');
      payload.append('longitude', selectedAddress?.longitude);
      payload.append('latitude', selectedAddress?.latitude);
      payload.append('notifications', 1);
      payload.append('dob', formData.dob);
      payload.append('user_type', 'rider');
      payload.append(
        'device_type',
        utility.isPlatformAndroid() ? 'android' : 'ios',
      );
      payload.append('device_token', 'asdw4c35CXasd54v2a54sdwf');

      dispatch(
        request(
          USER,
          constant.createUser,
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
    const {api_token, is_mobile_verify} = response;

    HttpServiceManager.getInstance().userToken = `Bearer ${utility.getCryptoJSToken(
      api_token,
    )}`;

    //set flag for account is not verified
    setIsEmailVerify(is_mobile_verify);

    setTimeout(() => {
      navigate('Verification');
    }, 800);
  }

  function cbFailure(error) {}

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
      <Block center style={styles.mv20}>
        <ImageHandler
          source={
            selectedImage.path
              ? {uri: selectedImage.path}
              : _.isEmpty(selectedImage)
              ? Images.user
              : {uri: selectedImage}
          }
          style={{
            width: Metrics.widthRatio(96),
            height: Metrics.widthRatio(96),
            borderRadius: Metrics.widthRatio(90) / 2,
          }}
        />
        <TouchableOpacity onPress={showAction} style={styles.add}>
          <Image source={Images.add} />
        </TouchableOpacity>
      </Block>
      <FormHandlerUpdated ref={formHandler}>
        {(refCollector, onSubmitEditing, focusByRefCollectorKey) => {
          const {text, email, password, number, confirmPassword} =
            FormHandlerUpdated.INPUTS(refCollector, onSubmitEditing);
          return (
            <>
              <FocusTextField
                {...text({
                  label: 'Full Name',
                  identifier: 'name',
                  error: 'Full name is required',
                })}
                isHideFocus={true}
                leftIcon={Images.icUser}
                inactiveColor={'#454F63'}
                autoCapitalize="none"
                maxLength={50}
                // value={'John'}
              />
              <FocusTextField
                {...email({
                  label: 'Email Address',
                  identifier: 'email',
                  error: 'Invalid email format',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                leftIcon={Images.icEmail}
                inactiveColor={'#454F63'}
                autoCapitalize="none"
                maxLength={50}
                blurOnSubmit={true}
                // value={'john@yopmail.com'}
              />

              <FocusTextField
                {...number({
                  label: 'Phone number',
                  identifier: 'mobile_no',
                  error: 'Phone number is required',
                })}
                countryField
                isHideFocus={true}
                autoCapitalize="none"
                maxLength={50}
                blurOnSubmit={false}
                // value={'+1-5417458475'}
              />

              <FocusTextField
                {...text({
                  label: 'Location',
                  identifier: 'location',
                  error: 'Location is required',
                })}
                pointerEvents="none"
                MainViewPress={() =>
                  navigate('LocationPicker', {from: 'signup'})
                }
                editable={false}
                isHideFocus={true}
                leftIcon={Images.icLocation}
                inactiveColor={'#454F63'}
                blurOnSubmit={false}
                value={selectedAddress?.address}
              />
              <FocusTextField
                {...number({
                  label: 'Zip Code',
                  identifier: 'zipcode',
                  error: 'Zip Code is required',
                })}
                isHideFocus={true}
                leftIcon={Images.icLocation}
                inactiveColor={'#454F63'}
                // value={'123456'}
                maxLength={50}
                blurOnSubmit={false}
              />

              <DateTime
                {...text({
                  label: 'Date of birth',
                  identifier: 'dob',
                  error: 'Date of birth is required',
                  returnKeyType: 'done',
                })}
                mode="date"
                isHideFocus={true}
                leftIcon={Images.icBirthDay}
                inactiveColor={'#454F63'}
                rightIcon={Images.icCalendar}
                maxDate={new Date()}
                cbOnDateSelected={() => {}}
                // value={'2001-02-02'}
              />

              <FocusTextField
                {...password({
                  label: 'Password',
                  identifier: 'password',
                  error: 'Password is required',
                })}
                isPassword={true}
                isHideFocus={true}
                leftIcon={Images.icPassword}
                inactiveColor={'#454F63'}
                secureTextEntry={true}
                autoCapitalize="none"
                blurOnSubmit={false}
                // value={'Test@123'}
              />

              <FocusTextField
                {...confirmPassword({
                  label: 'Confirm Password',
                  identifier: 'confirm_password',
                  error: 'Confirm password is required',
                  returnKeyType: 'done',
                })}
                isPassword={true}
                isHideFocus={true}
                leftIcon={Images.icConfirmPassword}
                inactiveColor={'#454F63'}
                autoCapitalize="none"
                blurOnSubmit={true}
                // value={'Test@123'}
              />
            </>
          );
        }}
      </FormHandlerUpdated>
      <Block row>
        <Checkbox
          style={styles.checkbox}
          color={Colors.BLUE}
          iconColor={Colors.WHITE}
          onChange={val => setCheckBox(val)}
          label="I agree to the"
          hyperLinkText="Terms and Conditions"
          onLinkPressed={() => console.log('Link')}
        />
      </Block>

      <AppButton
        title="SIGN UP"
        style={styles.signUpbtn}
        // onPress={pushTo('PersonalInfo')}
        onPress={onSubmit}
      />
      <Block center style={styles.mvBase}>
        <Text color={Colors.GREY}>
          Already have an account?
          <Text
            onPress={popScreen}
            small
            samiBold
            color={Colors.BLUE}
            style={styles.forgotStyle}>
            {' '}
            {`Sign In`}
          </Text>
        </Text>
      </Block>
      <ActionSheet
        ref={actionSheet}
        options={['Camera', 'Photo Album', 'Cancel']}
        cancelButtonIndex={2}
        onPress={actionSheetOption}
      />
    </ScrollView>
  );
}
export default SignUp;
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
    right: -15,
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
  mvBase: {
    marginVertical: Metrics.xDoubleBaseMargin,
  },
});
