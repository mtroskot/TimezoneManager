import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import TimezoneForm from 'src/screens/AddNewTimezone/TimezoneForm';
import { gmtDifferenceOptions } from 'src/constants/date';
import styles from 'src/screens/AddNewTimezone/styles';
import StringUtils from 'src/utils/StringUtils';

const initialTimezoneState = {
  name: {
    value: null,
    error: false
  },
  cityName: {
    value: null,
    error: false
  },
  differenceToGMT: '0'
};
const AddNewTimezone = () => {
  const [timezoneForm, setTimezoneForm] = useState(initialTimezoneState);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdown, setDropdown] = useState({
    showDropdown: false,
    initialScrollIndex: gmtDifferenceOptions.indexOf('0')
  });

  function handleInput(value, fieldName) {
    setTimezoneForm({ ...timezoneForm, [fieldName]: { ...timezoneForm[fieldName], value } });
  }

  function onGmtDifferenceSelect(value) {
    setTimezoneForm({ ...timezoneForm, differenceToGMT: value });
    setDropdown({ initialScrollIndex: gmtDifferenceOptions.indexOf(value), showDropdown: !dropdown.showDropdown });
  }

  function toggleDropdown() {
    Keyboard.dismiss();
    setDropdown({ ...dropdown, showDropdown: !dropdown.showDropdown });
  }

  function handleSubmit() {
    const { name, cityName } = timezoneForm;
    const isNameEmpty = StringUtils.isEmpty(name.value);
    const isCityNameEmpty = StringUtils.isEmpty(cityName.value);

    if (isNameEmpty || isCityNameEmpty) {
      setTimezoneForm({
        ...timezoneForm,
        name: { ...timezoneForm.name, error: isNameEmpty },
        cityName: { ...timezoneForm.cityName, error: isCityNameEmpty }
      });
      return;
    } else {
      setTimezoneForm({
        ...timezoneForm,
        name: { ...timezoneForm.name, error: false },
        cityName: { ...timezoneForm.cityName, error: false }
      });
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  return (
    <View style={styles.container}>
      <TimezoneForm
        {...{
          timezoneForm,
          handleInput,
          handleSubmit,
          isLoading,
          gmtDifferenceOptions,
          onGmtDifferenceSelect,
          toggleDropdown,
          dropdown
        }}
      />
    </View>
  );
};

AddNewTimezone.propTypes = {};

export default React.memo(AddNewTimezone);
