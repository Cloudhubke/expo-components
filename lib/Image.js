import React, { useState } from 'react';
import { Image } from 'react-native';

export default ({ size = 48, src, style, ...props }) => {
  const localStyles = !style ? { height: size, width: size } : {};
  return (
    <Image
      style={{ ...localStyles, resizeMode: 'contain', ...style }}
      source={src}
      {...props}
    />
  );
};
