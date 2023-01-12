import {Block} from '@components';
import {ButtonView} from '@reuseableComponents';
import {push, pop, navigate} from '@nav';
import {AppStyles, Colors, Images, Metrics} from '@theme';
import React, {useState} from 'react';
import {View, StyleSheet, Button, Image, Text, Switch} from 'react-native';

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const Row = ({title, onPress, img, secImg, isSwitch = false}) => (
    <ButtonView onPress={onPress} style={styles.containerRow}>
      <Image source={img} />
      <Text style={styles.txtRowTitle}>{title}</Text>
      {isSwitch ? (
        <Switch
          trackColor={{false: 'rgb(119,132,157)', true: 'rgb(95, 196, 31)'}}
          thumbColor={'#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          isSwitch={true}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
        />
      ) : (
        <Image source={secImg} />
      )}
    </ButtonView>
  );
  return (
    <Block style={styles.container}>
      <Row
        title="Change Password"
        img={Images.icPassword}
        onPress={() => navigate('ChangePassword')}
        secImg={Images.icRightIcon}
      />

      <Row
        title="Notification Settings"
        img={Images.icNoti}
        isSwitch
        onPress={() => {}}
      />
    </Block>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.heightRatio(10),
  },
  containerRow: {
    flexDirection: 'row',
    padding: Metrics.heightRatio(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  txtRowTitle: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
    ...AppStyles.gbRe(14, 'rgb(69, 79, 99)'),
  },
  flex: {flex: 1, flexDirection: 'row', backgroundColor: 'white'},
});
