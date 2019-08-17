import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface AuthenticationLoadingScreenStyles {
  container: ViewStyle;
  title: TextStyle;
}

export default StyleSheet.create<AuthenticationLoadingScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
