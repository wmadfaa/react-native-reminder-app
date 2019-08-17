import { StyleSheet, TextStyle } from 'react-native';

interface LoginFormStyles {
  input: TextStyle;
}

export default StyleSheet.create<LoginFormStyles>({
  input: {
    height: 50,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: 'rgba(0,0,0,0.8)',
  },
});
