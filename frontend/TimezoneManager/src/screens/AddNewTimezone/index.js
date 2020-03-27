import React, { useMemo, useState } from 'react';
import { Keyboard } from 'react-native';
import TimezoneForm from 'src/screens/AddNewTimezone/TimezoneForm';
import { ValidationUtils } from 'src/utils';
import { gmtDifferenceOptions } from 'src/constants/date';
import styles from 'src/screens/AddNewTimezone/styles';
import { screenNames } from 'src/constants/navigation';
import PropTypes from 'prop-types';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { timezoneActionTypes } from 'src/constants/actionTypes';
import { addTimezoneEntry, updateTimezoneEntry } from 'src/store/timezone/timezoneActions';
import { connect } from 'react-redux';
import KeyboardAvoidAndDismissView from 'src/components/KeyboardAvoidAndDismissView';

const initialTimezoneState = Object.freeze({
  timezoneEntryId: null,
  name: '',
  cityName: '',
  differenceToGMT: '0'
});

function mapPreviousAddedEntry(isEdit, timezoneEntryForEdit) {
  let mappedState = { ...initialTimezoneState };
  if (isEdit) {
    mappedState.timezoneEntryId = timezoneEntryForEdit.timezoneEntryId;
    mappedState.name = timezoneEntryForEdit.name;
    mappedState.cityName = timezoneEntryForEdit.cityName;
    mappedState.differenceToGMT = timezoneEntryForEdit.differenceToGMT;
  }
  return mappedState;
}

const AddNewTimezone = props => {
  //STATE
  const { navigation, isLoading } = props;
  const isEdit = navigation.state.routeName === screenNames.TIMEZONE_EDIT;
  const timezoneEntryForEdit = props.navigation.getParam('timezoneEntry');
  const timezoneInitialState = useMemo(() => mapPreviousAddedEntry(isEdit, timezoneEntryForEdit), [
    isEdit,
    timezoneEntryForEdit
  ]);
  const [timezoneForm, setTimezoneForm] = useState(timezoneInitialState);
  const [errors, setErrors] = useState({});
  const [dropdown, setDropdown] = useState({
    showDropdown: false,
    initialScrollIndex: gmtDifferenceOptions.indexOf('0')
  });

  //METHODS
  function handleInput(value, fieldName) {
    setTimezoneForm({ ...timezoneForm, [fieldName]: value });
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
    if (validateForm()) {
      isEdit ? props.updateTimezoneEntry(timezoneForm) : props.addTimezoneEntry(timezoneForm);
    }
  }

  function onOutsideOfFormPress() {
    Keyboard.dismiss();
    setDropdown({ ...dropdown, showDropdown: false });
  }

  function validateForm() {
    const { name, cityName } = timezoneForm;
    const errorObject = {};
    const isNameValid = ValidationUtils.isValidField('name', name, errorObject);
    const isCityNameValid = ValidationUtils.isValidField('cityName', cityName, errorObject);
    setErrors(errorObject);
    return isNameValid && isCityNameValid;
  }

  //RENDER
  const submitButtonText = isEdit ? 'Update entry' : 'Add entry';
  const headerTitle = isEdit ? 'Update Timezone entry' : 'Add new Timezone entry';
  return (
    <KeyboardAvoidAndDismissView viewStyle={styles.container} onPress={onOutsideOfFormPress}>
      <TimezoneForm
        {...{
          headerTitle,
          timezoneForm,
          errors,
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
    </KeyboardAvoidAndDismissView>
  );
};

AddNewTimezone.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  addTimezoneEntry: PropTypes.func.isRequired,
  updateTimezoneEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: checkIfLoadingSelector(state)([
    timezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY,
    timezoneActionTypes.UPDATE_TIMEZONE_ENTRY
  ])
});

const mapDispatchToProps = {
  addTimezoneEntry,
  updateTimezoneEntry
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddNewTimezone));
