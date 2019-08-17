import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface LoginScreenStyles {
  button: ViewStyle;
  buttonText: TextStyle;
  buttonPrimary: ViewStyle;
  buttonTextPrimary: TextStyle;
}

export default StyleSheet.create<LoginScreenStyles>({
  button: {
    backgroundColor: 'transparent',
    padding: 15,
    marginVertical: 5,
  },
  buttonText: {
    color: 'rgba(0,0,0,0.3)',
    textAlign: 'center',
    fontWeight: '700',
  },
  buttonPrimary: {
    backgroundColor: '#2980b6',
  },
  buttonTextPrimary: {
    color: '#fff',
  },
});
