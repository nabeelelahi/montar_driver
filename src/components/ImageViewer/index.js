import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {ButtonView} from '../../reuseableComponents';
import {Metrics, AppStyles, variables, Images} from '../../theme';

function ImageViewer(props) {
  const {onPress, uri, onPressRemove, disabled, style, backImage} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardStyle, style]}
      disabled={disabled}>
      {uri ? (
        <View>
          <Image
            source={{uri: uri}}
            style={styles.img}
            // resizeMode={FastImage.resizeMode.cover}
          />
          {!disabled && (
            <TouchableOpacity onPress={onPressRemove} style={styles.cancelBtn}>
              <Image source={Images.icCross} style={styles.removeBtn} />
            </TouchableOpacity>
          )}
        </View>
      ) : backImage ? (
        <Image source={Images.icPlaceholder} />
      ) : (
        <Image source={Images.icPlus} />
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardStyle: {
    width: Metrics.screenWidth / 2 - 24,
    margin: 4,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#f7f7fa',
    ...AppStyles.centerAligned,
  },
  img: {
    width: Metrics.screenWidth / 2 - 24,
    height: 80,
    borderRadius: 5,
  },
  cancelBtn: {
    position: 'absolute',
    right: 5,
    top: 2,
  },
  removeBtn: {
    height: 20,
    width: 20,
  },
});
export default ImageViewer;
