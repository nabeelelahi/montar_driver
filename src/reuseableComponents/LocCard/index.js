import {Text} from '@components';
import {AppStyles, Colors, Metrics, Images} from '@theme';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {Dots, ButtonView} from '@reuseableComponents';

export default ({data, onPress, isSelected = false}) => {
  const {booking_info, rider, user, pickupLoc, dropOffLoc, isCancelled} = data;

  return (
    <ButtonView onPress={onPress} style={styles.container}>
      <Dots />
      <View style={styles.containerTitle}>
        <View style={styles.containerRow}>
          <Text samiBold small grey style={{flex: 1}}>
            {'Pick Up'}
          </Text>
          {isCancelled && (
            <Text re small style={styles.cancel}>
              Cancelled
            </Text>
          )}
          {isSelected && (
            <Image
              source={Images.icCross}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          )}
        </View>

        <Text gbRe mini desc style={styles.desc}>
          {booking_info ? booking_info?.pick_up_address : pickupLoc}
        </Text>
        <Separator />
        <View style={styles.containerRow}>
          <Text samiBold small grey style={{flex: 1}}>
            {'Drop Off'}
          </Text>
          {isSelected && (
            <Image
              source={Images.icUNFavorite}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          )}
        </View>
        <Text gbRe mini desc style={styles.desc}>
          {booking_info ? booking_info?.drop_of_address : dropOffLoc}
        </Text>
      </View>
    </ButtonView>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Metrics.heightRatio(180),
    backgroundColor: Colors.WHITE,
    marginHorizontal: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    ...AppStyles.lightShadow,
  },
  desc: {
    marginTop: Metrics.smallMargin,
  },
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.SEPARTOR,
    marginVertical: Metrics.baseMargin,
  },
  cancel: {color: Colors.RED},
  containerRow: {
    flexDirection: 'row',
    paddingRight: Metrics.smallMargin,
  },
  containerTitle: {width: '100%', paddingRight: Metrics.baseMargin},
});
