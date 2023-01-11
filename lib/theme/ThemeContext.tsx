import React from 'react';
import colors from './Colors';
import sizes from './Sizes';

export default React.createContext<{
  colors: typeof colors;
  sizes: typeof sizes;
}>({} as any);
