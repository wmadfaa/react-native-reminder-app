import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ForgetPasswordStyles {
  container: ViewStyle;
  title: TextStyle;
}

export default StyleSheet.create<ForgetPasswordStyles>({
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
