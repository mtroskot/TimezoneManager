import React, { useState } from 'react';
import { Animated, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Loader from 'src/components/Loader';
import Icon from 'react-native-vector-icons/Ionicons';
import AppUtils from 'src/utils/AppUtils';
import HooksUtils from 'src/utils/HooksUtils';
import { dimensions } from 'src/styles';
import styles from 'src/components/CustomButton/styles';
import { RequireAtLeastOne } from 'src/types/types';

const { rem } = dimensions;

interface BaseProps {
  iconProps?: {
    name: string;
    size?: number;
    rightSide?: boolean;
    color?: string;
    prefix?: string;
  };
  text?: string;
  onPress?: () => void;
  tOpacityStyle?: ViewStyle;
  loaderStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
  animationProps?: {
    animateIcon?: boolean;
    direction?: 'horizontal' | 'vertical';
    duration?: number;
  };
  disabled?: boolean;
  isLoading?: boolean;
  testID?: string;
}

export type Props = RequireAtLeastOne<BaseProps, 'text' | 'iconProps'>;

const CustomButton: React.FC<Props> = (props) => {
  const [shakeAnimation] = useState(new Animated.Value(0));
  const {
    iconProps,
    tOpacityStyle,
    viewStyle,
    loaderStyle,
    textStyle,
    iconStyle,
    text,
    onPress,
    animationProps,
    disabled,
    isLoading,
    testID
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
    return <Loader viewStyle={loaderStyle} />;
  }

  const buttonIcon = iconProps ? (
    <Animated.View
      style={[
        iconStyle,
        animationProps
          ? {
              transform: [animationProps.direction === 'horizontal' ? { translateX: shakeAnimation } : { translateY: shakeAnimation }]
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
    <TouchableOpacity
      style={tOpacityStyle}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
      {iconTextOrder}
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  testID: 'CustomButton'
};

export default React.memo(CustomButton);
