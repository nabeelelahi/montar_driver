import React, { useState, forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import utility from "../../utility";


const DateTimePickerHandler = forwardRef((props, ref) => {

    const [isDatePickerVisible, setVisiblity] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            showHideDatePicker() {
                setDatePickerVisibility(true);
            }
        })
    );
    function setDatePickerVisibility(isDatePickerVisible = false) {
        setVisiblity(isDatePickerVisible);
    }

    const handleConfirm = date => {
        setDatePickerVisibility(false);
        const { cbOnPressDateTimePicker } = props;
        // cbOnPressDateTimePicker(utility.timeFromNow(date));
        cbOnPressDateTimePicker(utility.date(date));
    };

    const { minimumDate, maximumDate, date } = props;

    return (
        <DateTimePickerModal
            date={utility.isEmpty(date) ? new Date() : new Date(date)}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility()}
            is24Hour={false}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
        />
    );

});

export default DateTimePickerHandler;