import React, { useState } from 'react';
import { connect as reduxConnect } from 'react-redux';
import { Text, View, FlatList, Modal, SafeAreaView } from 'react-native';
import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';
import { Device } from 'react-native-ble-plx';

import { ApplicationState } from '../../store/index';
import * as BleActions from '../../store/bluetooth/bluetooth.actions';

import Button from '../../components/Button/Button';

import styles from './BluetoothScreen.style';
import { ConnectionState } from '../../store/bluetooth/bluetooth.types';
import { SensorTagTestMetadata, SensorTagTests } from '../../store/bluetooth/bluetooth.sagas';

interface BluetoothScreenNavigationParams {}

interface BluetoothScreenNavigationOptions {}

interface PropsFromStore {
  logs: string[];
  activeDevice?: Device;
  connectionState: ConnectionState;
  currentTest?: string;

  clearLogs: typeof BleActions.clearLogs;
  connect: typeof BleActions.connect;
  disconnect: typeof BleActions.disconnect;
  forgetSensorTag: typeof BleActions.forgetSensorTag;
  executeTest: typeof BleActions.executeTest;
}

interface BluetoothScreenProps extends PropsFromStore {}

const BluetoothScreen: NavigationScreenComponent<
  BluetoothScreenNavigationParams,
  BluetoothScreenNavigationOptions,
  BluetoothScreenProps
> = ({
  logs,
  activeDevice,
  connectionState,
  currentTest,
  clearLogs,
  connect,
  disconnect,
  forgetSensorTag,
  executeTest,
}) => {
  const [showModal, setShowModal] = useState(false);

  const sensorTagStatus = (): string => {
    switch (connectionState) {
      case ConnectionState.CONNECTING:
        return 'Connecting...';
      case ConnectionState.DISCOVERING:
        return 'Discovering...';
      case ConnectionState.CONNECTED:
        return 'Connected';
      case ConnectionState.DISCONNECTED:
      case ConnectionState.DISCONNECTING:
        if (activeDevice) {
          return 'Found ' + activeDevice.localName || activeDevice.id;
        }
    }

    return 'Searching...';
  };

  const isSensorTagReadyToConnect = (): boolean => {
    return activeDevice != null && connectionState === ConnectionState.DISCONNECTED;
  };

  const isSensorTagReadyToDisconnect = (): boolean => {
    return connectionState === ConnectionState.CONNECTED;
  };

  const isSensorTagReadyToExecuteTests = (): boolean => {
    return connectionState === ConnectionState.CONNECTED && currentTest == null;
  };

  const renderHeader = () => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={styles.textStyle} numberOfLines={1}>
          {console.log(sensorTagStatus())}
          SensorTag: {sensorTagStatus()}
        </Text>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Button
            disabled={!isSensorTagReadyToConnect()}
            onPress={() => {
              if (activeDevice != null) {
                connect(activeDevice);
              }
            }}
          >
            Connect
          </Button>
          <View style={{ width: 5 }} />
          <Button
            disabled={!isSensorTagReadyToDisconnect()}
            onPress={() => {
              disconnect();
            }}
          >
            Disconnect
          </Button>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Button disabled={!isSensorTagReadyToExecuteTests()} onPress={() => setShowModal(true)}>
            Execute test
          </Button>
          <View style={{ width: 5 }} />
          <Button
            disabled={activeDevice == null}
            onPress={() => {
              forgetSensorTag();
            }}
          >
            Forget
          </Button>
        </View>
      </View>
    );
  };

  const renderLogs = () => {
    return (
      <View style={{ flex: 1, padding: 10, paddingTop: 0 }}>
        <FlatList
          style={{ flex: 1 }}
          data={logs}
          renderItem={({ item }) => <Text style={styles.logTextStyle}> {item} </Text>}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          onPress={() => {
            clearLogs();
          }}
        >
          Clear logs
        </Button>
      </View>
    );
  };

  const renderModal = () => {
    const tests: SensorTagTestMetadata[] = activeDevice ? Object.values(SensorTagTests) : [];
    console.log('activeDevice', activeDevice);
    const root_style = {
        backgroundColor: '#00000060',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      container_style = {
        backgroundColor: '#F5FCFF',
        borderRadius: 10,
        height: '50%',
        padding: 5,
        shadowColor: 'black',
        shadowRadius: 20,
        shadowOpacity: 0.9,
        elevation: 20,
      },
      title_style = { paddingBottom: 10, alignSelf: 'center' };
    return (
      <Modal animationType="fade" transparent={true} visible={showModal} onRequestClose={() => {}}>
        <View style={root_style}>
          <View style={container_style}>
            <Text style={[styles.textStyle, title_style]}>Select test to execute:</Text>
            <FlatList
              data={tests}
              renderItem={({ item }) => (
                <Button
                  disabled={!isSensorTagReadyToExecuteTests()}
                  onPress={() => {
                    executeTest(item.id);
                    setShowModal(false);
                  }}
                >
                  {item.title}
                </Button>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderLogs()}
      {renderModal()}
    </SafeAreaView>
  );
};

BluetoothScreen.navigationOptions = (): NavigationStackScreenOptions => {
  return {};
};

export default reduxConnect(
  ({ bluetooth: state }: ApplicationState) => ({
    logs: state.logs,
    activeDevice: state.activeDevice,
    connectionState: state.connectionState,
    currentTest: state.currentTest,
  }),
  {
    clearLogs: BleActions.clearLogs,
    connect: BleActions.connect,
    disconnect: BleActions.disconnect,
    forgetSensorTag: BleActions.forgetSensorTag,
    executeTest: BleActions.executeTest,
  },
)(BluetoothScreen);
