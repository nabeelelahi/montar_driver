import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
export default forwardRef(
  ({SelectedImage, UnSelectedImage, disableTouch = false, value = 0}, ref) => {
    const [RatingState, setRatingState] = useState(value);
    useImperativeHandle(ref, () => ({
      rating: RatingState,
      setRatingState,
    }));
    return (
      <View style={{flexDirection: 'row'}}>
        {[1, 1, 1, 1, 1].map((a, f) => (
          <TouchableOpacity
            disabled={disableTouch}
            onPress={() => setRatingState(f + 1)}>
            <Image
              source={RatingState <= f ? UnSelectedImage : SelectedImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  },
);
