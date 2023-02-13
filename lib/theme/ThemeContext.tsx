import React from 'react';
import colors from './Colors';
import sizes from './Sizes';
import fonts from './Fonts';
import Images from './Images';
import Sounds from './Sounds';

export default React.createContext<{
  colors: typeof colors;
  sizes: typeof sizes;
  fonts: typeof fonts;
  Images?: typeof Images;
  Sounds?: typeof Sounds;
  CONFIG?: any;
  getConfig?: () => any;
}>({} as any);
