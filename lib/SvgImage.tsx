import React from 'react';
import Block from './Block';

const SvgImage = ({
  svg: SVG,
  size = 100,
  ...props
}: {
  svg: any;
  size?: number;
  [key: string]: any;
}) => {
  return (
    <Block
      flex={false}
      style={{
        height: size,
        width: 200,
      }}
      padding
      center
      middle
      {...props}
    >
      <SVG height="100%" />
    </Block>
  );
};

export default SvgImage;
