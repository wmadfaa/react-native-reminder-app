import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface SignUpScreenStyles {
  container: ViewStyle;
  title: TextStyle;
}

export default StyleSheet.create<SignUpScreenStyles>({
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
