import React from 'react';
import {View, SafeAreaView, Image} from 'react-native';
import {EventBusSingleton} from 'light-event-bus';

import Modal from '../Modal';
import ButtonView from '../ButtonView';
import {Text, Block, Rating} from '@components';

import {Metrics, Colors, AppStyles, Images} from '../../theme';

// redux imports
import {useDispatch} from 'react-redux';
import {generalSaveAction} from '@serviceAction';
import {LOGOUT} from '@actionTypes';
import {FocusTextField, AppButton} from '@reuseableComponents';
import {request} from '@serviceAction';
// import apis from '@apis';
import {handleBadgeCount} from '../../reuseableFunctions';

const arr = [
  {id: 1, text: 'I don’t want ride any more', value: true},
  {id: 2, text: 'This ride is far away', value: false},
  {id: 3, text: 'The ride is not responding', value: false},
  {id: 4, text: 'I want to change location', value: false},
];

export default ({setLogin}) => {
  const dispatch = useDispatch();

  const vals = {
    initiateContract: {
      title: 'Sorry',
      desc: 'No nearby driver found Do you want to try again?',
      accept: 'YES',
      acceptColor: Colors.BLUE,
      cancelColor: '#707070',
    },
    ride: {
      title: 'Your Tip',
      desc: '',
      accept: 'SUBMIT',
      acceptColor: Colors.BLUE,
    },
    submit: {
      title: 'submit',
      desc: '',
      accept: 'SUBMIT',
      acceptColor: Colors.BLUE,
    },
  };

  const [state, setState] = React.useState({...vals['lead'], cbOnAccept: null});

  const modal = React.useRef();

  React.useEffect(() => {
    EventBusSingleton.subscribe('popup', ({val, onAccept, is401}) => {
      if (is401) logout();
      else {
        setState(s => ({...vals[val], cbOnAccept: onAccept}));
        setTimeout(() => modal.current.setModalVisibility(true), 300);
      }
    });
  }, []);

  const onCancel = () => modal.current.setModalVisibility(false);

  const onAcceptance = () => {
    state.cbOnAccept?.();
    if (state.title == 'Logout?') {
      setTimeout(requestLogout, 300);
    }
    modal.current.setModalVisibility(false);
  };

  //   requestLogout = () => {
  //     dispatch(
  //       request(
  //         apis.logout,
  //         apis.serviceTypes.POST,
  //         {},
  //         null,
  //         true,
  //         false,
  //         logout,
  //       ),
  //     );
  //   };

  const logout = () => {
    setLogin(false);
    dispatch(generalSaveAction(LOGOUT));
    handleBadgeCount({badge_count: 0});
  };

  return (
    <Modal ref={modal}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Block style={{alignItems: 'center'}}>
            {state.title == 'submit' && (
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                }}
                style={{
                  width: Metrics.heightRatio(60),
                  height: Metrics.heightRatio(60),
                  borderRadius: 60 / 2,
                  marginRight: Metrics.baseMargin,
                }}
              />
            )}

            {state.title == 'submit' && (
              <Text p style={styles.topmargin} color={Colors.BLACK}>
                {'Alexa Marston'}
              </Text>
            )}

            {state.title !== 'submit' && (
              <Text h1 style={styles.topmargin} color={Colors.BLACK}>
                {'$4.50'}
              </Text>
            )}

            <Text
              body
              style={[styles.topmargin, {marginBottom: Metrics.smallMargin}]}
              color={Colors.GREY}>
              {state.title == 'submit' ? 'You Got' : 'Your Tip'}
            </Text>
            {state.title == 'submit' && (
              <Rating
                SelectedImage={Images.icRatingSelect}
                UnSelectedImage={Images.icRatingUnSelect}
                value={4}
              />
            )}
          </Block>
          {state.title == 'submit' && (
            <FocusTextField
              label={'Please input your text here..'}
              error="Enter message"
              isHideFocus={true}
              identifier="description"
              maxLength={250}
              style={styles.inputTxtStyle}
              textInputStyle={styles.textInput}
              blurOnSubmit={false}
              multiline={true}
            />
          )}

          <AppButton
            title={state.title == 'submit' ? 'CONTINUE' : 'ADD TO YOUR ACCOUNT'}
            onPress={
              state.title == 'submit'
                ? () => state.cbOnAccept()
                : () => {
                    onCancel();
                    state.cbOnAccept();
                  }
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.7)',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: Metrics.baseMargin,
    // justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: Metrics.smallMargin,
    width: '90%',
    // alignItems: 'center',
    padding: Metrics.xDoubleBaseMargin,
  },
  inputTxtStyle: {
    height: Metrics.heightRatio(120),
    marginBottom: Metrics.baseMargin,
  },
  textInput: {
    textAlignVertical: 'top',
    height: Metrics.heightRatio(120),
  },
  topmargin: {
    marginTop: Metrics.smallMargin,
  },
};
