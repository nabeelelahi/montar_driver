import React from 'react';
import {View, Image} from 'react-native';
import {Text} from '../../components';
import {Images} from '../../theme';
import styles from './styles';

const PlaceRow = ({data}) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {data.description === 'Home' ? (
          <Image source={Images.ic_home} />
        ) : data.description === 'Work' ? (
          <Image source={Images.ic_bag} />
        ) : (
          <Image source={Images.ic_dropoff} />
        )}
      </View>
      <Text style={styles.locationText}>
        {data.description || data.vicinity}
      </Text>
    </View>
  );
};

export default PlaceRow;
