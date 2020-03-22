import React from 'react';
import { Text, View } from 'react-native';

const Clock = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>Clock</Text>
    </View>
  );
};

export default React.memo(Clock);
