import {Text} from '@components';
import {AppStyles, Colors, Metrics, Images} from '@theme';
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {GrayDot, ButtonView} from '@reuseableComponents';

export default ({data, isSelected = false, onPress}) => {
  const {pickUp, pickupLoc, dropOff, dropOffLoc, isCancelled} = data;

  return (
    <ButtonView onPress={onPress} style={styles.container}>
      <GrayDot />
      <View style={styles.containerTitle}>
        <View style={styles.containerRow}>
          <Text mini desc style={{flex: 1}}>
            {pickUp}
          </Text>
          {isCancelled && (
            <Text re small style={styles.cancel}>
              Cancelled
            </Text>
          )}
          {isSelected && <Image source={Images.icCross} />}
        </View>

        <Text samiBold body style={styles.desc}>
          {pickupLoc}
        </Text>
        <Separator />
        <View style={styles.containerRow}>
          <Text mini desc style={{flex: 1}}>
            {dropOff}
          </Text>
          {isSelected && <Image source={Images.icUNFavorite} />}
        </View>
        <Text samiBold body style={styles.desc}>
          {dropOffLoc}
        </Text>
      </View>
    </ButtonView>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex: 1,
    width: '100%',
    height: 140,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    // marginHorizontal: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    // ...AppStyles.lightShadow,
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
  containerRow: {flexDirection: 'row'},
  containerTitle: {width: '100%', paddingRight: Metrics.baseMargin},
});
