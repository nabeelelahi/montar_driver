//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:49:50 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {Alert, Linking} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
var CryptoJS = require('crypto-js');
import haversine from 'haversine';

let is_mobile_verify = false;

export const setIsEmailVerify = val => {
  is_mobile_verify = val;
};

export const getIsEmailVerify = () => {
  return is_mobile_verify;
};
class utility {
  EdgePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  isEqual(value1, value2) {
    return _.isEqual(value1, value2);
  }
  isEmpty(value) {
    return _.isEmpty(value);
  }
  isUndefined(value) {
    return _.isUndefined(value);
  }
  isNull(value) {
    return _.isNull(value);
  }
  isPlatformAndroid = () => Platform.OS === 'android';
  isPlatformIOS = () => Platform.OS === 'ios';
  focusOnMapCoordinates = (map, markers, edgePadding = this.EdgePadding) => {
    options = {
      edgePadding: edgePadding,
      animated: true,
    };
    map.fitToCoordinates(markers, options);
  };
  time(givenDate) {
    let local = moment(givenDate).format('LT');
    // let local = moment.utc(givenDate).local().format();
    return local;
  }
  date(givenDate) {
    let local = moment(givenDate).format('MMM Do YY'); // Mar 18th 22
    // let local = moment.utc(givenDate).local().format();
    return local;
  }
  isEmpty = value => {
    return _.isEmpty(value);
  };
  openCall(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }
  animateToFirstLocationCentered = (map, points, duration = 2000) => {
    var minX, maxX, minY, maxY;
    // init first point
    (point => {
      minX = +point.latitude;
      maxX = +point.latitude;
      minY = +point.longitude;
      maxY = +point.longitude;
    })(points[0]);

    // calculate rect
    points.map(point => {
      minX = Math.min(minX, +point.latitude);
      maxX = Math.max(maxX, +point.latitude);
      minY = Math.min(minY, +point.longitude);
      maxY = Math.max(maxY, +point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = maxX - minX;
    var deltaY = maxY - minY;
    map.animateToRegion(
      {
        latitude: +points[0].latitude,
        longitude: +points[0].longitude,
        latitudeDelta: deltaX * 2.5,
        longitudeDelta: deltaY * 2.5,
      },
      duration,
    );
  };
  validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    }
    return true;
  };
  alerts = (title, description, onPress) => {
    Alert.alert(
      title,
      description,
      [
        {text: 'OK', onPress: onPress},
        {text: 'Cancel', onPress: () => {}},
      ],
      {
        cancelable: false,
      },
    );
  };

  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  distance2(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;

    // return (
    //   Math.acos(
    //     Math.sin(lat1) * Math.sin(lat2) +
    //       Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1),
    //   ) * R
    // );
  }

  isEqual(value1, value2) {
    return _.isEqual(value1, value2);
  }
  isEmpty(value) {
    return _.isEmpty(value);
  }
  isUndefined(value) {
    return _.isUndefined(value);
  }
  isNull(value) {
    return _.isNull(value);
  }
  isReplaceDash(str) {
    return str.replace(/-/gi, '');
  }
  isConcat(data1, data2) {
    return _.concat(data1, data2);
  }
  isCloneDeep(data) {
    return _.cloneDeep(data);
  }

  getUriType(uri) {
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    return fileType;
  }

  isDistanse(start, end) {
    let distance = haversine(start, end);
    return this.isEqual(distance, 0) ? 1 : distance.toFixed(2);
  }

  openGaleery = (isMultiple = false, cbSuccess, cbFailure) => {
    ImagePicker.openPicker({
      compressImageQuality: 0.4,
      mediaType: 'photo',
      multiple: isMultiple,
    }).then(images => {
      if (isMultiple) {
        cbSuccess(images);
      } else {
        cbSuccess([images]);
      }
    });
  };
  openCamera = (cbSuccess, cbFailure) => {
    ImagePicker.openCamera({
      compressImageQuality: 0.4,
      mediaType: 'photo',
    }).then(image => {
      cbSuccess(image);
    });
  };
  openCameraForVideo = (cbSuccess, cbFailure) => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      cbSuccess(image);
    });
  };

  addOrRemove = (array, item) => {
    // console.log('array',array)
    let temp_arr = _.cloneDeep(array);

    const filteredData = temp_arr.find(e => e.id === item.id);
    const on = filteredData ? true : false;

    if (on) {
      return temp_arr.filter(c => {
        return c.id !== item.id;
      });
    } else {
      const result = temp_arr;
      result.push(item);
      return result;
    }
  };

  bookingDate(givenDate) {
    // let local = moment(givenDate).format('MMM DD'); // Mar 18th 22
    let local = moment.utc(givenDate).local().format('MMM DD');
    return local;
  }

  bookingTime(givenDate) {
    // let local = moment(givenDate).format('HH:mm A'); // Mar 18th 22
    let local = moment.utc(givenDate).local().format('HH:mm A');
    return local;
  }

  getCryptoJSToken = (clientId = '59200748-36fc-2744-355-8c1281f7fcd2') => {
    // var key = CryptoJS.enc.Utf8.parse(`kXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z`);
    // var iv = CryptoJS.enc.Utf8.parse(`I8zyA4lVhMCaJ5Kg`);
    var ciphertext = CryptoJS.AES.encrypt(
      clientId,
      'kXp2s5v8y/B?E(H+MbQeThWmZq3t6w9z',
      {iv: 'I8zyA4lVhMCaJ5Kg'},
    ).toString();
    console.log('Authorization ', ciphertext);
    return ciphertext;
  };
}

export default new utility();
