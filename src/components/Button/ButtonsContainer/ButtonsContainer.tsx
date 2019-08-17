import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

import styles from './ButtonsContainer.style';

interface ButtonsContainerProps extends ViewProps {
  isHorizontal?: boolean;
  isCenter?: boolean;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children, isHorizontal, isCenter }) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.buttonsContainer,
        isHorizontal && styles.HButtonsContainer,
        isCenter && styles.CButtonsContainer,
      ])}
    >
      {children}
    </View>
  );
};

export default ButtonsContainer;
