import React, {useCallback, useRef, useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  FocusTextField,
  DateTime,
  ButtonView,
  FlashMessage,
  ImageHandler,
  FormHandlerUpdated,
} from '@reuseableComponents';
import {Metrics, Images, Colors, AppStyles} from '@theme';
import {Block, Text, Checkbox} from '@components';
import ActionSheet from 'react-native-actionsheet';
import _ from 'lodash';
import {useDispatch} from 'react-redux';
import {request, success} from '@serviceAction';
import {USER} from '@actionTypes';
import {
  selectCameraImage,
  selectSingleImage,
} from '../../services/PickerUtiles';
import {pop, push, navigate} from '../../services/NavigationService';
import {useSelector} from 'react-redux';
import constant from '@constants';
import utility from '../../utility';
import {DUMP} from '@actionTypes';

export default EditProfile = ({navigation, route}) => {
  const {data} = useSelector(({userReducer}) => userReducer);

  const [selectedAddress, setSelectedAddress] = useState('');

  const formHandler = useRef();
  const actionSheet = useRef();

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(data?.image_url?.url);
  navigation.setOptions({
    headerRight: () => (
      <ButtonView style={styles.btnCont} onPress={onSubmit}>
        <Text size={15} color={Colors.BLUE}>
          Save
        </Text>
      </ButtonView>
    ),
    title: 'Edit Profile',
    headerTitleAlign: 'center',
  });

  useEffect(() => {
    setSelectedAddress(route?.params?.address);
  }, [route.params]);

  const onSubmit = () => {
    let formData = formHandler.current.onSubmitForm();
    if (!_.isUndefined(formData) && !_.isEmpty(formData) && isImageUploaded()) {
      let payload = new FormData();

      if (selectedImage && selectedImage.path) {
        payload.append('image_url', {
          uri: utility.isPlatformAndroid()
            ? selectedImage.path
            : 'file://' + selectedImage.path,
          type: 'image/jpg',
          name: 'Profile.jpeg',
        });
      }
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('mobile_no', formData.mobile_no);

      payload.append('address', formData.location);
      payload.append('zipcode', formData.zipcode);
      payload.append(
        'longitude',
        selectedAddress?.longitude
          ? selectedAddress?.longitude
          : data?.address?.coordinates?.longitude,
      );
      payload.append(
        'latitude',
        selectedAddress?.latitude
          ? selectedAddress?.latitude
          : data?.address?.coordinates?.latitude,
      );
      payload.append('dob', formData.dob);

      dispatch(
        request(
          DUMP,
          constant.editProfile + data?.slug,
          'PATCH',
          payload,
          true,
          res => {
            dispatch(success(USER, res));
            FlashMessage({
              message: 'Profile updated successfully',
              type: 'success',
            });
            pop();
          },
          () => {},
        ),
      );
    }
  };

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

  const isImageUploaded = () => {
    if (_.isEmpty(selectedImage)) {
      FlashMessage({
        message: 'Please upload image',
      });
      return false;
    }
    return true;
  };

  const popScreen = useCallback(() => {
    pop();
  }, []);
  const pushTo = screenName => () => {
    push(screenName);
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
      <Block flex>
        <Block center style={styles.mv20}>
          <ImageHandler
            source={
              selectedImage && selectedImage.path
                ? {uri: selectedImage.path}
                : _.isEmpty(selectedImage)
                ? Images.user
                : {uri: selectedImage}
            }
            style={styles.imgStyle}
          />
          <TouchableOpacity onPress={showAction} style={styles.add}>
            <Image source={Images.add} />
          </TouchableOpacity>
        </Block>
        <FormHandlerUpdated ref={formHandler}>
          {(refCollector, onSubmitEditing, focusByRefCollectorKey) => {
            const {text, email, number} = FormHandlerUpdated.INPUTS(
              refCollector,
              onSubmitEditing,
            );
            return (
              <>
                <FocusTextField
                  {...text({
                    label: 'Full Name',
                    identifier: 'name',
                    error: 'Full name is required',
                    returnKeyType: 'done',
                  })}
                  isHideFocus={true}
                  leftIcon={Images.icEditUser}
                  inactiveColor={'#454F63'}
                  autoCapitalize="none"
                  maxLength={50}
                  value={data?.name}
                  blurOnSubmit={true}
                />
                <FocusTextField
                  {...email({
                    label: 'Email Address',
                    identifier: 'email',
                    error: 'Invalid email format',
                  })}
                  isHideFocus={true}
                  editable={false}
                  value={data?.email}
                  leftIcon={Images.icEditEmail}
                  inactiveColor={'#454F63'}
                  autoCapitalize="none"
                  maxLength={50}
                  blurOnSubmit={true}
                />

                <FocusTextField
                  {...number({
                    label: 'Phone number',
                    identifier: 'mobile_no',
                    error: 'Phone number is required',
                  })}
                  countryField
                  isHideFocus={true}
                  disabled={true}
                  value={data?.mobile_no}
                  autoCapitalize="none"
                  maxLength={50}
                  blurOnSubmit={false}
                />

                <FocusTextField
                  {...text({
                    label: 'Location',
                    identifier: 'location',
                    error: 'Location is required',
                  })}
                  pointerEvents="none"
                  MainViewPress={() => navigate('LocationPicker', {from: ''})}
                  editable={false}
                  isHideFocus={true}
                  leftIcon={Images.icLocation}
                  inactiveColor={'#454F63'}
                  value={
                    selectedAddress?.address
                      ? selectedAddress?.address
                      : data?.address?.address
                  }
                  blurOnSubmit={false}
                />
                <FocusTextField
                  {...number({
                    label: 'Zip Code',
                    identifier: 'zipcode',
                    error: 'Zip Code is required',
                    returnKeyType: 'done',
                  })}
                  isHideFocus={true}
                  leftIcon={Images.icLocation}
                  inactiveColor={'#454F63'}
                  value={data?.address?.zipcode}
                  maxLength={50}
                  blurOnSubmit={true}
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
                  value={data?.dob}
                  rightIcon={Images.icCalendar}
                  maxDate={new Date()}
                  cbOnDateSelected={() => {}}
                />
              </>
            );
          }}
        </FormHandlerUpdated>
        <ActionSheet
          ref={actionSheet}
          options={['Camera', 'Photo Album', 'Cancel']}
          cancelButtonIndex={2}
          onPress={actionSheetOption}
        />
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
  mv20: {
    marginVertical: 20,
  },

  forgotStyle: {
    paddingVertical: Metrics.doubleBaseMargin,
  },
  imgStyle: {
    ...AppStyles.roundImage(130),
    marginVertical: Metrics.doubleBaseMargin,
    borderColor: Colors.GREY,
  },
  add: {
    position: 'absolute',
    justifyContent: 'center',
    top: 70,
    right: -20,
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
