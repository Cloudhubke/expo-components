import React from 'react';
import RNMapView from 'react-native-maps';
import defaultcolors from '../theme/Colors';

const CustomPolyline = ({ coordinates, color }) => (
  // const [] = useState(0);
  <RNMapView.Polyline
    coordinates={coordinates}
    strokeWidth={4}
    geodesic
    strokeColor={color}
  />
);
CustomPolyline.defaultProps = {
  coordinates: [],
  colors: defaultcolors.dark,
};

export default CustomPolyline;
