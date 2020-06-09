import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { KeyboardAvoidAndDismissView } from 'src/components';
import TimezoneForm from 'src/screens/AddNewTimezone/TimezoneForm';
import { ValidationUtils } from 'src/utils';
import { gmtDifferenceOptions } from '../../utils/DateUtils';
import styles from 'src/screens/AddNewTimezone/styles';
import { eScreenNames } from 'src/types/navigation';
import { checkIfLoadingSelector } from 'src/store/ui/uiSelectors';
import { addTimezoneEntry, updateTimezoneEntry } from 'src/store/timezone/timezoneActions';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/rootReducer';
import { TimezoneActionTypes } from 'src/types/store/actionTypes';
import { iDropdown, iSavedTimezoneEntry, iTimezoneEntry, iValidationErrors } from 'src/types/interfaces';
import { NavigationStackScreenProps } from 'react-navigation-stack';

const initialTimezoneState: iTimezoneEntry = Object.freeze({
  name: '',
  cityName: '',
  differenceToGMT: '0'
});

interface Props extends NavigationStackScreenProps {
  isLoading: boolean;
  addTimezoneEntry: typeof addTimezoneEntry;
  updateTimezoneEntry: typeof updateTimezoneEntry;
}

const AddNewTimezone: React.FC<Props> = (props) => {
  //STATE
  const { navigation, isLoading } = props;
  const isEdit: boolean = navigation.state.routeName === eScreenNames.TIMEZONE_EDIT;
  const timezoneEntryForEdit: iSavedTimezoneEntry = props.navigation.getParam('timezoneEntry');
  const [timezoneForm, setTimezoneForm] = useState<iTimezoneEntry | iSavedTimezoneEntry>(() => {
    return isEdit && timezoneEntryForEdit ? timezoneEntryForEdit : initialTimezoneState;
  });
  const [errors, setErrors] = useState<iValidationErrors>({});
  const [dropdown, setDropdown] = useState<iDropdown>({
    showDropdown: false,
    initialScrollIndex: gmtDifferenceOptions.indexOf(timezoneEntryForEdit?.differenceToGMT || '0')
  });

  //METHODS
  function handleInput(value: string, fieldName: string) {
    setTimezoneForm({ ...timezoneForm, [fieldName]: value });
  }

  function onGmtDifferenceSelect(value: string) {
    setTimezoneForm({ ...timezoneForm, differenceToGMT: value });
    setDropdown({ initialScrollIndex: gmtDifferenceOptions.indexOf(value), showDropdown: !dropdown.showDropdown });
  }

  function toggleDropdown() {
    Keyboard.dismiss();
    setDropdown({ ...dropdown, showDropdown: !dropdown.showDropdown });
  }

  function handleSubmit() {
    if (validateForm()) {
      isEdit ? props.updateTimezoneEntry(timezoneForm as iSavedTimezoneEntry) : props.addTimezoneEntry(timezoneForm);
    }
  }

  function onOutsideOfFormPress() {
    Keyboard.dismiss();
    setDropdown({ ...dropdown, showDropdown: false });
  }

  function validateForm() {
    const { name, cityName } = timezoneForm;
    const errorObject = {};
    const isNameValid = ValidationUtils.validate('name', errorObject, ValidationUtils.isValidName(name));
    const isCityNameValid = ValidationUtils.validate('cityName', errorObject, ValidationUtils.isValidName(cityName));
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

const mapStateToProps = (state: StoreState) => ({
  isLoading: checkIfLoadingSelector(state)([TimezoneActionTypes.ADD_NEW_TIMEZONE_ENTRY, TimezoneActionTypes.UPDATE_TIMEZONE_ENTRY])
});

const mapDispatchToProps = {
  addTimezoneEntry,
  updateTimezoneEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddNewTimezone));
