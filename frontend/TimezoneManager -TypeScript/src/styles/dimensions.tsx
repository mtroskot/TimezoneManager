import { Dimensions } from 'react-native';

const { width, height }: { width: number; height: number } = Dimensions.get('window');
const ratio: number = 380;
const rem: number = width / ratio;

export default {
  width,
  height,
  rem
};
