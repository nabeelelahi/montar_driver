import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ImageViewer, Text} from '../../components';
import {ImagePickerModal} from '../../reuseableComponents';
import {Metrics, AppStyles, Colors, Fonts, Images} from '../../theme';
import utility from '../../utility';
import {useDispatch} from 'react-redux';
import constant from '../../constants';
import {request} from '../../actions/ServiceAction';
let type = 'front';

export const photolist = [
  {
    id: 1,
    // img: Images.ic_camera,
    title: 'Open Camera',
    type: 'camera',
  },
  {
    id: 2,
    // img: Images.ic_gallery,
    title: 'Import from Library',
    type: 'galley',
  },
];

function AddDocuments(props) {
  let dispatch = useDispatch();
  const {images, onSuccuss} = props;
  const modalRef = useRef();
  const [frontImage, setFrontImage] = useState(images && images.file1);
  const [backImage, setBackImage] = useState(images && images.file2);

  useEffect(() => {
    frontImage && backImage && onSuccuss([frontImage, backImage]);
  }, [frontImage, backImage]);

  useEffect(() => {
    setFrontImage(images && images.file1);
    setBackImage(images && images.file2);
  }, [images]);

  // function cbImageSuccess(response) {
  //   const {path} = response[0];
  //   let uri = utility.isPlatformAndroid() ? path : 'file://' + path;

  //   console.log('type ', type);
  //   if (utility.isEqual(type, 'front')) {
  //     setFrontImage(uri);
  //   } else {
  //     setBackImage(uri);
  //   }
  // }

  function cbImageSuccess(response) {
    const {path} = response[0];

    let uri = utility.isPlatformAndroid() ? path : 'file://' + path;

    let formData = new FormData();
    formData.append('type', props.docType);

    formData.append('file', {
      uri: uri,
      name: `image.${utility.getUriType(uri)}`,
      type: `image/jpeg`,
    });

    dispatch(
      request(
        undefined,
        constant.mediaCreate,
        'POST',
        formData,
        true,
        cbSuccess,
        cbFailure,
      ),
    );

    function cbSuccess(response, message) {
      const {url} = response;

      if (utility.isEqual(type, 'front')) {
        setFrontImage(url);
      } else {
        setBackImage(url);
      }
    }
    function cbFailure(error) {}
  }

  function _onRemoveImage(val) {
    if (utility.isEqual(val, 'front')) {
      setFrontImage(undefined);
    } else {
      setBackImage(undefined);
    }
  }
  function _openPicker(val) {
    type = val;
    modalRef.current.showModal();
  }

  const {title, description, style, isValue, disable} = props;
  return (
    <View style={[styles.container, style]}>
      <Text samiBold body>
        {title}
      </Text>
      <Text>{description}</Text>

      <View style={{...AppStyles.flexRow, marginVertical: Metrics.smallMargin}}>
        <ImageViewer
          uri={frontImage}
          onPress={() => _openPicker('front')}
          // style={{borderWidth: 1, borderColor: Colors.LIGHT_GREY}}
          onPressRemove={() => _onRemoveImage('front')}
          disabled={disable}
        />
        <ImageViewer
          uri={backImage}
          onPress={() => _openPicker('back')}
          // style={{backgroundColor: isValue ? Colors.GREY : Colors.LIGHT_GREY}}
          onPressRemove={() => _onRemoveImage('back')}
          disabled={disable}
          backImage={true}
        />
      </View>

      <ImagePickerModal
        ref={modalRef}
        title={'Add File'}
        list={photolist}
        type={'media'}
        isMultiple={false}
        success={cbImageSuccess}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 145,
    marginTop: Metrics.smallMargin,
    backgroundColor: 'transparent',
  },
  title: {
    color: Colors.white,
    ...Fonts.SemiBoldFont(),
    lineHeight: 19,
    marginTop: 8,
  },
  description: {
    color: Colors.white,
    lineHeight: 17,
  },
});
export default AddDocuments;
