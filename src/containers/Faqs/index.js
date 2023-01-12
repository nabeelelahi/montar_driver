import React from 'react';

import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Block, Text} from '@components';

import {Colors, Metrics} from '@theme';

export default params => {
  return (
    <ScrollView>
      <Block flex style={styles.container}>
        <Text samiBold style={styles.txtTitle}>
          Duis vestibulum elit vel neque pharetra vulputate. Quisque scelerisque
          nisi urna. ?
        </Text>
        <Text style={styles.txtDesc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text samiBold style={styles.txtTitle}>
          Duis vestibulum elit vel neque pharetra vulputate. Quisque scelerisque
          nisi urna. ?
        </Text>
        <Text style={styles.txtDesc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
        <Text samiBold style={styles.txtTitle}>
          Duis vestibulum elit vel neque pharetra vulputate. Quisque scelerisque
          nisi urna. ?
        </Text>
        <Text style={styles.txtDesc}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </Block>
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: Colors.WHITE,
    padding: Metrics.baseMargin,
  },
  txtTitle: {
    marginTop: Metrics.baseMargin,
  },
  txtDesc: {
    marginTop: Metrics.baseMargin,
    lineHeight: 19,
  },
};
