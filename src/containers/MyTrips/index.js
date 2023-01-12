import React, {useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Scheduled from './Scheduled';
import History from './History';
import {Loader} from '@reuseableComponents';
import {Text} from '@components';

import {Metrics, Colors, AppStyles} from '@theme';

const routes = [
  {key: 'Scheduled', title: 'SCHEDULED'},
  {key: 'History', title: 'HISTORY'},
];

const renderScene = SceneMap({
  Scheduled: () => <Scheduled />,
  History: () => <History />,
});

export default params = ({route}) => {
  console.log('renderScene', route);

  const [state, setState] = useState({
    index: route?.params?.index ? route?.params?.index : 0,
    routes,
  });

  const renderLabel = ({route, focused}) => {
    return (
      <Text
        samiBold
        size={12}
        color={focused ? Colors.GREY : Colors.MUTED}
        style={styles.txtTab}>
        {route.title}
      </Text>
    );
  };

  const renderIndicator = props => {
    const {position} = props;
    const translateX = Animated.multiply(position, Metrics.screenWidth / 2);
    return (
      <Animated.View
        style={{
          transform: [{translateX}],
          ...styles.indicator,
        }}>
        <View style={styles.indicatorChild} />
      </Animated.View>
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.containerTabs}
      renderLabel={renderLabel}
      renderIndicator={renderIndicator}
    />
  );

  const onIndexChange = React.useCallback(index =>
    setState(s => ({...s, index})),
  );

  return (
    <View style={{flex: 1}}>
      <TabView
        lazy
        navigationState={state}
        tabBarPosition="top"
        renderLazyPlaceholder={renderLazyPlaceholder}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        initialLayout={styles.initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const renderLazyPlaceholder = () => <Loader style={styles.loader} />;

const styles = StyleSheet.create({
  initialLayout: {width: Metrics.screenWidth},
  indicator: {
    height: Metrics.widthRatio(2.5),
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    width: Metrics.screenWidth / 2,
  },
  containerTabs: {
    backgroundColor: 'white',
    marginTop: Metrics.smallMargin / 2,
    ...AppStyles.lightShadow,
  },
  txtTab: {marginTop: 8},
  loader: {flex: 1},
  indicatorChild: {
    backgroundColor: '#000',
    marginHorizontal: Metrics.doubleBaseMargin * 2,
    flex: 1,
  },
});
