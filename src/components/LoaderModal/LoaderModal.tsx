import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

import styles from './LoaderModal.style';

interface LoaderModalProps {
  loading: boolean;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ loading }) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;
