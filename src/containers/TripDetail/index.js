import {StyleSheet, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MAP_STYLE from '../../constants/MAP_STYLE';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Images, Metrics, Colors, animation} from '@theme';
import {Block, Social, Text} from '@components';
import {EventBusSingleton} from 'light-event-bus';
import {dispatchRequest} from '../../reuseableFunctions';
import constant from '@constants';
import {BOOKING_DETAILS} from '../../actions/ActionTypes';
import {request} from '../../actions/ServiceAction';
import {
  ButtonView,
  BottomSheetSnap,
  AppButton,
  FlatListHandler,
  LocCard,
} from '@reuseableComponents';
import {navigate} from '@nav';
import MapViewDirections from 'react-native-maps-directions';
import utility from '../../utility';
import {useSelector, useDispatch} from 'react-redux';

const origin = {
  latitude: 37.79069183144923,
  longitude: -122.43422390449729,
};
const destination = {
  latitude: 37.787656461953084,
  longitude: -122.42848397703112,
};

const TripDetails = ({route}) => {
  const mapView = useRef();
  const bsRef = useRef(null);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const dispatch = useDispatch();
  const {data} = useSelector(({bookingDetails}) => bookingDetails);

  const {bookingId} = route?.params;

  console.log('bookingId', bookingId);

  const getTripDetails = () => {
    dispatch(
      request(
        BOOKING_DETAILS,
        `${constant.getBooking}?id=${bookingId && bookingId}`,
        'GET',
        {},
        false,
        res => {
          setLocation(s => {
            s, res?.data?.booking_info?.pick_up_location?.coordinates;
          });
        },
        () => {},
      ),
    );
  };

  useEffect(() => {
    getTripDetails();
    setTimeout(() => {
      bsRef.current.showModal(),
        mapView.current?.fitToSuppliedMarkers(['origin', 'destination'], {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        });
    }, 300);
  }, []);

  console.log('tripDetails', data);

  const requestRideItem = () => {
    const {booking_info, rider, user} = data;
    return (
      <Block style={{marginVertical: Metrics.baseMargin}}>
        <Block style={{borderBottomWidth: 1, borderBottomColor: '#D9DCDF'}} />
        <Block
          row
          style={{
            marginVertical: Metrics.doubleBaseMargin,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: rider?.car_image?.file1,
            }}
            style={{
              width: Metrics.heightRatio(50),
              height: Metrics.heightRatio(50),
            }}
            resizeMode="cover"
          />

          <Block style={{marginLeft: Metrics.baseMargin}}>
            <Text samiBold body>
              {rider?.car_detail?.car_model}
            </Text>
            <Text body>{rider?.car_detail?.car_number}</Text>
          </Block>
        </Block>
      </Block>
    );
  };
  const {booking_info, rider, user} = data;

  return (
    <Block flex>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapView}
        loadingEnabled
        style={{flex: 1}}
        initialRegion={location}
        customMapStyle={MAP_STYLE}>
        {booking_info && booking_info ? (
          <MapViewDirections
            origin={booking_info?.pick_up_location?.coordinates}
            destination={booking_info?.drop_of_location?.coordinates}
            apikey={constant.GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="#454F63"
          />
        ) : null}
        {booking_info && booking_info ? (
          <Marker
            onPress={() => {}}
            stopPropagation={true}
            coordinate={booking_info?.pick_up_location?.coordinates}
            flat={true}
            anchor={{x: 0.3, y: 0.8}}
            //   key={`${ll}_${origin.latitude}`}
            identifier={'origin'}>
            <Image
              resizeMode="contain"
              style={{
                width: Metrics.heightRatio(40),
                height: Metrics.heightRatio(40),
              }}
              source={Images.icOrigin}
            />
          </Marker>
        ) : null}
        {booking_info && booking_info ? (
          <Marker
            onPress={() => {}}
            stopPropagation={true}
            coordinate={booking_info?.drop_of_location?.coordinates}
            flat={true}
            anchor={{x: 0.3, y: 0.8}}
            //   key={`${ii}_${destination.latitude}`}
            identifier={'destination'}>
            <Image
              resizeMode="contain"
              style={{
                width: Metrics.heightRatio(50),
                height: Metrics.heightRatio(50),
              }}
              source={Images.icCar}
            />
          </Marker>
        ) : null}
      </MapView>
      <BottomSheetSnap
        style={{backgroundColor: Colors.WHITE}}
        ref={bsRef}
        snapPoint={['10%', '60%']}>
        <Block style={styles.whereContainer} flex>
          <LocCard data={data} onPress={() => {}} />
          <Block
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#D9DCDF',
              marginVertical: Metrics.baseMargin,
            }}
          />
          <Block row>
            <Image
              source={{
                uri: user?.image_url?.url,
              }}
              style={{
                width: Metrics.heightRatio(50),
                height: Metrics.heightRatio(50),
                borderRadius: 50 / 2,
                marginRight: Metrics.baseMargin,
              }}
            />
            <Block>
              <Text style={{flex: 1}} body color={Colors.BLACK}>
                {data?.user?.name}
              </Text>
              <Text style={{flex: 1}} color={Colors.BLACK}>
                {booking_info?.rating?.rate + '.0'}
                <Text color={'#ffb100'}>{'\u2605'}</Text>
              </Text>
            </Block>
          </Block>
          <Block>
            <Text style={{marginTop: Metrics.smallMargin}} color={Colors.GREY}>
              {booking_info?.rating?.comments}
            </Text>
          </Block>
          {/*requestRideItem()*/}
        </Block>
      </BottomSheetSnap>
      <Block
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          backgroundColor: Colors.WHITE,
          padding: Metrics.baseMargin,
        }}>
        <Text color={Colors.GREY}>
          Here you can see rides that you have completed.
        </Text>
        <Block
          row
          style={{marginTop: Metrics.baseMargin, alignItems: 'center'}}>
          <Text samiBold>
            {utility.bookingDate(data?.booking_info?.updated_at)}
          </Text>
          <Text
            color={Colors.GREY}
            style={{marginLeft: Metrics.baseMargin, flex: 1}}>
            {utility.bookingTime(data?.booking_info?.updated_at)}
          </Text>
          <Text samiBold>{`$${data?.booking_info?.total_amount}`}</Text>
        </Block>
        <Block row style={{marginTop: Metrics.smallMargin}}>
          <Text style={{flex: 1}}>{'Idea Space'}</Text>
          <Text color={Colors.GREY}>{data?.booking_info?.ride_distance}</Text>
        </Block>
      </Block>
    </Block>
  );
};

export default TripDetails;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5FCFF'},
  top: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  bottom: {
    width: '100%',
    height: '100%',
    zIndex: 999,
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1
  },
  whereContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.WHITE,
    marginBottom: Metrics.doubleBaseMargin,
  },
  subContainer: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.INPUT,
    borderRadius: 15,
    marginTop: Metrics.baseMargin,
    alignItems: 'center',
  },
});
