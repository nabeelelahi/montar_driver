//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:27:23 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import ButtonView from '../ButtonView';
import PropTypes from 'prop-types';
// import {Appearance} from 'react-native-appearance';
import _ from 'lodash';
import moment from 'moment';
import FocusTextField from '../FocusTextField';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Metrics, Colors} from '../../theme';

export default class DateTime extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: new Date(),
    selectedDate: '',
    selectedTime: '',
  };

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };
  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  //   onMode = () => {
  //     const isMode = Appearance.getColorScheme();
  //     if (isMode === 'dark') {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  setFocus = () => this.showDateTimePicker();
  getValue = () => this.textInput.getValue();
  setError = () => {
    this.textInput.setError(true, this.props.error);
  };

  handleDatePicked = date => {
    if (this.props.mode === 'date') {
      this.setState({value: moment(date).format('YYYY-MM-DD')});
      this.textInput.setText(moment(date).format('YYYY-MM-DD'));
      this.hideDateTimePicker();
      this.props.cbOnDateSelected(date);
    } else {
      this.setState({value: moment(date).format('hh:mm A')});
      this.textInput.setText(moment(date).format('hh:mm a'));
      this.hideDateTimePicker();

      this.props.cbOnDateSelected(
        moment(date).add(4, 'hours').format('hh:mm A'),
      );
    }
  };

  render() {
    const {
      leftImage,
      rightImage,
      title = 'Click',
      mode,
      date,
      minDate,
      maxDate,
      line,
    } = this.props;
    return (
      <View style={line ? styles.textLine : styles.container}>
        {/* <Image source={leftImage} />
        <Text style={styles.text}>{title}</Text>
    <Image source={rightImage} />*/}
        <FocusTextField
          leftIcon={leftImage}
          rightIcon={rightImage}
          pointerEvents="none"
          MainViewPress={this.showDateTimePicker}
          activeTextColor={'black'}
          value={this.state.value}
          ref={ref => (this.textInput = ref)}
          editable={false}
          {...this.props}
        />

        <DateTimePickerModal
          date={date}
          mode={mode}
          //   isDarkModeEnabled={this.onMode()}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          titleIOS={mode === 'time' ? 'Pick a time' : 'Pick a date'}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  text: {
    flex: 1,
    marginLeft: Metrics.doubleBaseMargin,
  },
  textLine: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
});
