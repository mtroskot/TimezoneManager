import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ViewStyle } from 'react-native';

interface Props {
  onPress?: () => void;
  children: Element;
  avoidKeyboard?: boolean;
  behavior?: 'height' | 'position' | 'padding';
  viewStyle?: ViewStyle;
}

const KeyboardAvoidAndDismissView: React.FC<Props> = ({ viewStyle, children, avoidKeyboard, behavior, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress || Keyboard.dismiss}>
    <KeyboardAvoidingView style={viewStyle} enabled={avoidKeyboard} behavior={behavior}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

KeyboardAvoidAndDismissView.defaultProps = {
  avoidKeyboard: true,
  behavior: 'padding'
};

export default React.memo(KeyboardAvoidAndDismissView);
