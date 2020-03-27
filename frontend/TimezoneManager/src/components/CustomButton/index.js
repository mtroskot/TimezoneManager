import React, { useState } from 'react';
import { Animated, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import Loader from 'src/components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import AppUtils from 'src/utils/AppUtils';
import HooksUtils from 'src/utils/HooksUtils';
import { dimensions } from 'src/styles';
import PropTypes from 'prop-types';
import styles from 'src/components/CustomButton/styles';
const { rem } = dimensions;

const CustomButton = props => {
  const [shakeAnimation] = useState(new Animated.Value(0));
  const {
    iconProps,
    tOpacityStyle,
    viewStyle,
    textStyle,
    iconStyle,
    text,
    onPress,
    animationProps,
    disabled,
    isLoading
  } = props;

  const buttonText = text ? <Text style={[styles.text, textStyle]}>{text}</Text> : null;

  HooksUtils.useDidMountUnmount(
    () => {
      if (animationProps) {
        AppUtils.startShake(shakeAnimation);
        if (animationProps.duration) {
          setTimeout(() => {
            shakeAnimation.setValue(0);
          }, animationProps.duration);
        }
      }
    },
    () => {
      if (animationProps) {
        shakeAnimation.setValue(0);
      }
    }
  );
  HooksUtils.useDidUpdate(() => {
    if (animationProps?.animateIcon === true) {
      AppUtils.startShake(shakeAnimation);
    } else {
      shakeAnimation.setValue(0);
    }
  }, [animationProps?.animateIcon]);

  if (isLoading) {
    return <Loader viewStyle={[tOpacityStyle, { backgroundColor: 'transparent' }]} />;
  }

  const buttonIcon = iconProps ? (
    <Animated.View
      style={[
        iconStyle,
        animationProps
          ? {
              transform: [
                animationProps.direction === 'horizontal'
                  ? { translateX: shakeAnimation }
                  : { translateY: shakeAnimation }
              ]
            }
          : null
      ]}>
      <Icon
        name={AppUtils.getIconForPlatform(iconProps.name, iconProps.prefix)}
        size={iconProps.size || 30 * rem}
        color={iconProps.color || '#fff'}
      />
    </Animated.View>
  ) : null;

  let iconTextOrder = (
    <View style={viewStyle}>
      {iconProps && iconProps.rightSide ? (
        <>
          {buttonText}
          {buttonIcon}
        </>
      ) : (
        <>
          {buttonIcon}
          {buttonText}
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity style={tOpacityStyle} onPress={onPress} disabled={disabled}>
      {iconTextOrder}
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  iconOrText: function(props, propName, componentName) {
    if (!props.iconProps?.name && !props.text) {
      return new Error(`Icon or text is required in ${componentName}`);
    }
  },
  onPress: PropTypes.func,
  iconProps: PropTypes.exact({
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    rightSide: PropTypes.bool,
    color: PropTypes.string,
    prefix: PropTypes.string
  }),
  text: PropTypes.string,
  tOpacityStyle: ViewPropTypes.style,
  viewStyle: ViewPropTypes.style,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: ViewPropTypes.style,
  animationProps: PropTypes.shape({
    animateIcon: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    duration: PropTypes.number
  }),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default React.memo(CustomButton);
