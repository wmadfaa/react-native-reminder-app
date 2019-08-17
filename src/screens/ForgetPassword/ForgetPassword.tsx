import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';

import { ROUTES } from '../../routes';
import * as authActions from '../../store/auth/auth.actions';
import { ApplicationState } from '../../store/index';

import styles from './ForgetPassword.style';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
import Button, { ButtonsContainer } from '../../components/Button/Button';
import SendResetPasswordEmailForm from './components/SendResetPasswordEmailForm/SendResetPasswordEmailForm';

interface ForgetPasswordNavigationParams {}

interface ForgetPasswordNavigationOptions {}

interface PropsFromStore {
  isAuthLoading: boolean;

  sendPasswordResetEmail: typeof authActions.sendPasswordResetEmail.request;
}

interface ForgetPasswordProps extends PropsFromStore {}

const ForgetPassword: NavigationScreenComponent<
  ForgetPasswordNavigationParams,
  ForgetPasswordNavigationOptions,
  ForgetPasswordProps
> = ({ isAuthLoading, sendPasswordResetEmail, navigation }) => {
  const [sendPasswordResetEmailRequested, setSendPasswordResetEmailRequested] = useState(false);
  const [formValue, setFormValue] = useState<{ email: string }>({
    email: '',
  });
  const canSubmitSendResetPasswordEmailForm = !(formValue.email === '');

  useEffect(() => {
    if (!isAuthLoading && sendPasswordResetEmailRequested) {
      navigation.navigate(ROUTES.AUTHENTICATION_LOADING);
    }
  }, [isAuthLoading, navigation, sendPasswordResetEmailRequested]);

  const handleFormChange = (name: string, value: string) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };

  const handleSendPasswordResetEmail = () => {
    if (canSubmitSendResetPasswordEmailForm) {
      sendPasswordResetEmail(formValue);
      setSendPasswordResetEmailRequested(true);
    }
  };

  return (
    <View style={styles.container}>
      <LoaderModal loading={isAuthLoading} />
      <Text style={styles.title}>Reset Password Screen</Text>
      <KeyboardAvoidingView behavior="padding">
        <SendResetPasswordEmailForm onChange={handleFormChange} onSubmit={handleSendPasswordResetEmail} />
      </KeyboardAvoidingView>
      <ButtonsContainer>
        <Button onPress={handleSendPasswordResetEmail} isPrimary disabled={!canSubmitSendResetPasswordEmailForm}>
          SEND RESET E-MAIL
        </Button>
      </ButtonsContainer>
    </View>
  );
};

ForgetPassword.navigationOptions = (): NavigationStackScreenOptions => {
  return {};
};

const mapStateToProps = ({ auth }: ApplicationState) => ({
  isAuthLoading: auth.loading,
});

const mapDispatchToProps = {
  sendPasswordResetEmail: authActions.sendPasswordResetEmail.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword);
