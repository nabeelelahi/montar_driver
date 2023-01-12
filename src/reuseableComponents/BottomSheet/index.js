import React, {
  useRef,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetSnap = forwardRef((props, ref) => {
  const {snapPoint, style} = props;

  useImperativeHandle(ref, () => ({
    showModal() {
      setBSOpen();
    },
    hideModel() {
      handleClosePress();
    },
  }));

  function setBSOpen() {
    handleSnapPress(1);
  }

  // ref
  const bottomSheetRef = useRef();

  // variables
  const snapPoints = useMemo(() => snapPoint, []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      {props.children}
    </BottomSheet>
  );
});

export default BottomSheetSnap;
