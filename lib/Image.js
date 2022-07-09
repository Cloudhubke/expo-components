import React from 'react';
import FastImage from 'react-native-fast-image';

export default ({ size = 48, src, style, ...props }) => {
  const localStyles = !style ? { height: size, width: size } : {};
  return (
    <FastImage
      style={{ ...localStyles, resizeMode: 'contain', ...style }}
      source={src}
      {...props}
    />
  );
};
