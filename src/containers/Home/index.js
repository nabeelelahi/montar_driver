// @flow
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {StyleSheet, Image, Platform, Linking, Dimensions} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MAP_STYLE from '../../constants/MAP_STYLE';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Images, Metrics, Colors, animation} from '@theme';
import {Block, Text, BottomSheetViewItem, RouteMap} from '@components';
import {
  ButtonView,
  ImageButton,
  BottomSheetSnap,
  LocCard,
} from '@reuseableComponents';
import LottieView from 'lottie-react-native';
import {navigate} from '@nav';
import {EventBusSingleton} from 'light-event-bus';
import SocketIO, {EVENTS} from '../../services/SocketIO';
import {useDispatch, useSelector} from 'react-redux';
import {setDriverData} from '../../reuseableFunctions';

import {
  socketEmit,
  socketListeners,
  disconnectSocket,
} from '../../services/SocketHandler';
import _ from 'lodash';

import utility from '../../utility';
import {generalSaveAction} from '../../actions/ServiceAction';
import {DUMP, IS_ONLINE, USER} from '../../actions/ActionTypes';
import {getLocation, hasLocationPermission} from '../../utility/Location';
import MapViewDirections from 'react-native-maps-directions';
import constant from '@constants';
import {request} from '../../actions/ServiceAction';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 23.4241;
const LONGITUDE = 53.8478;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let counter = 1;

arr = [
  {latitude: '24.82689793459915', longitude: '67.04315212435702'},
  {latitude: '24.829741188241385', longitude: '67.04143551068407'},
  {latitude: '24.830490939465996', longitude: '67.04123166280466'},
  {latitude: '24.831932006976878', longitude: '67.04024460993975'},
];

