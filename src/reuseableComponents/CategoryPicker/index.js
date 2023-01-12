import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FocusTextField} from '../';
import ActionSheet from 'react-native-actionsheet';
import PropTypes from 'prop-types';

class CategoryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : '',
      options: props.options,
    };
  }
  static propTypes = {
    value: PropTypes.string,
  };
  componentDidMount() {
    if (this.state.value) {
      this.textInput.setText(`${this.state.value}`);
    }
  }
  setFocus = () => (this.props.isActiveEvent ? () => {} : this.onPress());
  getValue = () => {
    // console.log('this.textInput.getValue()', this.textInput.getValue());

    if (this.textInput.getValue().length) {
      // console.log('f', this.props.options)
      // const id = this.state.options[
      //   this.state.options.findIndex(
      //     item => item.name === this.textInput.getValue(),
      //   )
      // ].id;
      const {options, returnKey} = this.props;

      const index = options.findIndex(
        item => item.title === this.textInput.getValue(),
      );

      let returnValue = options ? options[index].slug : '';
      // let id = this.props.options ? this.props.options[index].id : '';

      if (returnKey && options[index][returnKey]) {
        returnValue = options ? options[index][returnKey] : '';
      }

      // Data.findIndex(item => item.name === 'John');
      global.log('returnValue', returnKey, options[index][returnKey]);
      return `${returnValue}`;
    }
    return this.textInput.getValue();
  };
  setError = () => {
    this.textInput.setError(true, this.props.error);
  };
  onPress = () => this.pickActionSheet.show();

  handleActionSheetPress = index => {
    // console.log('sdf', index);
    if (index !== this.props.options.length) {
      const {cbOnItemPicked} = this.props;
      cbOnItemPicked && cbOnItemPicked();
      this.props.cbPickedId && this.props.cbPickedId(this.props.options[index]);
      this.setState({value: this.props.options[index].title});
      this.textInput.onChangeText(this.props.options[index].title);
      this.textInput.setError(false);
    }
  };

  pickActionSheetRef = ref => (this.pickActionSheet = ref);
  render() {
    let {options, value} = this.state;
    const {isActiveEvent, disabled} = this.props;
    return (
      <TouchableOpacity disabled={disabled}>
        <FocusTextField
          {...this.props}
          MainViewPress={this.onPress}
          onRight={disabled ? () => {} : this.onPress}
          value={value}
          ref={ref => (this.textInput = ref)}
          editable={false}
          pointerEvents="none"
        />
        <ActionSheet
          visible={false}
          ref={this.pickActionSheetRef}
          title=""
          options={
            this.props.options.length
              ? [...this.props.options.map(item => item.title), 'Cancel']
              : []
          }
          cancelButtonIndex={this.props.options.length}
          // destructiveButtonIndex={this.props.options.length - 1}
          onPress={this.handleActionSheetPress}
        />
      </TouchableOpacity>
    );
  }
}

export default CategoryPicker;
