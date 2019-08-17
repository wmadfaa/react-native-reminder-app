import React from 'react';
import { View, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';

import TextInput, { TextInputHandles } from '../../../../components/TextInput/TextInput';

import styles from './SignUpForm.style';

interface SignUpFormProps {
  onChange(name: string, value: string): void;
  onSubmit(): void;
}

enum InputsRefs {
  lastName = 'SecondNameInputRef',
  email = 'EmailInputRef',
  password = 'PasswordInputRef',
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onChange, onSubmit }) => {
  const SecondNameInputRef = React.useRef<TextInputHandles>(null);
  const EmailInputRef = React.useRef<TextInputHandles>(null);
  const PasswordInputRef = React.useRef<TextInputHandles>(null);

  const handleFocusInput = (nextInput: InputsRefs) => () => {
    const refs = {
      SecondNameInputRef,
      EmailInputRef,
      PasswordInputRef,
    };
    const nextInputRef = refs[nextInput].current;
    if (nextInputRef) {
      nextInputRef.focus();
    }
  };

  const handleChange = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputChangeEventData>, name: string) =>
    onChange(name, text);

  return (
    <View style={styles.container}>
      <TextInput
        id="firstName"
        autoCapitalize="none"
        onSubmitEditing={handleFocusInput(InputsRefs.lastName)}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="FIRST NAME"
        onChange={handleChange}
      />
      <TextInput
        id="lastName"
        autoCapitalize="none"
        ref={SecondNameInputRef}
        onSubmitEditing={handleFocusInput(InputsRefs.email)}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="LAST NAME"
        onChange={handleChange}
      />
      <TextInput
        id="email"
        autoCapitalize="none"
        ref={EmailInputRef}
        onSubmitEditing={handleFocusInput(InputsRefs.password)}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="E-MAIL"
        onChange={handleChange}
      />
      <TextInput
        id="password"
        returnKeyType="go"
        ref={PasswordInputRef}
        placeholder="PASSWORD"
        secureTextEntry
        onSubmitEditing={onSubmit}
        onChange={handleChange}
      />
    </View>
  );
};

export default SignUpForm;
