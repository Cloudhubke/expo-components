import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import ThemeContext from './ThemeContext';

import localsizes from './Sizes';
import localcolors from './Colors';
import localfonts from './Fonts';

const ThemeProvider = ({ children, fonts, colors, sizes, ...props }) => {
  const newfonts = { ...localfonts, ...fonts };
  const newcolors = { ...localcolors, ...colors };
  const newsizes = { ...localsizes, ...sizes };

  // Paper theme customization
  const paperTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      ...newcolors,
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
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
    </PaperProvider>
  );
};

export default ThemeProvider;
