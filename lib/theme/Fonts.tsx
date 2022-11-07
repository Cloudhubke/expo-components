import colors from './Colors';
import sizes from './Sizes';

const Fonts = {
  h1: {
    fontSize: sizes.h1,
    lineHeight: sizes.h1 * 1.5,
  },
  h2: {
    fontSize: sizes.h2,
    lineHeight: sizes.h2 * 1.5,
  },
  h3: {
    fontSize: sizes.h3,
    lineHeight: sizes.h3 * 1.5,
  },
  h4: {
    fontSize: sizes.h4,
    lineHeight: sizes.h4 * 1.5,
  },
  h5: {
    fontSize: sizes.h5,
    lineHeight: sizes.h5 * 1.5,
  },
  h6: {
    fontSize: sizes.h6,
    lineHeight: sizes.h6 * 1.5,
  },

  header: {
    fontSize: sizes.header,
    lineHeight: sizes.header * 1.5,

    letterSpacing: 0.5,
    color: colors.black,
  },
  subHeader: {
    fontSize: sizes.subHeader,
    lineHeight: sizes.subHeader * 1.5,

    letterSpacing: 0.5,
    color: colors.black,
  },

  title: {
    fontSize: sizes.title,
    lineHeight: sizes.title * 1.5,

    letterSpacing: 0.5,
    color: colors.black,
  },

  subTitle: {
    fontSize: sizes.subTitle,
    lineHeight: sizes.subTitle * 1.5,

    letterSpacing: 0.5,
    color: colors.black,
  },

  semibold: {
    fontWeight: '100',
  },

  bold: {
    fontWeight: 'bold',
  },

  light: {
    fontWeight: '300',
  },

  normal: {},

  default: {
    fontSize: sizes.body,
    lineHeight: sizes.body * 1.5,

    color: colors.dark,
    fontWeight: '400',
  },

  body: {
    // lineHeig,
  },

  caption: {
    fontSize: sizes.caption,
    lineHeight: sizes.caption * 1.5,
  },
  small: {
    fontSize: sizes.small,
    lineHeight: sizes.small * 1.5,

    color: colors.darkGray,
  },
  button: {
    fontSize: sizes.button,
    color: colors.white,
  },
};

export default Fonts;
