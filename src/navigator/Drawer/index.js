import React, {useContext} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {AppStyles, Metrics, Colors} from '@theme';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonView} from '@reuseableComponents';
import {push, navigate} from '@nav';
import utility from '@utils';
import HttpServiceManager from '../../services/HttpServiceManager';
import {store} from '../../store';
import {logout} from '../../actions/ServiceAction';
import {LoginContext} from '../../contexts';
import {useSelector} from 'react-redux';

const Separator = () => <View style={styles.separator} />;

const Profile = dump => {
  console.log('DUMP DATA', dump);
  return (
    <View style={styles.containerProfile}>
      <Image
        source={{
          uri: dump?.image_url?.url,
        }}
        style={styles.imgProfile}
      />
      <View style={styles.row}>
        <Text style={AppStyles.gbRe(14, Colors.WHITE)}>{dump?.name}</Text>
        <ButtonView onPress={() => navigate('Profile')}>
          <Text style={styles.txtEdit}>View or edit profile</Text>
        </ButtonView>
      </View>
    </View>
  );
};
const Drawer = props => {
  const {setLogin} = useContext(LoginContext);
  const {data} = useSelector(({userReducer}) => userReducer);
  function _onLogout() {
    HttpServiceManager.getInstance().userToken = '';
    setTimeout(() => {
      setLogin(false);
      store.dispatch(logout());
    }, 300);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#232446',
        paddingTop: utility.isPlatformAndroid() ? Metrics.xDoubleBaseMargin : 0,
      }}>
      <DrawerContentScrollView>
        {Profile(data)}
        <Separator />
        <DrawerItemList {...props} />
        <Separator />
        <ButtonView onPress={_onLogout}>
          <Text
            style={{
              ...AppStyles.gbRe(14, Colors.WHITE),
              marginLeft: Metrics.baseMargin,
            }}>
            Logout
          </Text>
          <Text
            style={{
              ...AppStyles.gbRe(14, 'rgba(255,255,225,0.7)'),
              marginTop: Metrics.smallMargin,
              marginLeft: Metrics.baseMargin,
            }}>
            {data?.email}
          </Text>
        </ButtonView>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  containerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.baseMargin,
  },
  separator: {
    height: Metrics.widthRatio(1),
    width: '87%',
    marginHorizontal: Metrics.baseMargin,
    backgroundColor: 'grey',
    marginVertical: Metrics.widthRatio(30),
  },
  imgProfile: {
    width: Metrics.widthRatio(60),
    height: Metrics.widthRatio(60),
    borderRadius: Metrics.widthRatio(30),
  },
  row: {marginLeft: Metrics.baseMargin},
  txtEdit: {
    ...AppStyles.gbRe(14, Colors.CLEAR_BLUE),
    marginTop: Metrics.smallMargin,
  },
});
