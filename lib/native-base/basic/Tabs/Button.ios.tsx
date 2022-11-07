import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

module.exports = Button;
// export default Button;
