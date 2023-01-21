import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const Metrics = {
  width: width < height ? width : height,
  height: width < height ? height : width,
};

export default Metrics;
