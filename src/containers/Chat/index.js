import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import KeyboardManager from 'react-native-keyboard-manager';
import {Colors, Metrics, Images, Fonts} from '@theme';
import {ButtonView, ImageButton, ImageHandler} from '@reuseableComponents';
import utility from '../../utility';

function Chat(params) {
  const [messages, setMessages] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello',
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 1,
        text: 'Hello',
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ]);

    if (utility.isPlatformIOS()) {
      KeyboardManager.setEnable(false);
    }
  }, []);

  const renderMessageImage = ({currentMessage}) => {
    return (
      <ButtonView onPress={() => {}}>
        <ImageHandler source={''} style={styles.img} />
      </ButtonView>
    );
  };

  const Input = forwardRef((props, ref) => {
    const [val, setVal] = useState('');

    useImperativeHandle(ref, () => ({
      setText: txt => setVal(txt),
      getValue: () => val,
    }));

    return (
      <TextInput
        placeholder="Add comment …"
        style={{
          flex: 1,
          paddingBottom: utility.isPlatformAndroid()
            ? Metrics.widthRatio(10)
            : Metrics.widthRatio(4),
        }}
        multiline
        value={val}
        onChangeText={txt => setVal(txt)}
      />
    );
  });

  const renderInputToolbar = props => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputSecContainer}>
          <ImageButton source={Images.isAttach} onPress={() => {}} />
          {/* <ImageButton style={{marginLeft: 10}} source={Images.icSendEmoji} />*/}

          <Input ref={inputRef} />
          <ImageButton source={Images.icSend} onPress={() => {}} />
        </View>
      </View>
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = props => <Bubble {...props} {...styles.bubble} />;

  return (
    <View style={styles.container}>
      <GiftedChat
        minInputToolbarHeight={0}
        messagesContainerStyle={{
          marginHorizontal: Metrics.baseMargin,
          paddingBottom: utility.isPlatformAndroid()
            ? Metrics.widthRatio(65)
            : Metrics.widthRatio(48),
        }}
        renderAvatar={null}
        renderBubble={renderBubble}
        renderMessageImage={renderMessageImage}
        messages={messages}
        user={{
          _id: 1,
        }}
        renderInputToolbar={() => null}
        isKeyboardInternallyHandled={false}
      />
      {renderInputToolbar()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.INPUT,
  },
  bubble: {
    textStyle: {
      left: {
        ...Fonts.RegularFont(),
        color: Colors.WHITE,
      },
      right: {
        ...Fonts.RegularFont(),
        color: Colors.WHITE,
      },
    },
    wrapperStyle: {
      left: {
        backgroundColor: '#707070',
        borderBottomLeftRadius: 0,
        padding: Metrics.smallMargin / 2,
        borderTopLefttRadius: Metrics.baseMargin,
        marginTop: Metrics.smallMargin / 2,
      },
      right: {
        backgroundColor: '#454F63',
        borderBottomRightRadius: 0,
        borderTopRightRadius: Metrics.baseMargin,
        padding: Metrics.smallMargin / 2,
        marginTop: Metrics.smallMargin / 2,
      },
      bottomContainerStyle: {
        marginBottom: 50,
      },
    },
  },
  img: {width: 160, height: 160, margin: 4, borderRadius: 12},
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    height: Metrics.widthRatio(70),
  },
  inputSecContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Metrics.baseMargin,

    alignItems: 'center',
    marginHorizontal: Metrics.smallMargin,
  },
  inputField: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    height: Metrics.heightRatio(48),
  },
});
export default Chat;
