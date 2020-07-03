import Constants from 'expo-constants';
import { moderateScale } from 'react-native-size-matters';

const sizes = {
  // global sizes
  base: moderateScale(10),
  font: moderateScale(12),
  border: moderateScale(12),
  padding: moderateScale(12),
  margin: moderateScale(12),

  // font sizes
  h1: moderateScale(24),
  h2: moderateScale(22),
  h3: moderateScale(20),
  h4: moderateScale(18),
  h5: moderateScale(16),
  h6: moderateScale(14),

  title: moderateScale(14),
  subTitle: moderateScale(12),

  header: moderateScale(16),
  subHeader: moderateScale(14),

  body: moderateScale(12),
  caption: moderateScale(10),
  small: moderateScale(9),
  tiny: moderateScale(8),
  button: moderateScale(14),

  marginHorizontal: moderateScale(10),
  marginVertical: moderateScale(10),
  section: moderateScale(25),
  baseMargin: moderateScale(10),
  doubleBaseMargin: moderateScale(20),
  smallMargin: moderateScale(5),
  doubleSection: moderateScale(50),
  horizontalLineHeight: moderateScale(1),
  navBarHeight: moderateScale(65),
  adminNavBarHeight: moderateScale(65),
  buttonRadius: moderateScale(4),
  icons: {
    tiny: moderateScale(12),
    small: moderateScale(20),
    medium: moderateScale(30),
    large: moderateScale(24),
    xl: moderateScale(48),
  },
  images: {
    small: moderateScale(20),
    medium: moderateScale(40),
    large: moderateScale(60),
    logo: moderateScale(200),
  },

  // InputSharp,

  inputHeight: moderateScale(36),
  inputMinWidth: moderateScale(120),
  statusBarHeight: Constants.statusBarHeight,
};

export default sizes;
