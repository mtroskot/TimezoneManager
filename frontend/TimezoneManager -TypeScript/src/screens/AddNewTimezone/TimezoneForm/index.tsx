import React, { useRef } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomButton, Dropdown, FloatingLabelTextInput } from 'src/components';
import styles from 'src/screens/AddNewTimezone/TimezoneForm/styles';
import appStyles from 'src/styles/appStyles';
import { iValidationErrors } from 'src/types/interfaces';
import {eIcons} from "src/types/enums";

interface Props {
  errors: iValidationErrors;
  headerTitle: string;
  timezoneForm: {
    name?: string;
    cityName?: string;
    differenceToGMT: string;
  };
  handleInput: (value: string, fieldName: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
  gmtDifferenceOptions: readonly string[];
  onGmtDifferenceSelect: (item: string) => void;
  toggleDropdown: () => void;
  dropdown: {
    showDropdown: boolean;
    initialScrollIndex: number;
  };
  submitButtonText: string;
}

const TimezoneForm: React.FC<Props> = ({
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
  const textInputRef = useRef<TextInput>(null);
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
        onChangeText={(value: string) => handleInput(value, 'name')}
        onSubmitEditing={() => textInputRef?.current?.focus()}
      />
      <FloatingLabelTextInput
        textInputRef={textInputRef}
        value={cityName}
        error={errors.cityName}
        floatingLabel={'City Name'}
        placeholderTextColor="#949EA0"
        returnKeyType={'go'}
        onChangeText={(value: string) => handleInput(value, 'cityName')}
        onSubmitEditing={handleSubmit}
      />
      <View style={Platform.OS === 'ios' ? styles.gmtSelectForm : null}>
        <FloatingLabelTextInput
          label={'Difference to GMT time'}
          value={differenceToGMT}
          placeholderTextColor="#949EA0"
          editable={false}
          onTextBoxPress={toggleDropdown}
          iconProps={{
            name: !dropdown.showDropdown ? eIcons.DOWN_ARROW : eIcons.UP_ARROW,
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
          loaderStyle={StyleSheet.flatten([appStyles.submitButton, { backgroundColor: 'transparent' }])}
          text={submitButtonText}
          tOpacityStyle={appStyles.submitButton}
          textStyle={appStyles.buttonText}
        />
      </View>
    </View>
  );
};

export default React.memo(TimezoneForm);
