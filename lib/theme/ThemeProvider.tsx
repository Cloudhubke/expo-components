import React from 'react';

import setDefaultThemeStyle from '../native-base/init';

import ThemeContext from './ThemeContext';

import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';
import localimages from './Images';
import localsounds from './Sounds';

setDefaultThemeStyle();

const ThemeProvider = ({
  children,
  fonts,
  colors,
  sizes,
  Images,
  Sounds,
  ...props
}: {
  children: React.ReactNode;
  fonts?: any;
  colors?: any;
  sizes?: any;
  Images?: any;
  Sounds?: any;
  CONFIG: {
    API_ENDPOINT: string;
  };
}) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };
  const newimages = { ...localimages, ...Images };
  const mewsounds = { ...localsounds, ...Sounds };

  return (
    <ThemeContext.Provider
      value={{
        fonts: newfonts,
        colors: newcolors,
        sizes: newsizes,
        Images: newimages,
        Sounds: mewsounds,
        ...props,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
