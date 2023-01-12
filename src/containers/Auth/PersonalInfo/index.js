import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {ScrollView, StyleSheet, Image} from 'react-native';
import {
  FocusTextField,
  AppButton,
  FormHandlerUpdated,
  FlashMessage,
  CategoryPicker,
} from '@reuseableComponents';
import {Metrics, Images, Colors} from '@theme';
import {Block, Text} from '@components';
import {navigate, pop, push} from '@nav';
import {LoginContext} from '@contexts';
import _ from 'lodash';
import AddDocuments from '../../AddDocuments';
import constant from '@constants';
import {DUMP, CATEGORY} from '@actionTypes';
import {useDispatch, useSelector} from 'react-redux';
import {request} from '@serviceAction';
import utility from '@utils';

export default PersonalInfo = props => {
  let formHandler = useRef();
  const dispatch = useDispatch();
  const {setLogin} = useContext(LoginContext);
  const [isLicenseImg, setLicense] = useState([]);
  const [isCarImg, setCar] = useState([]);

  const slug = props.route?.params?.slug;

  const {data} = useSelector(({category}) => category);

  const cbOnGetCarType = () => {
    dispatch(
      request(
        CATEGORY,
        constant.getCategory,
        'GET',
        {},
        true,
        () => {},
        () => {},
      ),
    );
  };

  useEffect(() => {
    setTimeout(() => cbOnGetCarType(), 400);
  }, []);

  const _personalInfoUpdate = () => {
    let formData = formHandler.current.onSubmitForm();
    if (!utility.isUndefined(formData) && !utility.isUndefined(formData)) {
      let payload = new FormData();
      payload.append('driver_license_number', formData.driver_license_number);
      payload.append('car_model', formData.car_model);
      payload.append('car_number', formData.car_number);
      payload.append('car_color', formData.car_color);
      payload.append('car_insurance', formData.car_insurance_number);
      payload.append('vehicle_category_slug', formData.car_type);
      payload.append(
        'car_registration_number',
        formData.car_registration_number,
      );
      payload.append('car_transmission', formData.car_transmission);

      if (_.isEmpty(isLicenseImg) && isLicenseImg.length < 2) {
        FlashMessage({
          message: 'Please attach your driving license both front and back.',
        });
      } else if (_.isEmpty(isCarImg) && isCarImg.length < 2) {
        FlashMessage({
          message: 'Please attach your Car image both front and back.',
        });
      } else {
        payload.append(
          'linces_image',
          JSON.stringify({
            file1: isLicenseImg[0],
            file2: isLicenseImg[1],
          }),
        );
        payload.append(
          'car_image',
          JSON.stringify({
            file1: isCarImg[0],
            file2: isCarImg[1],
          }),
        );

        dispatch(
          request(
            DUMP,
            constant.editProfile + slug,
            'PATCH',
            payload,
            true,
            cbSuccess,
            cbFailure,
          ),
        );
      }
    }
  };

  function cbSuccess(response, message) {
    FlashMessage({
      message: 'Record has been created successfully',
      type: 'success',
    });

    setTimeout(() => {
      setLogin();
    }, 1000);
  }

  function cbFailure(error) {}
  // console.log(isLicenseImg);

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
      <AddDocuments
        title={'Personal Info'}
        description={'Attach your driving license (Front - Back)'}
        onSuccuss={imgs => {
          setLicense(s => imgs);
        }}
        docType={'license'}
        disable={false}
      />
      <Block style={styles.saparate} />

      <AddDocuments
        title={'Vehicle Details'}
        description={'Attach your car image (Front - Back)'}
        onSuccuss={imgs => {
          // console.log('car imgs : ', imgs);
          setCar(s => imgs);
        }}
        docType={'car'}
        disable={false}
      />

      <FormHandlerUpdated ref={formHandler}>
        {(refCollector, onSubmitEditing, focusByRefCollectorKey) => {
          const {text, number} = FormHandlerUpdated.INPUTS(
            refCollector,
            onSubmitEditing,
          );
          return (
            <>
              <CategoryPicker
                {...text({
                  label: 'Car Type',
                  identifier: 'car_type',
                  error: 'Car Type is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                // rightIcon={Images.ic_down}
                blurOnSubmit={false}
                options={data && data ? data : []}
                returnKey="slug"
                // value={city}
              />
              <FocusTextField
                {...number({
                  label: 'Driver License Number',
                  identifier: 'driver_license_number',
                  error: 'License Number is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'2323'}
              />

              <FocusTextField
                {...text({
                  label: 'Car Model',
                  identifier: 'car_model',
                  error: 'Car Model is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'DF2323'}
              />
              <FocusTextField
                {...number({
                  label: 'Car Number',
                  identifier: 'car_number',
                  error: 'Car Number is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'2222'}
              />
              <FocusTextField
                {...text({
                  label: 'Car Color',
                  identifier: 'car_color',
                  error: 'Car Color is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'red'}
              />
              <FocusTextField
                {...number({
                  label: 'Car Transmission',
                  identifier: 'car_transmission',
                  error: 'Car Transmission is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'5555'}
              />
              <FocusTextField
                {...number({
                  label: 'Car Registration Number',
                  identifier: 'car_registration_number',
                  error: 'Car Registration Number is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'1111'}
              />
              <FocusTextField
                label={'Car Insurance Number'}
                {...number({
                  label: 'Car Insurance Number',
                  identifier: 'car_insurance_number',
                  error: 'Car Insurance Number is required',
                  returnKeyType: 'done',
                })}
                isHideFocus={true}
                inactiveColor={'#454F63'}
                maxLength={50}
                blurOnSubmit={false}
                // value={'00000'}
              />
            </>
          );
        }}
      </FormHandlerUpdated>
      <Block
        style={{
          marginTop: Metrics.baseMargin,
          marginBottom: Metrics.xDoubleBaseMargin * 3,
        }}>
        <AppButton
          title="NEXT"
          style={styles.signUpbtn}
          onPress={() => _personalInfoUpdate()}
        />
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: Metrics.xDoubleBaseMargin * 2,
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
  mvBase: {
    marginVertical: Metrics.xDoubleBaseMargin,
  },
  saparate: {
    marginVertical: Metrics.baseMargin,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.PLACEHOLDER,
  },
});
