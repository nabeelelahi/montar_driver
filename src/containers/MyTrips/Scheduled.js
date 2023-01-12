import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {FlatListHandler, LocCard, Loader} from '@reuseableComponents';
import {Text} from '@components';

import {Metrics} from '@theme';
import {navigate} from '@nav';
import {BOOKING_SCHEDULED} from '@actionTypes';
import constant from '@constants';

import {useSelector, useDispatch} from 'react-redux';
import utility from '../../utility';
import {request, success} from '@serviceAction';

export default params => {
  //   const [isFatching, setFatching] = useState(true);

  const {data, meta, isFetching} = useSelector(
    ({bookingScheduled}) => bookingScheduled,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getBookingScheduled();
  }, []);

  const renderItem = ({item}) => {
    console.log('renderItem', item);
    return (
      <View>
        {DatePrice(item)}
        <LocCard
          data={item}
          onPress={() => navigate('Home', {bookingData: item})}
        />
      </View>
    );
  };

  const DatePrice = item => {
    return (
      <View style={styles.containerDatePrice}>
        <Text samiBold mini desc style={styles.date}>
          {`${utility.bookingDate(
            item?.booking_info?.created_at,
          )} - ${utility.bookingTime(item?.booking_info?.created_at)}`}
        </Text>
        <Text re mini grey>
          {`$${item?.booking_info?.total_amount}`}
        </Text>
      </View>
    );
  };

  const getBookingScheduled = (isConcat = false, page = 1) => {
    dispatch(
      request(
        BOOKING_SCHEDULED,
        `${constant.getBooking}?isComplete=false`,
        'GET',
        {},
        false,
        res => {},
        () => {},
        BOOKING_SCHEDULED.BASE,
        isConcat,
      ),
    );
  };
  console.log('getBookingScheduled', data);

  return (
    <View style={styles.container}>
      <FlatListHandler
        style={styles.list}
        data={data}
        renderItem={renderItem}
        meta={meta}
        isFetching={isFetching}
        fetchRequest={getBookingScheduled}
      />
    </View>
  );
};

const itemSeparatorComopnent = () => (
  <View style={{height: Metrics.baseMargin}} />
);

const styles = StyleSheet.create({
  list: {paddingTop: Metrics.baseMargin},
  container: {flex: 1},
  containerDatePrice: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  date: {flex: 1},
});
