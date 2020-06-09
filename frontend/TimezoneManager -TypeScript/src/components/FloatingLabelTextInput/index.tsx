import React, { useState } from 'react';
import { Animated, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppUtils, HooksUtils, StringUtils } from 'src/utils';
import styles from 'src/components/FloatingLabelTextInput/styles';
import { dimensions } from 'src/styles';
import { RequireAtLeastOne } from '../../types/types';
import TextInputFieldError from 'src/components/FloatingLabelTextInput/TextInputFieldError';
import { iValidationError } from '../../types/interfaces';

const { rem } = dimensions;

interface BaseProps {
  floatingLabel?: string;
  label?: string;
  onTextBoxPress?: () => void;
  onSubmitEditing?: () => void;
  textInputRef?: { current: any };
  value?: string;
  error?: iValidationError;
  textInputStyle?: TextStyle;
  customContainerStyle?: ViewStyle;
  iconProps?: {
    name: string;
    onIconPress?: () => void;
    size?: number;
    color?: string;
    prefix?: string;
  };
  testID?: string;
  [restProp: string]: any;
}

type Props = RequireAtLeastOne<BaseProps, 'label' | 'floatingLabel'>;

const FloatingLabelTextInput: React.FC<Props> = ({
  onSubmitEditing,
  textInputRef,
  floatingLabel,
  label,
  value,
  error,
  textInputStyle,
  customContainerStyle,
  iconProps,
  onTextBoxPress,
  ...restProps
}) => {
  //STATE
  const [floatAnim] = useState(new Animated.Value(0));
  const [focused, setFocused] = useState(false);
  const [focusOnMount, setFocusOnMount] = useState(false);

  //LIFECYCLE
  HooksUtils.useDidMountUnmount(() => {
    if (StringUtils.isNotEmpty(value)) {
      setFocusOnMount(true);
      setFocused(true);
    }
  });

  HooksUtils.useDidUpdate(() => {
    if (StringUtils.isEmpty(value) || focusOnMount) {
      Animated.timing(floatAnim, {
        toValue: focused ? -25 * rem : 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
  }, [focused]);

  //METHODS
  const handleFocus = (): void => {
    setFocused(true);
    setFocusOnMount(false);
  };

  const handleBlur = (): void => {
    setFocused(false);
  };

  //RENDER
  const fieldName: string = (floatingLabel || label) as string;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.outerContainer, customContainerStyle]}
      onPress={onTextBoxPress}
      disabled={!onTextBoxPress}>
      <View style={[styles.container, error ? styles.errorContainer : null]}>
        <View style={styles.inlineView}>
          <View style={styles.subContainer}>
            {floatingLabel && (
              <Animated.Text
                style={{
                  ...styles.label,
                  transform: [{ translateY: floatAnim }]
                }}>
                {floatingLabel}
              </Animated.Text>
            )}
            {label && <Text style={styles.fixedLabel}>{label}</Text>}
            <TextInput
              value={value}
              underlineColorAndroid="transparent"
              ref={textInputRef}
              onSubmitEditing={onSubmitEditing}
              style={[styles.defaultInput, textInputStyle]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...restProps}
            />
          </View>
          {iconProps && (
            <TouchableOpacity
              onPress={iconProps.onIconPress}
              disabled={!iconProps.onIconPress}
              style={styles.iconContainer}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Icon
                name={AppUtils.getIconForPlatform(iconProps.name, iconProps.prefix)}
                size={iconProps.size || 30 * rem}
                color={iconProps.color || '#fff'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TextInputFieldError {...{ error, fieldName }} />
    </TouchableOpacity>
  );
};

FloatingLabelTextInput.defaultProps = {
  testID: 'FloatingLabelTextInput'
};

export default React.memo(FloatingLabelTextInput);
