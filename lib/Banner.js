import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Surface, Button, withTheme, shadow } from 'react-native-paper';
import Block from './Block';

const ELEVATION = 1;
const DEFAULT_MAX_WIDTH = 960;

const Banner = ({
  visible,
  icon,
  children,
  actions,
  contentStyle,
  style,
  theme,
  ...rest
}) => {
  const { current: position } = React.useRef(
    new Animated.Value(visible ? 1 : 0)
  );
  const [layout, setLayout] = React.useState({
    height: 0,
    measured: false,
  });

  const { scale } = theme.animation;

  React.useEffect(() => {
    if (visible) {
      // show
      Animated.timing(position, {
        duration: 250 * scale,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    } else {
      // hide
      Animated.timing(position, {
        duration: 200 * scale,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, position, scale]);

  const handleLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;
    setLayout({ height, measured: true });
  };

  // The banner animation has 2 parts:
  // 1. Blank spacer element which animates its height to move the content
  // 2. Actual banner which animates its translateY
  // In initial render, we position everything normally and measure the height of the banner
  // Once we have the height, we apply the height to the spacer and switch the banner to position: absolute
  // We need this because we need to move the content below as if banner's height was being animated
  // However we can't animated banner's height directly as it'll also resize the content inside
  const height = Animated.multiply(position, layout.height);

  const translateY = Animated.multiply(
    Animated.add(position, -1),
    layout.height
  );
  return (
    <Surface {...rest} style={[styles.container, shadow(ELEVATION), style]}>
      <View style={[styles.wrapper, contentStyle]}>
        <Animated.View style={{ height }} />
        <Animated.View
          onLayout={handleLayout}
          style={[
            layout.measured || !visible
              ? // If we have measured banner's height or it's invisible,
                // Position it absolutely, the layout will be taken care of the spacer
                [styles.absolute, { transform: [{ translateY }] }]
              : // Otherwise position it normally
                null,
            !layout.measured && !visible
              ? // If we haven't measured banner's height yet and it's invisible,
                // hide it with opacity: 0 so user doesn't see it
                { opacity: 0 }
              : null,
          ]}
        >
          <Block>{children}</Block>
          <View style={styles.actions}>
            {actions.map(({ label, ...others }, i) => (
              <Button
                key={/* eslint-disable-line react/no-array-index-key */ i}
                compact
                mode="text"
                style={styles.button}
                {...others}
              >
                {label}
              </Button>
            ))}
          </View>
        </Animated.View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: ELEVATION,
  },
  wrapper: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
    maxWidth: DEFAULT_MAX_WIDTH,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    marginTop: 16,
    marginBottom: 0,
  },
  icon: {
    margin: 8,
  },
  message: {
    flex: 1,
    margin: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 4,
  },
  button: {
    margin: 4,
  },
});

export default withTheme(Banner);
