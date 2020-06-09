import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Animated, Text } from 'react-native';
import { HooksUtils, StringUtils } from 'src/utils';
import styles from 'src/components/PopupMessage/styles';
import { popupMessageSelector } from 'src/store/ui/uiSelectors';
import { StoreState } from 'src/store/rootReducer';
import { tPosition } from 'src/types/types';

let handler: NodeJS.Timeout | null = null;

interface Props {
  position?: tPosition;
  popupMessage: {
    message: string | null;
    position: tPosition;
  };
}

const PopupMessage: React.FC<Props> = (props) => {
  const [popupAnimation] = useState(new Animated.Value(0));
  const { popupMessage } = props;

  HooksUtils.useDidUpdate(
    () => {
      Animated.timing(popupAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }).start();
      handler = setTimeout(() => {
        Animated.timing(popupAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        }).start();
      }, 1500);
    },
    [popupMessage],
    () => {
      clearTimeout(handler!);
      // @ts-ignore
      Animated.timing(popupAnimation).stop();
    }
  );

  const { message, position } = popupMessage;
  if (StringUtils.isEmpty(message)) {
    return null;
  }
  const positionStyle = position === 'top' ? styles.topPosition : styles.bottomPosition;
  return (
    <Animated.View style={[styles.popupMessageView, positionStyle, { opacity: popupAnimation }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

PopupMessage.defaultProps = {
  position: 'top'
};
const mapStateToProps = (state: StoreState) => ({
  popupMessage: popupMessageSelector(state)
});
export default connect(mapStateToProps, null)(React.memo(PopupMessage));
