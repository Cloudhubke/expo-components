import React, { CSSProperties } from 'react';

let FastImage = require('react-native').Image;

try {
  const Image = require('react-native-fast-image');
  if (Image) {
    FastImage = Image;
  }
} catch (e) {
  console.log('====================================');
  console.log('FastImage error ', e);
  console.log('====================================');
}

export default ({
  size = 48,
  src,
  style,
  ...props
}: {
  size?: number;
  src?: any;
  source?: any;
  style?: CSSProperties;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}) => {
  const localStyles = !style ? { height: size, width: size } : {};
  return (
    <FastImage
      style={{ ...localStyles, resizeMode: 'contain', ...style }}
      source={src}
      {...props}
    />
  );
};
