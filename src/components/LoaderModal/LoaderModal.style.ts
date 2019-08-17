import { StyleSheet, ViewStyle } from 'react-native';

interface LoaderModalStyles {
  modalBackground: ViewStyle;
  activityIndicatorWrapper: ViewStyle;
}

export default StyleSheet.create<LoaderModalStyles>({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
