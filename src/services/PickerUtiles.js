import MultiPicker from 'react-native-image-crop-picker';
import utility from '../utility';

const IMAGE_CONFIG = {
  multiple: true,
  //maxFiles: 6,
  mediaType: 'photo',
  // compressImageMaxWidth: 1024,
  // compressImageMaxHeight: 1024,
  compressImageQuality: 1,
};

const IMAGE_CONFIG_LOW_QUALITY = {
  // compressImageMaxWidth: 800,
  // compressImageMaxHeight: 600,
  compressImageQuality: 0.4,
  mediaType: 'photo',
};

// returns promise

const selectSingleImage = () =>
  MultiPicker.openPicker({
    multiple: false,
    mediaType: 'photo',
    compressImageQuality: 0.7,
  });

const selectMultipleImages = (maxFile = 5) =>
  MultiPicker.openPicker({
    multiple: true,
    mediaType: 'photo',
    maxFiles: maxFile,
    compressImageQuality: 0.7,
  });

const selectCameraImage = () =>
  MultiPicker.openCamera(
    utility.isPlatformAndroid()
      ? IMAGE_CONFIG_LOW_QUALITY
      : {compressImageQuality: 0.7, mediaType: 'photo'},
  );

//const pickVideo = (cb) => ImagePicker.showImagePicker(VIDEO_PICKER_OPTIONS, (video) => cb(video));

export {
  selectSingleImage,
  IMAGE_CONFIG_LOW_QUALITY,
  selectCameraImage,
  selectMultipleImages,
};
