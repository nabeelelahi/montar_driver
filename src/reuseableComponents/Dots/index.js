import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Colors, Metrics} from '../../theme';

const Loader = ({style, spinerColor = Colors.CLEAR_BLUE}) => {
  const onLayout = useCallback(ev => {
    console.log('\n\n\n ev : ', ev);
  });

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <Dot style={styles.start} />
      <Dot style={styles.middle} />
      <Dot style={styles.middle} />
      <Dot style={styles.middle} />
      <Dot style={styles.middle} />
      <Dot style={styles.end} />
    </View>
  );
};

const Dot = ({style}) => <View style={style} />;

const styles = {
  container: {
    height: '100%',
    width: Metrics.widthRatio(14),
    alignItem: 'center',
    justifyContent: 'center',
    marginRight: Metrics.smallMargin,
    // backgroundColor: 'red',
  },
  start: {
    height: Metrics.widthRatio(8),
    width: Metrics.widthRatio(8),
    borderRadius: Metrics.widthRatio(4),
    borderWidth: 1,
    borderColor: 'black',
  },
  middle: {
    width: Metrics.widthRatio(4),
    height: Metrics.widthRatio(4),
    borderRadius: Metrics.widthRatio(2),
    marginLeft: Metrics.widthRatio(2),
    backgroundColor: 'black',
    marginVertical: Metrics.widthRatio(6),
  },
  end: {
    height: Metrics.widthRatio(8),
    width: Metrics.widthRatio(8),
    borderRadius: Metrics.widthRatio(4),
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#8C2BE2',
  },
};

export default Loader;
