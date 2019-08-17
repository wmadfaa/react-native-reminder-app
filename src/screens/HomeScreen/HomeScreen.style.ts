import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface LoginScreenStyles {
  container: ViewStyle;
  title: TextStyle;
}

export default StyleSheet.create<LoginScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
