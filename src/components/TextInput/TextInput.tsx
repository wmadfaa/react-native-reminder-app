import React, { RefForwardingComponent, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';

import styles from './TextInput.style';

export interface TextInputHandles {
  focus(): void;
}

interface TextInputProps extends Omit<RNTextInputProps, 'onChange'> {
  id?: string;
  onChange(evt: NativeSyntheticEvent<TextInputChangeEventData>, id?: string): void;
}

const TextInput: RefForwardingComponent<TextInputHandles, TextInputProps> = ({ id, onChange, ...props }, ref) => {
  const inputRef = useRef<RNTextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        return inputRef.current.focus();
      }
    },
  }));

  const handleChange = (evt: NativeSyntheticEvent<TextInputChangeEventData>) => onChange(evt, id);
  return (
    <RNTextInput
      ref={inputRef}
      style={styles.input}
      placeholderTextColor="rgba(0,0,0,0.3)"
      onChange={handleChange}
      {...props}
    />
  );
};

export default forwardRef(TextInput);
