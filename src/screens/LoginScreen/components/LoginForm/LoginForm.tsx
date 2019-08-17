import React from 'react';
import { View, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';

import TextInput, { TextInputHandles } from '../../../../components/TextInput/TextInput';

import styles from './LoginForm.style';

interface LoginFormProps {
  onChange(name: string, value: string): void;
  onSubmit(): void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onChange, onSubmit }) => {
  const passwordInputRef = React.useRef<TextInputHandles>(null);

  const handleFocusPasswordInput = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleChange = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputChangeEventData>, name: string) =>
    onChange(name, text);

  return (
    <View style={styles.container}>
      <TextInput
        id="email"
        autoCapitalize="none"
        onSubmitEditing={handleFocusPasswordInput}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="Email"
        onChange={handleChange}
      />
      <TextInput
        id="password"
        returnKeyType="go"
        ref={passwordInputRef}
        placeholder="Password"
        secureTextEntry
        onSubmitEditing={onSubmit}
        onChange={handleChange}
      />
    </View>
  );
};

export default LoginForm;
