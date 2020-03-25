import React, { useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';
import TimezoneForm from 'src/screens/AddNewTimezone/TimezoneForm';
import { StringUtils } from 'src/utils';
import { NavigationService } from 'src/services';
import { gmtDifferenceOptions } from 'src/constants/date';
import styles from 'src/screens/AddNewTimezone/styles';
import { screenNames } from 'src/constants/navigation';

const initialTimezoneState = {
  id: null,
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

function mapPreviousAddedEntry(isEdit, timezoneEntryForEdit) {
  let mappedState = JSON.parse(JSON.stringify(initialTimezoneState));
  if (isEdit) {
    mappedState.id = timezoneEntryForEdit.id;
    mappedState.name.value = timezoneEntryForEdit.name;
    mappedState.cityName.value = timezoneEntryForEdit.city;
    mappedState.differenceToGMT = StringUtils.convertGMTDIffToString(timezoneEntryForEdit.differenceToGMT);
  }
  return mappedState;
}

const AddNewTimezone = props => {
  //STATE
  const isEdit = NavigationService.getCurrentScreenName() === screenNames.TIMEZONE_EDIT;
  const timezoneEntryForEdit = props.navigation.getParam('timezoneEntry');
  const timezoneInitialState = useMemo(() => mapPreviousAddedEntry(isEdit, timezoneEntryForEdit), [
    isEdit,
    timezoneEntryForEdit
  ]);
  const [timezoneForm, setTimezoneForm] = useState(timezoneInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdown, setDropdown] = useState({
    showDropdown: false,
    initialScrollIndex: gmtDifferenceOptions.indexOf('0')
  });

  //FUNCTIONS
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
  //RENDER
  const submitButtonText = isEdit ? 'Update entry' : 'Add entry';
  const headerTitle = isEdit ? 'Update Timezone entry' : 'Add new Timezone entry';
  return (
    <View style={styles.container}>
      <TimezoneForm
        {...{
          headerTitle,
          timezoneForm,
          handleInput,
          handleSubmit,
          isLoading,
          gmtDifferenceOptions,
          onGmtDifferenceSelect,
          toggleDropdown,
          dropdown,
          submitButtonText
        }}
      />
    </View>
  );
};

AddNewTimezone.propTypes = {};

export default React.memo(AddNewTimezone);
