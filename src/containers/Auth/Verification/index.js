import React, {useState, useContext, useEffect} from 'react';
import {Animated, Image, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Block, Text} from '../../../components';
import _ from 'lodash';
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import {
  AppButton,
  ButtonView,
  FlashMessage,
} from '../../../reuseableComponents';
import {LoginContext} from '../../../contexts';
import {AppStyles, Fonts, Metrics, DefaultTheme, Colors} from '../../../theme';
import {dispatchRequest} from '../../../reuseableFunctions';
import constant from '@constants';
import {DUMP} from '@actionTypes';
import {pop, push} from '@nav';
import {request} from '@serviceAction';
import {useDispatch} from 'react-redux';
const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const Verification = () => {
  let dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [counter, setCounter] = useState(0);
  const {setLogin} = useContext(LoginContext);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    startTime();
  }, []);

  const onSubmit = () => {
    if (!_.isEmpty(value)) {
      dispatch(
        request(
          DUMP,
          constant.verify,
          'POST',
          {code: value},
          true,
          cbSuccess,
          cbFailure,
        ),
      );
    } else {
      FlashMessage({message: 'Please enter the verification code'});
    }
  };
  function cbSuccess(res) {
    // setLogin();
    push('PersonalInfo', {slug: res.slug});
  }
  function cbFailure(error) {}

  function startTime() {
    let counter = 59;

    let oneSecInterval = setInterval(() => {
      counter--;

      setCounter(counter);

      if (counter == 0) {
        clearInterval(oneSecInterval);
      }
    }, 1000);
  }

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        // style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <Block flex style={styles.bg}>
      <Block flex style={{marginTop: Metrics.screenHeight / 4}}>
        <Block style={styles.textView}>
          <Text samiBold h4 center style={styles.textStyle}>
            Verification Code
          </Text>
          <Text
            small
            center
            color={
              Colors.GREY
            }>{`Enter the verification code we just sent you on \nyour phone number`}</Text>
        </Block>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <Block style={styles.btnMargin}>
          <AppButton
            title="VERIFY"
            style={styles.submitBtn}
            onPress={onSubmit}
          />
        </Block>

        <View
          style={{
            ...AppStyles.rowAligned,
            marginTop: Metrics.baseMargin,
            marginHorizontal: Metrics.heightRatio(30),
          }}>
          <ButtonView>
            <Text
              color={'green'}
              style={{
                textDecorationLine: 'underline',
              }}>
              Resend Code
            </Text>
          </ButtonView>
          <Text>{`00:${counter < 10 ? '0' + counter : counter}`}</Text>
        </View>
        <Block center style={styles.mv30}>
          <Text small color={Colors.GREY}>
            If you didn’t receive a code!
            <Text small samiBold color={Colors.BLUE} style={styles.forgotStyle}>
              {' '}
              {`Resend`}
            </Text>
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default Verification;
