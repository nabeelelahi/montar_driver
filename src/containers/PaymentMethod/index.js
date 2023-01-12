import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Metrics, Colors} from '@theme';
import {Block} from '@components';
import {FocusTextField, AppButton} from '@reuseableComponents';

export default params => {
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewStyle}>
      <FocusTextField
        label={'Bank Name'}
        isHideFocus={true}
        inactiveColor={'#454F63'}
        error="Invalid email format"
        // type={INPUT_TYPES.EMAIL}
        // value={'john@yopmail.com'}
        autoCapitalize="none"
        identifier="email"
        maxLength={50}
        blurOnSubmit={false}
      />
      <FocusTextField
        label={'Account Number'}
        isHideFocus={true}
        inactiveColor={'#454F63'}
        error="Invalid email format"
        // type={INPUT_TYPES.EMAIL}
        // value={'john@yopmail.com'}
        autoCapitalize="none"
        identifier="email"
        maxLength={50}
        blurOnSubmit={false}
      />
      <FocusTextField
        label={'SSN Number'}
        isHideFocus={true}
        inactiveColor={'#454F63'}
        error="Invalid email format"
        // type={INPUT_TYPES.EMAIL}
        // value={'john@yopmail.com'}
        autoCapitalize="none"
        identifier="email"
        maxLength={50}
        blurOnSubmit={false}
      />
      <FocusTextField
        label={'Routing Number'}
        isHideFocus={true}
        inactiveColor={'#454F63'}
        error="Invalid email format"
        // type={INPUT_TYPES.EMAIL}
        // value={'john@yopmail.com'}
        autoCapitalize="none"
        identifier="email"
        maxLength={50}
        blurOnSubmit={false}
      />
      <Block style={{flex: 1, justifyContent: 'flex-end'}}>
        <AppButton title="Save" />
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    paddingVertical: Metrics.heightRatio(20),
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Metrics.baseMargin,
  },
});
