import React, { useState } from 'react';
import { Image } from 'react-native';

export default ({ size = 48, src, style, ...props }) => {
  return (
    <Image
      style={{ height: size, width: size, resizeMode: 'contain', ...style }}
      source={src}
      {...props}
    />
  );
};
