import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Metrics, AppStyles, Images, Colors} from '../../theme';
import {Text} from '../../components';
import {Modal} from 'react-native-modals';
import utility from '../../utility';
import FlatListHandler from '../FlatListHandler';
import {ButtonView} from '../../reuseableComponents';

const ImagePickerModal = forwardRef((props, ref) => {
  const [isVisible, setVisiblity] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal() {
      setVisiblity(true);
    },
  }));

  const renderItem = ({item}) => {
    const {title, img, type} = item;
    return (
      <TouchableOpacity onPress={() => onOpenPicker(type)}>
        <View
          style={{
            ...AppStyles.flexRow,
            padding: Metrics.baseMargin,
          }}>
          {/* <Image
            source={img}
            style={{
              width: Metrics.widthRatio(20),
              height: Metrics.heightRatio(20),
              tintColor: '#454f63',
            }}
            resizeMode={'contain'}
          /> */}
          <Text style={{marginLeft: Metrics.baseMargin}}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  function onOpenPicker(type) {
    setVisiblity(false);

    setTimeout(() => {
      if (utility.isEqual(type, 'camera')) {
        utility.openCamera(cbCameraSuccess, cbFailure);
      } else if (utility.isEqual(type, 'galley')) {
        utility.openGaleery(false, cbSuccess, cbFailure);
      } 
    }, 1000);
  }
  function cbCameraSuccess(response) {
    const {success, type} = props;
    success([response], type);
  }
  function cbSuccess(response) {
    const {success, type} = props;
    success(response, type);
  }
  function cbFailure(error) {}

  const {title, list, style} = props;
  return (
    <View>
      <Modal visible={isVisible} onTouchOutside={() => setVisiblity(false)}>
        <View style={[styles.constainer, style]}>
          <View style={styles.header}>
            <Text style={{color: Colors.WHITE}}>{title}</Text>
            <ButtonView onPress={() => setVisiblity(false)}>
              <Image source={Images.ic_cancel} />
            </ButtonView>
          </View>

          <FlatListHandler data={list} renderItem={renderItem} />
        </View>
      </Modal>
    </View>
  );
});

export default ImagePickerModal;
const styles = StyleSheet.create({
  constainer: {
    width: Metrics.screenWidth - 16,
    height: 150,
    backgroundColor: Colors.INPUT,
  },
  header: {
    ...AppStyles.rowAligned,
    backgroundColor: Colors.LIGHT_GREY,
    padding: Metrics.smallMargin,
  },
  text: {},
  btn: {
    width: Metrics.screenWidth / 2 - 32,
    height: 50,
    marginLeft: 8,
  },
});
