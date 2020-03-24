import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from 'src/components/FloatingLabelTextInput/styles';
import StringUtils from 'src/utils/StringUtils';
import { dimensions } from 'src/styles';
import HooksUtils from 'src/utils/HooksUtils';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppUtils } from 'src/utils';

const { rem } = dimensions;

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
  ...restProps
}) => {
  const [floatAnim] = useState(new Animated.Value(0));
  const [focused, setFocused] = useState(false);

  HooksUtils.useDidUpdate(() => {
    if (StringUtils.isEmpty(value)) {
      Animated.timing(floatAnim, {
        toValue: focused ? -25 * rem : 0,
        duration: 250,
        useNativeDriver: true
      }).start();
    }
  }, [focused]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <View style={[styles.outerContainer, customContainerStyle]}>
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
      {error && <Text style={styles.errorText}>{floatingLabel || label} is required</Text>}
    </View>
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
  onSubmitEditing: PropTypes.func,
  textInputRef: PropTypes.shape({ current: PropTypes.any }),
  floatingLabel: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onIconPress: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string
  })
};

export default React.memo(FloatingLabelTextInput);
