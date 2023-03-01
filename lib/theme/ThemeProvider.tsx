import React from 'react';

import setDefaultThemeStyle from '../native-base/init';

import ThemeContext from './ThemeContext';

import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';
import localimages from './Images';
import localsounds from './Sounds';
import Fonts from './Fonts';

setDefaultThemeStyle();

const ThemeProvider = ({
  children,
  fonts = localfonts,
  colors,
  sizes,
  Images,
  Sounds,
  ...props
}: {
  children: React.ReactNode;
  fonts?: (params: {
    sizes: typeof localsizes;
    colors: typeof localcolors;
  }) => ReturnType<typeof Fonts>;
  colors?: any;
  sizes?: any;
  Images?: any;
  Sounds?: any;
  CONFIG?: {
    API_ENDPOINT: string;
  };
  getConfig?: () => any;
}) => {
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  const newfonts = fonts({ sizes: newsizes, colors: newcolors });

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
