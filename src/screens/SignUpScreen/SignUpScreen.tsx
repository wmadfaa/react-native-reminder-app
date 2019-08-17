import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';

import { ROUTES } from '../../routes';
import * as authActions from '../../store/auth/auth.actions';
import { ApplicationState } from '../../store/index';

import SignUpForm from './components/SignUpForm/SignUpForm';

import styles from './SignUpScreen.style';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
import Button, { ButtonsContainer } from '../../components/Button/Button';

interface SignUpScreenNavigationParams {}

interface SignUpScreenNavigationOptions {}

interface PropsFromStore {
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  signUpWithEmailAndPassword: typeof authActions.signUpWithEmailAndPassword.request;
}

interface SignUpScreenProps extends PropsFromStore {}

const SignUpScreen: NavigationScreenComponent<
  SignUpScreenNavigationParams,
  SignUpScreenNavigationOptions,
  SignUpScreenProps
> = ({ isAuthLoading, isAuthenticated, navigation, signUpWithEmailAndPassword }) => {
  const [formValue, setFormValue] = React.useState<authActions.SignupOrLoginWithEmailAndPasswordPayload>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      navigation.navigate(ROUTES.AUTHENTICATION_LOADING);
    }
  }, [isAuthLoading, isAuthenticated, navigation]);

  const handleFormChange = (name: string, value: string) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpWithEmailAndPassword = () => {
    const { email, password } = formValue;
    console.log({ email, password });
    signUpWithEmailAndPassword({ email, password });
  };

  return (
    <View style={styles.container}>
      <LoaderModal loading={isAuthLoading} />
      <Text style={styles.title}>SignUp Screen</Text>
      <KeyboardAvoidingView behavior="padding">
        <SignUpForm onChange={handleFormChange} onSubmit={handleSignUpWithEmailAndPassword} />
      </KeyboardAvoidingView>
      <ButtonsContainer isCenter>
        <Button
          isPrimary
          onPress={handleSignUpWithEmailAndPassword}
          disabled={formValue.email === '' || formValue.password === ''}
        >
          REGISTER
        </Button>
      </ButtonsContainer>
    </View>
  );
};

SignUpScreen.navigationOptions = (): NavigationStackScreenOptions => {
  return {
    header: null,
  };
};

const mapStateToProps = ({ auth }: ApplicationState) => ({
  isAuthLoading: auth.loading,
  isAuthenticated: auth.authenticated,
});

const mapDispatchToProps = {
  signUpWithEmailAndPassword: authActions.signUpWithEmailAndPassword.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);
