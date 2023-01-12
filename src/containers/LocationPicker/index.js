import React, {useState} from 'react';
import {View} from 'react-native';
import {AppButton, FlashMessage} from '../../reuseableComponents';
import {Colors, Metrics, Strings} from '../../theme';
import {navigate} from '../../services/NavigationService';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import utility from '../../utility';
import PlaceRow from './PlaceRow';
import styles from './styles';
import _ from 'lodash';
import constants from '../../constants';
import {showSpinner, hideSpinner} from 'react-native-globalspinner';

function LocationPicker(props) {
  const {route} = props;
  const {from, payload} = route.params;
  const [address, setAddress] = useState({});

  function getAddress(details) {
    showSpinner();
    const {description} = details;
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        description +
        '&key=' +
        constants.GOOGLE_API_KEY,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          const {geometry} = responseJson.results[0];
          const {lat, lng} = geometry.location;

          address.address = description;
          address.latitude = lat;
          address.longitude = lng;
          setAddress(address);

          hideSpinner();
        }
      });
  }

  function _onSubmit() {
    if (!_.isEmpty(address)) {
      if (_.isEqual(from, 'signup')) {
        navigate('SignUp', {address: address});
      } else if (_.isEqual(from, 'dropLocation')) {
        navigate('SelectRide', {
          ...payload,
          drop_of_address: address?.address,
          drop_of_longitude: address?.longitude,
          drop_of_latitude: address?.latitude,
        });
      } else {
        navigate('EditProfile', {address: address});
      }
    } else {
      FlashMessage({message: 'Please add location.'});
    }
  }

  return (
    <View style={{padding: 10, height: '100%'}}>
      <GooglePlacesAutocomplete
        placeholder={'Search Address..'}
        onPress={(data, details = null) => {
          getAddress(data);
        }}
        // currentLocation={true}
        // currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        suppressDefaultStyles
        textInputProps={{
          placeholderTextColor: Colors.LIGHT_GREY,
        }}
        styles={{
          textInput: styles.textInput,
          container: {
            ...styles.autocompleteContainer,
          },
          separator: styles.separator,
        }}
        fetchDetails
        query={{
          key: constants.GOOGLE_API_KEY,
          language: 'en',
          // components: 'country:ae',
        }}
        renderRow={data => <PlaceRow data={data} />}
      />

      <AppButton
        title={from == 'dropLocation' ? 'Pick Up' : 'Submit'}
        onPress={_onSubmit}
        style={{
          //   width: Metrics.screenWidth - 20,
          position: 'absolute',
          bottom: 20,
          left: 10,
          right: 10,
        }}
      />
    </View>
  );
}

export default LocationPicker;
