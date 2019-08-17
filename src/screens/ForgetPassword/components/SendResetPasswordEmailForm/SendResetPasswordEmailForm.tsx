import React from 'react';
import { View, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';

import TextInput from '../../../../components/TextInput/TextInput';

import styles from './SendResetPasswordEmailForm.style';

interface SendResetPasswordEmailFormFormProps {
  onChange(name: string, value: string): void;
  onSubmit(): void;
}

const SendResetPasswordEmailFormForm: React.FC<SendResetPasswordEmailFormFormProps> = ({ onChange, onSubmit }) => {
  const handleChange = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputChangeEventData>, name: string) =>
    onChange(name, text);

  return (
    <View style={styles.container}>
      <TextInput
        id="email"
        autoCapitalize="none"
        onSubmitEditing={onSubmit}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="go"
        placeholder="Email"
        onChange={handleChange}
      />
    </View>
  );
};

export default SendResetPasswordEmailFormForm;
