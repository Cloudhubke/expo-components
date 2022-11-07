import React, { Component } from 'react';
import PropTypes from 'prop-types';
import color from 'color';
import withTheme from '../../../Theme/withTheme';

import ButtonBase from '../ButtonBase/ButtonBase';

import { Hoverable } from '../../../Utils';

class OutlinedButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    color: PropTypes.string,
    textColor: PropTypes.string,
    rippleColor: PropTypes.string,
    theme: PropTypes.object,
    borderSize: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  state = {
    stateBackgroundColor: null,
  };

  getButtonStyles() {
    const { theme, textColor, disabled, borderSize } = this.props;

    const borderColor = textColor || theme.primary.main;

    const buttonStyles = [
      theme.outlinedButton,
      {
        backgroundColor: this.getBackgroundColor(),
        borderColor: disabled ? 'rgba(0, 0, 0, 0.26)' : borderColor,
        borderWidth: borderSize || theme.outlinedButton.borderWidth,
      },
    ];
    return buttonStyles;
  }

  getBackgroundColor = () => {
    const { color: userColor, disabled } = this.props;
    const { stateBackgroundColor } = this.state;

    let backgroundColor = userColor || 'transparent';

    backgroundColor = stateBackgroundColor || backgroundColor;

    return disabled ? 'transparent' : backgroundColor;
  };

  getRippleColor() {
    const { textColor, theme, rippleColor } = this.props;

    const implementedRippleColor = textColor || theme.primary.main;

    return rippleColor || implementedRippleColor;
  }

  getTextColor() {
    const { textColor, disabled, theme } = this.props;

    const implementedTextColor = textColor || theme.primary.main;

    return disabled ? 'rgba(0, 0, 0, 0.26)' : implementedTextColor;
  }

  handleHover(toggle) {
    const implementedColor = toggle
      ? color(this.getTextColor()).alpha(0.12).rgb().string()
      : null;

    this.setState({ stateBackgroundColor: implementedColor });
  }

  render() {
    const { containerStyle, ...props } = this.props;

    return (
      <Hoverable
        onHoverIn={() => this.handleHover(true)}
        onHoverOut={() => this.handleHover(false)}
        style={containerStyle}
      >
        {() => (
          <ButtonBase
            typeRippleColor={this.getRippleColor()}
            typeTextColor={this.getTextColor()}
            typeButtonStyles={this.getButtonStyles()}
            {...props}
          />
        )}
      </Hoverable>
    );
  }
}

export default withTheme(OutlinedButton);
