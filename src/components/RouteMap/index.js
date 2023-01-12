import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Platform, Dimensions, Image} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import utility from '../../utility';
import {ButtonView} from '../../reuseableComponents';
import MapViewDirections from 'react-native-maps-directions';
import constant from '../../constants';
import {Images} from '../../theme';
import {getLocation, hasLocationPermission} from '../../utility/Location';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8350158;
const LONGITUDE = 67.0331781;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function RouteMap(props) {
  const {location, rideStatus, rideData, isOnline} = props;

  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const [state, setState] = useState({
    latitude: parseFloat(location.latitude),
    longitude: parseFloat(location.longitude),
    originLocation: new AnimatedRegion({
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),

    routeCoordinates: [],
    rideStatus: rideStatus,
    originDiLocation: location,
    destinationLocation: {},
    heading: 0,
    cache: true,
  });

  useEffect(() => {
    if (location) {
      onAnimateMarker(location);
    }
  }, [location]);

  const getCurrentLocation = () => {
    getLocation(coord => {
      mapRef.current.animateToRegion(coord, 300);
    });
  };

  // useEffect(() => {
  //   if (location && String(isOnline) == 'true') {
  //     setTimeout(() => {
  //       mapRef.current?.fitToCoordinates([location], {
  //         edgePadding: {top: 40, right: 40, bottom: 40, left: 40},
  //       });
  //     }, 2000);
  //   }
  // }, [location, isOnline]);

  // useEffect(() => {
  //   if (!location || !state.destinationLocation) return;
  //   mapRef.current?.fitToCoordinates([location, state.destinationLocation], {
  //     edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
  //   });
  // }, [location, state.destinationLocation]);

  useEffect(() => {
    if (rideStatus) {
      if (utility.isEqual('ride_accept', rideStatus)) {
        setState(state => ({
          ...state,
          rideStatus: rideStatus,
          destinationLocation: rideData?.pick_up_location?.coordinates,
        }));
      }

      if (utility.isEqual('ride_start', rideStatus)) {
        setState(state => ({
          ...state,
          rideStatus: rideStatus,
          destinationLocation: rideData?.drop_of_location?.coordinates,
        }));
      }

      if (utility.isEqual('ride_complete', rideStatus)) {
        setState(state => ({
          ...state,
          rideStatus: rideStatus,
          destinationLocation: rideData?.drop_of_location?.coordinates,
        }));
      }

      if (utility.isEqual('initail', rideStatus)) {
        setState(
          state => ({
            ...state,
            rideStatus: rideStatus,
            destinationLocation: {},
          }),
          // toggleCache(),
        );
      }
    }
  }, [rideStatus, rideData]);

  async function onAnimateMarker(updatedCoordinate) {
    const {latitude, longitude, heading} = updatedCoordinate;

    const {originLocation, routeCoordinates} = state;
    const duration = 1500;

    if (Platform.OS === 'android') {
      if (markerRef) {
        markerRef.current.animateMarkerToCoordinate(
          updatedCoordinate,
          duration,
        );
      }
    } else {
      originLocation
        .timing({
          ...updatedCoordinate,
          useNativeDriver: false, // defaults to false if not passed explicitly
          duration,
        })
        .start();
    }

    setState(state => ({
      ...state,
      latitude,
      longitude,
      heading,
      routeCoordinates: routeCoordinates.concat([updatedCoordinate]),
      // originDiLocation: updatedCoordinate,
    }));
  }

  // const onUserLocationChange = async event => {
  //   const {latitude, longitude, heading} = event.nativeEvent.coordinate;
  //   // const {latitude, longitude} = event;
  //   const {routeCoordinates, originLocation} = state;
  //   const {onChangeLocation} = props;
  //   const duration = 1500;

  //   const newCoordinate = {
  //     latitude: latitude,
  //     longitude: longitude,
  //   };

  //   if (Platform.OS === 'android') {
  //     if (markerRef) {
  //       markerRef.current._component.animateMarkerToCoordinate(
  //         newCoordinate,
  //         duration,
  //       );
  //     }
  //   } else {
  //     originLocation
  //       .timing({
  //         ...newCoordinate,
  //         useNativeDriver: true, // defaults to false if not passed explicitly
  //         duration,
  //       })
  //       .start();
  //   }

  //   mapRef.current.fitToCoordinates([newCoordinate], {
  //     edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
  //     animated: true,
  //   });

  //   setState(state => ({
  //     ...state,
  //     latitude,
  //     longitude,
  //     routeCoordinates: routeCoordinates.concat([newCoordinate]),
  //     originDiLocation: newCoordinate, //set updated origin location
  //   }));

  //   onChangeLocation(newCoordinate);
  // };

  // function toggleCache() {
  //   const {cache} = state;
  //   setState(state => ({
  //     ...state,
  //     cache: !cache,
  //   }));
  // }

  // const {cache} = state;

  getMapRegion = () => ({
    latitude: state.latitude,
    longitude: state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={16}
        customMapStyle={MAP_STYLE}
        ref={mapRef}
        style={styles.map}
        region={state.latitude ? getMapRegion() : null}>
        {state.originLocation && (
          <Marker.Animated
            anchor={{x: 0.5, y: 0.6}}
            identifier={'origin'}
            ref={markerRef}
            coordinate={state.originLocation}>
            <Image
              source={Images.icCar}
              style={{
                ...(state.heading !== -1 && {
                  transform: [
                    {
                      rotate: `${state.heading}deg`,
                    },
                  ],
                }),
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
            />
          </Marker.Animated>
        )}

        {/*location &&
          state.destinationLocation &&
          !utility.isEmpty(state.destinationLocation) && (
            <MapViewDirections
              origin={location}
              destination={state.destinationLocation}
              apikey={constant.GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor={'#454F63'}
              lineDashPattern={[0]}
              resetOnChange={false}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                // mapRef.current.fitToCoordinates(result.coordinates, {
                //   edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
                //   // edgePadding: {
                //   //   right: Metrics.screenWidth / 20,
                //   //   bottom: Metrics.screenHeight / 20,
                //   //   left: Metrics.screenWidth / 20,
                //   //   top: Metrics.screenHeight / 20,
                //   // },
                // });
              }}
            />
            )*/}
        {state.destinationLocation &&
          !utility.isEmpty(state.destinationLocation) &&
          !utility.isEqual(rideStatus, 'initail') && (
            <Marker
              identifier={'destination'}
              coordinate={{
                latitude: state.destinationLocation?.latitude,
                longitude: state.destinationLocation?.longitude,
              }}
              image={Images.icDestination}
            />
          )}
      </MapView>
      <ButtonView
        onPress={getCurrentLocation}
        style={{
          position: 'absolute',
          bottom: 100,
          right: 20,
        }}>
        <Image source={Images.icLocation2} />
      </ButtonView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginBottom: 120,
    backgroundColor: 'transparent',
  },
});

export default RouteMap;
