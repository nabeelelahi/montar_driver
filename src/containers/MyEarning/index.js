import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {FlatListHandler} from '@reuseableComponents';
import {Block, Text} from '@components';
import {Colors, Metrics} from '@theme';

arr = [
  {
    month: 'September',
    price: '$400.00',
  },
  {
    month: 'October',
    price: '$400.00',
  },
  {
    month: 'November',
    price: '$400.00',
  },
  {
    month: 'December',
    price: '$400.00',
  },
];

const index = () => {
  const earningColumn = (heading, desc) => {
    return (
      <Block>
        <Text grey>{heading}</Text>
        <Text body>{desc}</Text>
      </Block>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <Block
        row
        style={{
          marginHorizontal: Metrics.baseMargin,
          marginBottom: Metrics.baseMargin,
        }}>
        <Text samiBold body style={{flex: 1}}>
          {item.month}
        </Text>
        <Text samiBold body>
          {item.price}
        </Text>
      </Block>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <Block>
        <Block row style={{alignItems: 'center', padding: Metrics.baseMargin}}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            style={styles.imgStyles}
          />
          <Text samiBold p>
            Alexa Marston
          </Text>
        </Block>
        <Block card shadow style={styles.earningCard}>
          <Text grey>Total earning</Text>
          <Text h4 samiBold style={{marginTop: Metrics.smallMargin}}>
            $350.00
          </Text>
          <Block style={styles.desc} />
          <Block row style={{justifyContent: 'space-between'}}>
            {earningColumn('Total trips', '14')}
            {earningColumn('Online time', '15h 30min')}
            {earningColumn('Total distance', '90.75 km')}
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex style={styles.container}>
      <FlatListHandler
        data={arr}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />
    </Block>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.INPUT,
  },

  earningCard: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: Metrics.baseMargin,
    paddingTop: Metrics.xDoubleBaseMargin,

    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  imgStyles: {
    width: Metrics.heightRatio(50),
    height: Metrics.heightRatio(50),
    borderRadius: 50 / 2,
    marginRight: Metrics.baseMargin,
  },
  desc: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.NAVBAR,
    marginVertical: Metrics.smallMargin,
  },
});
