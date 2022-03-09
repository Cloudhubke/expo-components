import React from 'react';

import setDefaultThemeStyle from '../native-base/init';

import ThemeContext from './ThemeContext';

import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';

setDefaultThemeStyle();

const ThemeProvider = ({ children, fonts, colors, sizes, ...props }) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  return (
    <ThemeContext.Provider
      value={{
        fonts: newfonts,
        colors: newcolors,
        sizes: newsizes,
        CONFIG: props.CONFIG || {},
        ...props,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
