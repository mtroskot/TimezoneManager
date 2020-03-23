import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ratio = 380;
const rem = width / ratio;

export default {
  width,
  height,
  rem
};
