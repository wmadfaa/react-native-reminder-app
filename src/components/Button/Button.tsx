import React from 'react';
import { TouchableOpacityProps, TouchableOpacity, Text, StyleSheet } from 'react-native';

import styles from './Button.style';

interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  label?: Text | string;
  children?: Text | string;
  isPrimary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, label, isPrimary, ...props }) => {
  return (
    <TouchableOpacity style={StyleSheet.flatten([styles.button, isPrimary && styles.buttonPrimary])} {...props}>
      <Text style={StyleSheet.flatten([styles.buttonText, isPrimary && styles.buttonTextPrimary])}>
        {!children ? label : children}
      </Text>
    </TouchableOpacity>
  );
};

export { default as ButtonsContainer } from './ButtonsContainer/ButtonsContainer';

export default Button;
