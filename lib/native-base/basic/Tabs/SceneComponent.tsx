import React from 'react';
import { View } from 'react-native';

const StaticContainer = require('./StaticContainer');

const SceneComponent = (Props) => {
  const { shouldUpdated, ...props } = Props;
  return (
    <View {...props}>
      <StaticContainer shouldUpdate={shouldUpdated}>
        {props.children}
      </StaticContainer>
    </View>
  );
};

module.exports = SceneComponent;
// export default SceneComponent;
