import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const KeyboardAvoidAndDismissView = ({ viewStyle, children, avoidKeyboard, behavior }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={viewStyle} enabled={avoidKeyboard} behavior={behavior}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

KeyboardAvoidAndDismissView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
  avoidKeyboard: PropTypes.bool,
  behavior: PropTypes.oneOf(['height', 'position', 'padding', '']),
  viewStyle: ViewPropTypes.style
};

KeyboardAvoidAndDismissView.defaultProps = {
  avoidKeyboard: true,
  behavior: 'padding'
};

export default React.memo(KeyboardAvoidAndDismissView);
