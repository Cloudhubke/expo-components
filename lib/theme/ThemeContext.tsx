import React from 'react';
import colors from './Colors';
import sizes from './Sizes';
import fonts from './Fonts';

export default React.createContext<{
  colors: typeof colors;
  sizes: typeof sizes;
  fonts: typeof fonts;
  CONFIG: any;
}>({} as any);
