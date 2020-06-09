import React from 'react';
import { Text } from 'react-native';
import { iValidationError } from 'src/types/interfaces';
import styles from 'src/components/FloatingLabelTextInput/styles';

interface Props {
  error: iValidationError | undefined;
  fieldName: string;
}

const TextInputFieldError: React.FC<Props> = ({ error, fieldName }) => {
  if (!error || !error.display) {
    return null;
  }
  const errorMessage = error.errorMessage || `${fieldName} is required`;
  return <Text style={styles.errorText}>{errorMessage}</Text>;
};

export default React.memo(TextInputFieldError);
