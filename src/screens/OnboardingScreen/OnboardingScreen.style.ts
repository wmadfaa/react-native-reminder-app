import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface IntroScreenStyles {
  container: ViewStyle;
  title: TextStyle;
  headerItem: ViewStyle;
}

export default StyleSheet.create<IntroScreenStyles>({
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
  headerItem: {
    paddingHorizontal: 16,
  },
});
