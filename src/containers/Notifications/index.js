import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {Block, Text} from '@components';
import {FlatListHandler} from '@reuseableComponents';
import {Metrics, Colors} from '@theme';

const arr = [
  {
    id: 1,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
    name: 'Duran Clayton',
    dec: 'I am waiting',
  },
  {
    id: 2,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?size=626&ext=jpg',
    name: 'Duran Clayton',
    dec: 'Great I am coming that way',
  },
];

const Notifications = () => {
  const renderItem = ({item, index}) => {
    return (
      <Block
        row
        style={{
          alignItems: 'center',
          backgroundColor: Colors.WHITE,
          paddingHorizontal: Metrics.smallMargin,
          paddingVertical: Metrics.baseMargin,
          marginBottom: Metrics.smallMargin,
          borderRadius: 10,
        }}>
        <Image
          source={{uri: item.img}}
          style={{
            width: Metrics.heightRatio(40),
            height: Metrics.heightRatio(40),
            borderRadius: Metrics.heightRatio(40) / 2,
          }}
        />
        <Block flex style={{marginLeft: Metrics.baseMargin}}>
          <Text>
            <Text bold>{item.name}</Text>
            {' messaged you'}
          </Text>
          <Text color={Colors.BACKGROUND}>{item.dec}</Text>
        </Block>
        <Text color={Colors.BACKGROUND}>{'1m ago'}</Text>
      </Block>
    );
  };

  return (
    <Block
      flex
      style={{
        paddingHorizontal: Metrics.baseMargin,
        paddingTop: Metrics.baseMargin,
      }}>
      <FlatListHandler data={arr} renderItem={renderItem} />
    </Block>
  );
};

export default Notifications;
