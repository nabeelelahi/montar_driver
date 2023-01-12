import {StyleSheet, Image} from 'react-native';
import Block from '../Block';
import Text from '../Text';
import Social from '../Social';
import {LocCard, ButtonView, AppButton} from '@reuseableComponents';
import {Metrics, Colors, Images} from '@theme';
import React from 'react';
import {navigate} from '@nav';

const BottomSheetViewItem = props => {
  const {status, onCall, onReject, onAccept, onPick, data} = props;

  const {user, booking_info} = data;

  let rideStatus = status;
  let btnText = '';
  if (status === 'ride_accept') {
    rideStatus = 'pick-up';
    btnText = 'PICK UP';
  } else if (status === 'ride_start') {
    btnText = 'DROP OFF';
    rideStatus = 'drop-off';
  } else if (status === 'ride_complete') {
    rideStatus = 'complete';
    btnText = 'CONTINUE';
  }
  return (
    <Block style={styles.whereContainer} flex>
      <Block row style={{alignItems: 'center'}}>
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

        <Text p style={{flex: 1}} samiBold color={Colors.BLACK}>
          {user?.name}
        </Text>

        <Block>
          <Text body samiBold color={Colors.BLACK}>
            {'Estimated Fare'}
          </Text>
          <Text body color={Colors.BLACK}>
            {`$${booking_info?.total_amount}`}
          </Text>
        </Block>
      </Block>
      <Block
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#D9DCDF',
          marginVertical: Metrics.baseMargin,
        }}
      />
      <Block row style={{alignItems: 'center'}}>
        <Text style={{flex: 1}} h5 samiBold>
          {`${booking_info?.ride_distance} miles away`}
          {/* {`${booking_info?.ride_distance} away`} */}
        </Text>
        <Text color={'#326FA3'}>Share location</Text>
      </Block>
      <LocCard
        data={{
          pickUp: 'Pick up',
          pickupLoc: booking_info?.pick_up_address,
          dropOff: 'Drop off',
          dropOffLoc: booking_info?.drop_of_address,
          isCancelled: false,
        }}
        onPress={() => {}}
      />
      {status == 'initail' && (
        <Block
          row
          style={{
            justifyContent: 'space-between',
            marginBottom: Metrics.doubleBaseMargin,
          }}>
          <ButtonView
            onPress={onReject}
            style={[styles.btnStyle, {backgroundColor: '#EA121A'}]}>
            <Text body samiBold color={Colors.WHITE}>
              REJECT RIDE
            </Text>
          </ButtonView>
          <ButtonView
            onPress={onAccept}
            style={[styles.btnStyle, {backgroundColor: '#06BF28'}]}>
            <Text body samiBold color={Colors.WHITE}>
              ACCEPT RIDE
            </Text>
          </ButtonView>
        </Block>
      )}
      {status !== 'initail' ? (
        <Block
          row
          style={{
            marginBottom: Metrics.doubleBaseMargin,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Social
            img={Images.icMessage}
            style={{marginRight: Metrics.smallMargin}}
            onPress={() => navigate('Chat')}
          />

          <Social img={Images.icCall} onPress={onCall} />
          <AppButton
            onPress={() => onPick(rideStatus)}
            title={btnText}
            style={{
              width: Metrics.screenWidth / 2 + Metrics.heightRatio(40),
              marginLeft: Metrics.smallMargin,
              height: Metrics.heightRatio(56),
            }}
          />
        </Block>
      ) : (
        status !== 'initail' && (
          <Block style={{height: Metrics.heightRatio(60)}} />
        )
      )}
    </Block>
  );
};

export default BottomSheetViewItem;
const styles = StyleSheet.create({
  whereContainer: {
    height: Metrics.heightRatio(160),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.WHITE,
  },
  btnStyle: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.heightRatio(13),
    width: Metrics.screenWidth / 2 - Metrics.heightRatio(25),
  },
});
