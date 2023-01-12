import React from 'react';
import {View, StyleSheet} from 'react-native';

import {FlatListHandler, TripCard} from '@reuseableComponents';
import {Text} from '@components';

import {Metrics} from '@theme';
import {navigate} from '@nav';

const data = [
  {
    pickUp: 'Pickup Location',
    pickupLoc: '1210 Ahtanum Ridge Dr, Yakima, WA 98903',
    dropOff: 'Destination Location',
    dropOffLoc: '210 Union Bay, Hall, WA 99903',
  },
  {
    pickUp: 'Pickup Location',
    pickupLoc: '1210 Ahtanum Ridge Dr, Yakima, WA 98903',
    dropOff: 'Destination Location',
    dropOffLoc: '210 Union Bay, Hall, WA 99903',
  },
  {
    pickUp: 'Pickup Location',
    pickupLoc: '1210 Ahtanum Ridge Dr, Yakima, WA 98903',
    dropOff: 'Destination Location',
    dropOffLoc: '210 Union Bay, Hall, WA 99903',
  },
  {
    pickUp: 'Pickup Location',
    pickupLoc: '1210 Ahtanum Ridge Dr, Yakima, WA 98903',
    dropOff: 'Destination Location',
    dropOffLoc: '210 Union Bay, Hall, WA 99903',
  },
];

export default params => {
  const renderItem = ({item}) => (
    <View>
      <DatePrice />
      <TripCard
        onPress={() => navigate('TripDetail')}
        data={item}
        isCancelled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatListHandler
        style={styles.list}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

const DatePrice = ({date, price}) => (
  <View style={styles.containerDatePrice}>
    <Text samiBold mini desc style={styles.date}>
      JAN 10 - 12:30 PM
    </Text>
  </View>
);

const styles = StyleSheet.create({
  //   list: {paddingTop: Metrics.baseMargin},
  container: {flex: 1, paddingHorizontal: Metrics.baseMargin},
  containerDatePrice: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  date: {flex: 1},
});
