import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusBarHeight = Constants.statusBarHeight;

export default {
  window: {
    width,
    height,
    statusBarHeight,
  },
  isSmallDevice: width < 375,
};
