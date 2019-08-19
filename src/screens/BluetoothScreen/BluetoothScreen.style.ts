import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BluetoothScreenStyles {
  container: ViewStyle;
  textStyle: TextStyle;
  logTextStyle: TextStyle;
}

export default StyleSheet.create<BluetoothScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  logTextStyle: {
    fontSize: 9,
  },
});
