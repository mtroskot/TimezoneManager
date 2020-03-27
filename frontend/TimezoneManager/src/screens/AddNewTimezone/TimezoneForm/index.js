import React, { useRef } from 'react';
import { Platform, Text, View } from 'react-native';
import { CustomButton, Dropdown, FloatingLabelTextInput } from 'src/components';
import PropTypes from 'prop-types';
import styles from 'src/screens/AddNewTimezone/TimezoneForm/styles';
import appStyles from 'src/styles/appStyles';
import { icons } from 'src/constants/icons';
import { errorPropTypes } from 'src/constants/propTypes';

const TimezoneForm = ({
  headerTitle,
  timezoneForm,
  errors,
  handleInput,
  handleSubmit,
  isLoading,
  gmtDifferenceOptions,
  onGmtDifferenceSelect,
  dropdown,
  toggleDropdown,
  submitButtonText
}) => {
  const textInputRef = useRef(null);
  const { name, cityName, differenceToGMT } = timezoneForm;
  return (
    <View>
      <Text style={[appStyles.headerText, styles.headerMargin]}>{headerTitle}</Text>
      <FloatingLabelTextInput
        value={name}
        error={errors.name}
        floatingLabel={'Name'}
        placeholderTextColor="#949EA0"
        returnKeyType={'next'}
        onChangeText={value => handleInput(value, 'name')}
        onSubmitEditing={() => textInputRef.current.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef}
        value={cityName}
        error={errors.cityName}
        floatingLabel={'City Name'}
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={value => handleInput(value, 'cityName')}
        onSubmitEditing={handleSubmit}
      />
      <View style={Platform.OS === 'ios' ? styles.gmtSelectForm : null}>
        <FloatingLabelTextInput
          label={'Difference to GMT time'}
          value={differenceToGMT}
          placeholderTextColor="#949EA0"
          editable={false}
          iconProps={{
            name: !dropdown.showDropdown ? icons.DOWN_ARROW : icons.UP_ARROW,
            prefix: 'ios-',
            onIconPress: toggleDropdown,
            color: '#7d7d7d'
          }}
        />
        <View style={styles.dropdown}>
          <Dropdown
            {...{
              selectedOption: differenceToGMT,
              options: gmtDifferenceOptions,
              onSelect: onGmtDifferenceSelect,
              showDropdown: dropdown.showDropdown,
              initialScrollIndex: dropdown.initialScrollIndex
            }}
          />
        </View>
      </View>
      <View>
        <CustomButton
          onPress={handleSubmit}
          isLoading={isLoading}
          text={submitButtonText}
          tOpacityStyle={appStyles.submitButton}
          textStyle={appStyles.buttonText}
        />
      </View>
    </View>
  );
};

TimezoneForm.propTypes = {
  errors: PropTypes.objectOf(errorPropTypes).isRequired,
  headerTitle: PropTypes.string.isRequired,
  timezoneForm: PropTypes.shape({
    name: PropTypes.string,
    cityName: PropTypes.string,
    differenceToGMT: PropTypes.string
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  gmtDifferenceOptions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onGmtDifferenceSelect: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  dropdown: PropTypes.exact({
    showDropdown: PropTypes.bool.isRequired,
    initialScrollIndex: PropTypes.number.isRequired
  }),
  submitButtonText: PropTypes.string.isRequired
};

export default React.memo(TimezoneForm);
