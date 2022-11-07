import React, { useState } from 'react';
import Block from './Block';
import Text from './Text';

const IconLabel = ({ icon, label, children, color }) => (
  <Block flex={false} row middle>
    {icon && <Block flex={false}>{icon}</Block>}
    <Block flex={false}>
      {children || (
        <Text h4 cropped style={{ color }}>
          {label}
        </Text>
      )}
    </Block>
  </Block>
);

IconLabel.defaultProps = {
  size: 14,
};
export default IconLabel;
