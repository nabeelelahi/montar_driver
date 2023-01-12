import _ from 'lodash';
import React, {createContext, Component} from 'react';
import 'react-native-gesture-handler';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import RootNavigator from './navigator';
import {navigatorRef} from './services/NavigationService';
import singleton from './singleton';
import SplashScreen from 'react-native-splash-screen';
import HttpServiceManager from './services/HttpServiceManager';
import constant from './constants';
import FlashMessage from 'react-native-flash-message';
import Spinner from 'react-native-globalspinner';
import KeyboardManager from 'react-native-keyboard-manager';
import Reachability from 'react-native-reachability-popup';
import {LoginContext} from '@contexts';
import utility, {setIsEmailVerify} from './utility';
import {ReuseableModal} from '@reuseableComponents';
import {ModalPortal} from 'react-native-modals';

import {logout} from './actions/ServiceAction';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      isLogin: false,
      setLogin: this.setLogin,
      isReduxLoaded: false,
    };
  }
  setLogin = (isLogin = true) => this.setState({isLogin});

  _onLogout() {
    HttpServiceManager.getInstance().userToken = '';
    setTimeout(() => {
      this.setLogin({isLogin: false});
      store.dispatch(logout());
    }, 300);
  }
  componentDidMount() {
    // this._onLogout();
    if (utility.isPlatformIOS()) {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(false);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
    HttpServiceManager.initialize(constant.baseURL, {
      token: constant.applicationToken,
    });
    //set designedAtX verify it on Adobe XD Desgin file
    //Metrics.designedAtX = false;
  }

  onBeforeLift = () => {
    singleton.storeRef = store;
    const {userReducer} = store.getState();
    if (!_.isEmpty(userReducer.data)) {
      //set flag for account is not verified
      setIsEmailVerify(userReducer.data.is_mobile_verify);
      if (userReducer.data.is_mobile_verify) {
        this.setLogin(true);

        HttpServiceManager.getInstance().userToken = `Bearer ${utility.getCryptoJSToken(
          userReducer.data.api_token,
        )}`;
      } else {
        this.setLogin(false);

        HttpServiceManager.getInstance().userToken = '';
      }
    }

    this.setState({isReduxLoaded: true}, () => {
      SplashScreen.hide();
    });
  };

  render() {
    const {isReduxLoaded} = this.state;

    return (
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor={'#313131'} />

        <PersistGate onBeforeLift={this.onBeforeLift} persistor={persistor}>
          {isReduxLoaded ? (
            <LoginContext.Provider value={this.state}>
              <RootNavigator ref={navigatorRef} />
            </LoginContext.Provider>
          ) : (
            <View />
          )}
        </PersistGate>

        <FlashMessage position="top" />

        <Spinner color={'#00A0B6'} type="SkypeIndicator" />
        <ModalPortal />
        <ReuseableModal />
        <Reachability />
      </Provider>
    );
  }
}
