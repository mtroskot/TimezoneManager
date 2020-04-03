import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppUtils, HooksUtils, StringUtils } from 'src/utils';
import styles from 'src/components/FloatingLabelTextInput/styles';
import { dimensions } from 'src/styles';
import { errorPropTypes } from 'src/constants/propTypes';

const { rem } = dimensions;

function renderError(error, fieldName) {
  if (!error || !error.display) {
    return null;
  }
  const errorMessage = error.errorMessage || `${fieldName} is required`;
  return <Text style={styles.errorText}>{errorMessage}</Text>;
}

const FloatingLabelTextInput = ({
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
  const [floatAnim] = useState(new Animated.Value(0));
  const [focused, setFocused] = useState(false);
  const [focusOnMount, setFocusOnMount] = useState(false);

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

  const handleFocus = () => {
    setFocused(true);
    setFocusOnMount(false);
  };

  const handleBlur = () => {
    setFocused(false);
  };

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
      {renderError(error, floatingLabel || label)}
    </TouchableOpacity>
  );
};

FloatingLabelTextInput.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  floatingLabelOrLabel: function(props, propName, componentName) {
    const { floatingLabel, label } = props;
    if (!floatingLabel && !label) {
      return new Error(`FloatingLabel or Label is required in ${componentName}`);
    }
  },
  onTextBoxPress: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  textInputRef: PropTypes.shape({ current: PropTypes.any }),
  floatingLabel: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: errorPropTypes,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onIconPress: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string
  })
};

FloatingLabelTextInput.defaultProps = {
  testID: 'FloatingLabelTextInput'
};

export default React.memo(FloatingLabelTextInput);
