import React from 'react';
import { verticalScale, moderateScale } from 'react-native-size-matters';
import { Button as NBButton } from './native-base/basic/Button';
import ThemeContext from './theme/ThemeContext';

let height = 48;

const Button: React.FC<{
  [x: string]: any;
  children?: any;
  flat?: boolean;
  outlined?: boolean;
  contained?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  rounded?: boolean;
  padding?: number | number[];
  margin?: number | number[];
  color?: any;
  textColor?: any;
  style?: any;

  // colors

  primary?: boolean;
  darkPrimary?: boolean;
  darkerPrimary?: boolean;
  lightPrimary?: boolean;
  lighterPrimary?: boolean;

  secondary?: boolean;
  darkSecondary?: boolean;
  darkerSecondary?: boolean;
  lightSecondary?: boolean;
  lighterSecondary?: boolean;

  success?: boolean;
  darkSuccess?: boolean;
  darkerSuccess?: boolean;
  lightSuccess?: boolean;
  lighterSuccess?: boolean;

  info?: boolean;
  darkInfo?: boolean;
  darkerInfo?: boolean;
  lightInfo?: boolean;
  lighterInfo?: boolean;

  warning?: boolean;
  darkWarning?: boolean;
  darkerWarning?: boolean;
  lightWarning?: boolean;
  lighterWarning?: boolean;

  danger?: boolean;
  darkDanger?: boolean;
  darkerDanger?: boolean;
  lightDanger?: boolean;
  lighterDanger?: boolean;

  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  darkGray?: boolean;
  gray2?: boolean;
  dark?: boolean;
  mistyWhite?: boolean;
  milkyWhite?: boolean;
  error?: boolean;
  clear?: boolean;
  facebook?: boolean;
  transparent?: boolean;
  silver?: boolean;
  steel?: boolean;
  ricePaper?: boolean;
  frost?: boolean;
  cloud?: boolean;
  windowTint?: boolean;
  panther?: boolean;
  charcoal?: boolean;
  coal?: boolean;
  bloodOrange?: boolean;
  snow?: boolean;
  ember?: boolean;
  fire?: boolean;
  drawer?: boolean;
  eggplant?: boolean;
  twitterColor?: boolean;
  facebookColor?: boolean;
  googleColor?: boolean;
  linkedinColor?: boolean;
  pinterestColor?: boolean;
  youtubeColor?: boolean;
  tumblrColor?: boolean;
  behanceColor?: boolean;
  dribbbleColor?: boolean;
  redditColor?: boolean;
  instagramColor?: boolean;
  rose?: boolean;
}> = ({
  children,
  flat,
  outlined,
  contained,
  small,
  medium,
  large,
  rounded,
  padding,
  margin,
  color,
  textColor,
  style,

  // colors
  primary,
  darkPrimary,
  darkerPrimary,
  lightPrimary,
  lighterPrimary,

  secondary,
  darkSecondary,
  darkerSecondary,
  lightSecondary,
  lighterSecondary,

  success,
  darkSuccess,
  darkerSuccess,
  lightSuccess,
  lighterSuccess,

  info,
  darkInfo,
  darkerInfo,
  lightInfo,
  lighterInfo,

  warning,
  darkWarning,
  darkerWarning,
  lightWarning,
  lighterWarning,

  danger,
  darkDanger,
  darkerDanger,
  lightDanger,
  lighterDanger,

  tertiary,
  black,
  white,
  gray,
  gray2,
  darkGray,
  dark,
  mistyWhite,
  milkyWhite,
  error,
  clear,
  facebook,
  transparent,
  silver,
  steel,
  ricePaper,
  frost,
  cloud,
  windowTint,
  panther,
  charcoal,
  coal,
  bloodOrange,
  snow,
  ember,
  fire,
  drawer,
  eggplant,
  twitterColor,
  facebookColor,
  googleColor,
  linkedinColor,
  pinterestColor,
  youtubeColor,
  tumblrColor,
  behanceColor,
  dribbbleColor,
  redditColor,
  instagramColor,
  rose,

  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);

  const styles: any = {
    button: {
      borderRadius: 0,
      paddingVertical: 0,
      paddingHorizontal: moderateScale(sizes.padding),
      alignItems: 'center',
      height: verticalScale(sizes.inputHeight),
    },
  };

  const handleMargins = () => {
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
    return null;
  };

  const handlePaddings = () => {
    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
    return null;
  };

  const getHeight = (newHeight) => {
    height = newHeight;
    return verticalScale(height);
  };

  const buttonStyles = [
    styles.button,
    large && {
      height: getHeight(64),
      paddingHorizontal: moderateScale(sizes.padding),
    },
    medium && {
      height: getHeight(48),
      paddingHorizontal: moderateScale(sizes.padding),
    },
    small && {
      height: getHeight(32),
      paddingHorizontal: moderateScale(sizes.padding),
    },
    margin && { ...handleMargins() },
    padding && { ...handlePaddings() },
    color && { backgroundColor: color },
    textColor && { color: textColor },
    outlined && { backgroundColor: 'transparent', borderColor: color },
    rounded && { borderRadius: height / 2 },
    props.disabled && { opacity: 0.5 },

    primary && { backgroundColor: colors.primaryColors.main },
    darkPrimary && { backgroundColor: colors.primaryColors.dark },
    darkerPrimary && { backgroundColor: colors.primaryColors.darker },
    lightPrimary && { backgroundColor: colors.primaryColors.light },
    lighterPrimary && { backgroundColor: colors.primaryColors.lighter },

    secondary && { backgroundColor: colors.secondaryColors.main },
    darkSecondary && { backgroundColor: colors.secondaryColors.dark },
    darkerSecondary && { backgroundColor: colors.secondaryColors.darker },
    lightSecondary && { backgroundColor: colors.secondaryColors.light },
    lighterSecondary && { backgroundColor: colors.secondaryColors.lighter },

    success && { backgroundColor: colors.successColors.main },
    darkSuccess && { backgroundColor: colors.successColors.dark },
    darkerSuccess && { backgroundColor: colors.successColors.darker },
    lightSuccess && { backgroundColor: colors.successColors.light },
    lighterSuccess && { backgroundColor: colors.successColors.lighter },

    info && { backgroundColor: colors.infoColors.main },
    darkInfo && { backgroundColor: colors.infoColors.dark },
    darkerInfo && { backgroundColor: colors.infoColors.darker },
    lightInfo && { backgroundColor: colors.infoColors.light },
    lighterInfo && { backgroundColor: colors.infoColors.lighter },

    warning && { backgroundColor: colors.warningColors.main },
    darkWarning && { backgroundColor: colors.warningColors.dark },
    darkerWarning && { backgroundColor: colors.warningColors.darker },
    lightWarning && { backgroundColor: colors.warningColors.light },
    lighterWarning && { backgroundColor: colors.warningColors.lighter },

    danger && { backgroundColor: colors.dangerColors.main },
    darkDanger && { backgroundColor: colors.dangerColors.dark },
    darkerDanger && { backgroundColor: colors.dangerColors.darker },
    lightDanger && { backgroundColor: colors.dangerColors.light },
    lighterDanger && { backgroundColor: colors.dangerColors.lighter },

    tertiary && { backgroundColor: colors.tertiary },
    black && { backgroundColor: colors.black },
    white && { backgroundColor: colors.white },
    gray && { backgroundColor: colors.gray },
    darkGray && { backgroundColor: colors.darkGray },
    gray2 && { backgroundColor: colors.gray2 },
    dark && { backgroundColor: colors.dark },
    mistyWhite && { backgroundColor: colors.mistyWhite },
    milkyWhite && { backgroundColor: colors.milkyWhite },
    error && { backgroundColor: colors.error },
    clear && { backgroundColor: colors.clear },
    facebook && { backgroundColor: colors.facebook },
    transparent && { backgroundColor: colors.transparent },
    silver && { backgroundColor: colors.silver },
    steel && { backgroundColor: colors.steel },
    ricePaper && { backgroundColor: colors.ricePaper },
    frost && { backgroundColor: colors.frost },
    cloud && { backgroundColor: colors.cloud },
    windowTint && { backgroundColor: colors.windowTint },
    panther && { backgroundColor: colors.panther },
    charcoal && { backgroundColor: colors.charcoal },
    coal && { backgroundColor: colors.coal },
    bloodOrange && { backgroundColor: colors.bloodOrange },
    snow && { backgroundColor: colors.snow },
    ember && { backgroundColor: colors.ember },
    fire && { backgroundColor: colors.fire },
    drawer && { backgroundColor: colors.drawer },
    eggplant && { backgroundColor: colors.eggplant },
    twitterColor && { backgroundColor: colors.twitterColor },
    facebookColor && { backgroundColor: colors.facebookColor },
    googleColor && { backgroundColor: colors.googleColor },
    linkedinColor && { backgroundColor: colors.linkedinColor },
    pinterestColor && { backgroundColor: colors.pinterestColor },
    youtubeColor && { backgroundColor: colors.youtubeColor },
    tumblrColor && { backgroundColor: colors.tumblrColor },
    behanceColor && { backgroundColor: colors.behanceColor },
    dribbbleColor && { backgroundColor: colors.dribbbleColor },
    redditColor && { backgroundColor: colors.redditColor },
    instagramColor && { backgroundColor: colors.instagramColor },
    rose && { backgroundColor: colors.rose },

    style,
  ];

  return (
    <NBButton
      style={buttonStyles}
      bordered={outlined || props.bordered}
      {...props}
    >
      {children}
    </NBButton>
  );
};

Button.defaultProps = {};

export default Button;