function Home(props) {
  const {navigation, route} = props;

  const bsRef = useRef(null);
  const watchId = useRef(null);

  const dispatch = useDispatch();

  const {data} = useSelector(({userReducer}) => userReducer);

  const {online} = useSelector(({isOnline}) => isOnline);

  const [state, setState] = useState({
    status: 'initail',
    origin: {latitude: 37.79069183144923, longitude: -122.43422390449729},
    destination: {latitude: 37.787656461953084, longitude: -122.42848397703112},
    bookingData: '',
  });
  const [location, setLocation] = useState({
    latitude: 25.2048,
    longitude: 55.2708,
  });

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(true);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);

  useEffect(() => {
    const bookingInfo = route?.params?.bookingData;

    if (bookingInfo) {
      let dumpData = _.cloneDeep(data);
      dumpData.is_book = 1;
      setDriverData(dumpData);
      setState(s => ({
        ...s,
        status: bookingInfo?.booking_info?.rider_booking_status,
        bookingData: bookingInfo,
      }));
      bsRef.current.showModal();
    }
  }, [route?.params?.bookingData]);

  useEffect(() => {
    SocketIO.init(data);
    SocketIO.connectToSocket(data, () => {
      console.log('useEffect', online);
      if (online) {
        console.log('\n\n\n\n\n\n====JoinSocket====\n\n\n\n\n\n\n');
        SocketIO.JoinSocket(data);
      }
    });
  }, [online]);

  useEffect(() => {
    getDriver();
    getLocation(cbLocationSuccess);
  }, []);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  useEffect(() => {
    const {status} = state;
    if (status != 'initail') getLocationUpdates();
  }, []);

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      position => {
        // let obj = {
        //   latitude: position.coords.latitude + 0.01 * counter,
        //   longitude: position.coords.longitude + 0.01 * counter,
        // };

        setLocation(position.coords);
      },
      error => {},
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },

        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 5,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, []);

  useEffect(() => {
    onEmitRideTracking(location);

    setTimeout(() => {
      if (location && state.status == 'initail') {
        dispatch(
          request(
            DUMP,
            constant.updateCurrentLocation,
            'POST',
            {
              coordinate: JSON.stringify({
                latitude: location?.latitude,
                longitude: location?.longitude,
              }),
            },
            false,
            res => {},
            () => {},
          ),
        );
      }
    }, 300);
  }, [location]);

  function cbLocationSuccess(coordinate) {
    setLocation(coordinate);
  }

  const onRequestOnline = () => {
    console.log('online===============  ', online);
    if (!online) {
      SocketIO.JoinSocket(data);
      dispatch(generalSaveAction(IS_ONLINE, true));
    } else {
      disconnectSocket(data);
      cbClose();
      dispatch(generalSaveAction(IS_ONLINE, false));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      socketListeners(undefined, EVENTS.GENETRATE_REQUEST, response => {
        let distance = utility.isDistanse(
          {
            latitude: response?.booking_info?.pick_up_latitude,
            longitude: response?.booking_info?.pick_up_longitude,
          },
          {
            latitude: response?.booking_info?.drop_of_latitude,
            longitude: response?.booking_info?.drop_of_longitude,
          },
        );
        bsRef.current.showModal();
        setState(s => ({
          ...s,
          bookingData: response,
        }));
      });
      socketListeners(undefined, '_ride_accept_rider', response => {
        setState(s => ({
          ...s,
          bookingData: '',
        }));
      });

      socketListeners(undefined, '_customer_cancel', response => {
        cbClose();
        setState(s => ({...s, status: 'initail', bookingData: ''}));
      });

      socketListeners(undefined, EVENTS.RIDE_ACCEPT_BY_RIDER, response => {
        cbClose();
        setState(s => ({...s, status: 'initail', bookingData: ''}));
      });

      socketListeners(undefined, EVENTS.WAITING_ACCEPT_REQUEST, response => {
        setState(s => ({...s, status: 'initail', bookingData: ''}));
        cbClose();
      });
    }, 5000);
  }, []);

  const onEmitRideTracking = coordinate => {
    let params = {
      rider_id: data?.id,
      user_id: state?.bookingData?.user?.id,
      coordinate: JSON.stringify(coordinate),
    };
    socketEmit(undefined, EVENTS.RIDER_TRACKING, params, res => {
      //   setState({...state, status: res?.booking_info?.rider_booking_status});
    });
  };

  const onEmitRideAccepted = () => {
    let params = {
      pick_up_address: state?.bookingData?.booking_info?.pick_up_address,
      pick_up_longitude: state?.bookingData?.booking_info?.pick_up_longitude,
      pick_up_latitude: state?.bookingData?.booking_info?.pick_up_latitude,
      drop_of_address: state?.bookingData?.booking_info?.drop_of_address,
      drop_of_longitude: state?.bookingData?.booking_info?.drop_of_longitude,
      drop_of_latitude: state?.bookingData?.booking_info?.drop_of_latitude,
      rider_id: data?.id,
      rider_arr: JSON.stringify(state?.bookingData?.riders_ids),
      user_id: state?.bookingData?.booking_info?.user_id,
      ride_distance: state?.bookingData?.booking_info?.ride_distance,
      ride_time: state?.bookingData?.booking_info?.ride_time,
      total_amount: state?.bookingData?.booking_info?.total_amount,
    };

    socketEmit(undefined, EVENTS.RIDER_ACCEPTE_REQ, params, res => {
      setState({
        ...state,
        status: res?.booking_info?.rider_booking_status,
        bookingData: res,
      });
    });
  };

  const onEmitRideRejected = () => {
    let params = {
      user_id: data?.id,
    };
    socketEmit(undefined, EVENTS.RIDER_REJECT_REQ, params, res => {
      setState({
        ...state,
        bookingData: '',
      });
      cbClose();
    });
  };

  const onEmitPicUp = () => {
    let params = {
      booking_id: state?.bookingData?.booking_info?._id,
      user_id: state?.bookingData?.booking_info?.user_id,
      rider_id: data?.id,
      coordinate: JSON.stringify({
        latitude: location?.latitude,
        longitude: location?.longitude,
      }),
    };
    socketEmit(undefined, EVENTS.RIDER_START_JOB, params, res => {
      setState({
        ...state,
        status: res?.booking_info?.rider_booking_status,
        bookingData: res,
      });
    });
  };

  const onEmitDropOff = () => {
    getLocation(coordinate => {
      //   console.log('coordinate', coordinate);
    });

    console.log('\n\n\n\nonEmitDropOff', state.bookingData.booking_info);
    let params = {
      booking_id: state?.bookingData?.booking_info?._id,
      user_id: state?.bookingData?.booking_info?.user_id,
      rider_id: data?.id,
      ride_distance: 5,
    };
    socketEmit(undefined, EVENTS.RIDER_COMPLETE_JOB, params, res => {
      setState({
        ...state,
        status: res?.booking_info?.rider_booking_status,
        bookingData: res,
      });
    });
  };

  const onCbPickUp = () => {
    if (
      state?.bookingData?.booking_info?.rider_booking_status === 'ride_accept'
    ) {
      onEmitPicUp();
    } else if (
      state?.bookingData?.booking_info?.rider_booking_status === 'ride_start'
    ) {
      onEmitDropOff();
    } else if (
      state?.bookingData?.booking_info?.rider_booking_status === 'ride_complete'
    ) {
      navigate('My Trips', {index: 1});
      setState(s => ({...s, status: 'initail'}));
      cbClose();
      //   EventBusSingleton.publish('popup', {
      //     val: 'submit',
      //     onAccept: () => {
      //       EventBusSingleton.publish('popup', {
      //         val: 'ride',
      //         onAccept: () => {
      //           setState(s => ({...s, status: 'initail'}));
      //           cbClose();
      //         },
      //       });
      //     },
      //   });
    }
  };

  const openDialScreen = () => {
    // const {userPhone} = this.state;
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${'555-1212'}`;
    } else {
      number = `tel:${'555-1212'}`;
    }
    Linking.openURL(number);
  };

  const cbClose = () => bsRef.current.hideModel();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ImageButton
          source={Images.icNoti}
          style={{
            justifyContent: 'center',
            height: 40,
            marginRight: 10,
          }}
          onPress={() => navigate('Notifications')}
        />
      ),
    });
  }, [navigation]);

  const getDriver = () => {
    dispatch(
      request(
        USER,
        `${constant.editProfile}${data?.slug}`,
        'GET',
        {},
        false,
        res => {
          if (res && res.is_book) {
            setState(s => ({
              ...s,
              status: 'in_progress',
            }));
          }
        },
        () => {},
      ),
    );
  };

  return (
    <Block flex>
      <RouteMap
        location={location}
        // onChangeLocation={startRide}
        rideStatus={state.status}
        rideData={state?.bookingData?.booking_info}
      />

      <Block style={{position: 'absolute', bottom: 20, right: 20, left: 20}}>
        <ButtonView
          onPress={onRequestOnline}
          style={{
            backgroundColor: online ? Colors.GREEN : Colors.RED,
            alignItems: 'center',
            paddingVertical: Metrics.baseMargin,
            borderRadius: 10,
          }}>
          <Text samiBold body color={Colors.WHITE}>
            {online ? 'GO OFFLINE' : 'GO ONLINE'}
          </Text>
        </ButtonView>
      </Block>
      <BottomSheetSnap
        style={{backgroundColor: Colors.WHITE}}
        ref={bsRef}
        snapPoint={['10%', '55%']}>
        <BottomSheetViewItem
          onCall={openDialScreen}
          data={state?.bookingData && state?.bookingData}
          status={state.status}
          onReject={onEmitRideRejected}
          onAccept={onEmitRideAccepted}
          onPick={onCbPickUp}
        />
      </BottomSheetSnap>

      <StatusBar rideStatus={state.status} loc={location} />
    </Block>
  );
}

const StatusBar = ({rideStatus, loc}) => {
  let heading = 'Today’s Earning';
  if (rideStatus == 'ride_accept' || rideStatus == 'ride_start') {
    heading = 'Ride in progress';
  } else if (rideStatus == 'ride_complete') {
    heading = 'Ride Complete';
  } else if (rideStatus == 'in_progress') {
    heading = 'Your ride is in progress.Tab here to continue the ride';

    return isBookingPendingItem();
  }
  return (
    <Block row style={styles.statusBar}>
      <Text samiBold body color={Colors.WHITE} style={{flex: 1}}>
        {heading}
      </Text>
      {rideStatus == 'initail' ? (
        <Text samiBold body color={Colors.WHITE} style={{}}>
          {'$578.00'}
        </Text>
      ) : (
        <Image source={Images.icDrive} />
      )}
    </Block>
  );
};

const isBookingPendingItem = () => {
  return (
    <Block style={styles.bottom}>
      <ButtonView style={{flex: 1}} onPress={() => navigate('My Trips')}>
        <Text small>
          Your ride is in progress. Tap here to continue the ride.
        </Text>
      </ButtonView>
    </Block>
  );
};

export default Home;

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
    height: Metrics.heightRatio(160),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.WHITE,
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
  statusBar: {
    position: 'absolute',
    top: 20,
    right: 20,
    left: 20,
    backgroundColor: Colors.GREY,
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    borderRadius: 10,
    paddingHorizontal: Metrics.baseMargin,
  },
  bottom: {
    position: 'absolute',
    top: 20,
    right: 20,
    left: 20,
    backgroundColor: '#ffffff',
    width: '90%',
    paddingVertical: Metrics.baseMargin,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '',
    borderRadius: 15,
  },
});
