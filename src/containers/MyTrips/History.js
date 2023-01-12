import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {FlatListHandler, LocCard, Loader} from '@reuseableComponents';
import {Text} from '@components';
import {dispatchRequest} from '../../reuseableFunctions';

import {Metrics} from '@theme';
import {navigate} from '@nav';
import constant from '@constants';
import {BOOKING_HISTORY} from '@actionTypes';
import {useSelector, useDispatch} from 'react-redux';
import utility from '../../utility';
import {request, success} from '@serviceAction';

export default params => {
  const [isFatching, setFatching] = useState(true);

  const {data, meta, isFetching} = useSelector(
    ({bookingHistory}) => bookingHistory,
  );

  console.log('bookingHistory', meta);

  const dispatch = useDispatch();

  useEffect(() => {
    getBookingScheduled();
  }, []);

  const renderItem = ({item}) => (
    <View>
      {DatePrice(item)}
      <LocCard
        data={item}
        onPress={() =>
          navigate('TripDetail', {bookingId: item?.booking_info?._id})
        }
      />
    </View>
  );

  const getBookingScheduled = (isConcat = false, page = 1) => {
    dispatch(
      request(
        BOOKING_HISTORY,
        `${constant.getBooking}?isComplete=true`,
        'GET',
        {},
        false,
        res => {
          setFatching(false);
        },
        () => {
          setFatching(false);
        },
        BOOKING_HISTORY.BASE,
        isConcat,
      ),
    );
  };
  console.log('getBookingScheduled', data);

  if (isFatching) {
    return <Loader />;
  }

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

const DatePrice = item => (
  <View style={styles.containerDatePrice}>
    <Text samiBold mini desc style={styles.date}>
      {`${utility.bookingDate(
        item?.booking_info?.updated_at,
      )} - ${utility.bookingTime(item?.booking_info?.updated_at)}`}
    </Text>
    <Text re mini grey>
      {`$${item?.booking_info?.total_amount}`}
    </Text>
  </View>
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
