import {Block, Text} from '@components';
import {ButtonView, ImageHandler} from '@reuseableComponents';
import {push, pop} from '@nav';
import {AppStyles, Colors, Images, Metrics} from '@theme';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function Profile({navigation}) {
  const {data} = useSelector(({userReducer}) => userReducer);

  const Row = ({title, img, text}) => (
    <View style={styles.containerRow}>
      <Image source={img} style={styles.rowIconStyle} />
      <View style={styles.mh20}>
        <Text size={16} color={Colors.GREY} style={styles.font}>
          {title}
        </Text>
        <Text size={15} color={Colors.GREY} style={[styles.font, styles.mt10]}>
          {text}
        </Text>
      </View>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
      <Block center style={styles.imgMargins}>
        <ImageHandler
          source={{
            uri: data?.image_url?.url,
          }}
          style={styles.imgStyle}
        />
      </Block>
      <Row title="Full Name" img={Images.icUser} text={data?.name} />
      <Row title="Email Address" img={Images.icEmail} text={data?.email} />
      <Row title="Phone Number" img={Images.icPhone} text={data?.mobile_no} />
      <Row title="Date Of Birth" img={Images.icBirthDay} text={data?.dob} />
      <Row
        title="Address"
        img={Images.icLocation}
        text={data?.address?.address}
      />
      <Row
        title="Zip Code"
        img={Images.icLocation}
        text={data?.address?.zipcode}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.heightRatio(20),
    backgroundColor: 'white',
    flex: 1,
  },
  containerRow: {
    flexDirection: 'row',
    padding: Metrics.heightRatio(18),
    borderBottomColor: 'rgb(112, 112, 112)',
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
  },
  txtRowTitle: {
    paddingHorizontal: Metrics.baseMargin,
    ...AppStyles.gbRe(17, 'rgb(69, 79, 99)'),
  },
  imgMargins: {
    marginVertical: Metrics.heightRatio(30),
  },
  txtRowText: {
    paddingHorizontal: Metrics.baseMargin,
    ...AppStyles.gbRe(14, 'rgb(69, 79, 99)'),
  },
  btnCont: {
    marginHorizontal: Metrics.heightRatio(15),
  },
  mh20: {
    marginHorizontal: Metrics.heightRatio(20),
  },
  mt10: {
    marginTop: Metrics.heightRatio(5),
  },
  imgStyle: {
    ...AppStyles.roundImage(130),
    marginVertical: Metrics.doubleBaseMargin,
    borderColor: Colors.GREY,
  },
  font: {
    ...AppStyles.gbRe(14, 'rgb(69, 79, 99)'),
  },
  rowIconStyle: {
    width: Metrics.heightRatio(16),
    height: Metrics.heightRatio(16),
    resizeMode: 'contain',
  },
  flex: {flex: 1, flexDirection: 'row', backgroundColor: 'white'},
});
