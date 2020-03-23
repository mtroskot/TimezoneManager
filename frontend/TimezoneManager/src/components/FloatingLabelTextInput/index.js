import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, TextInput, View } from 'react-native';
import styles from 'src/components/FloatingLabelTextInput/styles';
import StringUtils from 'src/utils/StringUtils';
import { dimensions } from 'src/styles';
import HooksUtils from 'src/utils/HooksUtils';

const { rem } = dimensions;

const FloatingLabelTextInput = ({
  onSubmitEditing,
  textInputRef,
  floatingLabel,
  value,
  textInputStyle,
  customContainerStyle,
  ...restProps
}) => {
  const [floatAnim] = useState(new Animated.Value(0));
  const [focused, setFocused] = useState(false);

  HooksUtils.useDidUpdate(() => {
    if (StringUtils.isEmpty(value)) {
      Animated.timing(floatAnim, {
        toValue: focused ? -25 * rem : 0 * rem,
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
    <View style={[styles.container, customContainerStyle]}>
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
    </View>
  );
};

FloatingLabelTextInput.propTypes = {
  onSubmitEditing: PropTypes.func,
  textInputRef: PropTypes.shape({ current: PropTypes.any }),
  floatingLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  textInputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default React.memo(FloatingLabelTextInput);
