import { StyleSheet, ViewStyle } from 'react-native';

interface LoginScreenStyles {
  buttonsContainer: ViewStyle;
  HButtonsContainer: ViewStyle;
  CButtonsContainer: ViewStyle;
}

export default StyleSheet.create<LoginScreenStyles>({
  buttonsContainer: {
    paddingHorizontal: 20,
  },
  HButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingHorizontal: 0,
  },
  CButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    paddingHorizontal: 0,
  },
});
