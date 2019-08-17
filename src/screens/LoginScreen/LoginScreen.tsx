import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, View, Text } from 'react-native';
import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';

import { ROUTES } from '../../routes';
import * as authActions from '../../store/auth/auth.actions';
import { ApplicationState } from '../../store/index';

import LoginForm from './components/LoginForm/LoginForm';

import styles from './LoginScreen.style';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
import Button, { ButtonsContainer } from '../../components/Button/Button';

interface LoginScreenNavigationParams {}

interface LoginScreenNavigationOptions {}

interface PropsFromStore {
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  loginWithFacebook: typeof authActions.loginWithFacebook.request;
  loginWithGoogle: typeof authActions.loginWithGoogle.request;
  loginWithEmailAndPassword: typeof authActions.loginWithEmailAndPassword.request;
}

interface LoginScreenProps extends PropsFromStore {}

const LoginScreen: NavigationScreenComponent<
  LoginScreenNavigationParams,
  LoginScreenNavigationOptions,
  LoginScreenProps
> = ({ isAuthenticated, isAuthLoading, loginWithFacebook, loginWithGoogle, loginWithEmailAndPassword, navigation }) => {
  const [formValue, setFormValue] = React.useState<authActions.SignupOrLoginWithEmailAndPasswordPayload>({
    email: '',
    password: '',
  });
  const canSubmitLoginForm = !(formValue.email === '' || formValue.password === '');

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      navigation.navigate(ROUTES.AUTHENTICATION_LOADING);
    }
  }, [isAuthLoading, isAuthenticated, navigation]);

  const handleFormChange = (name: string, value: string) => {
    setFormValue(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginWithEmailAndPassword = () => {
    if (canSubmitLoginForm) {
      loginWithEmailAndPassword(formValue);
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate(ROUTES.AUTH_RESET_PASSWORD);
  };

  const handleLoginWithFacebook = () => loginWithFacebook({});

  const handleLoginWithGoogle = () => loginWithGoogle({});

  const handleSignUpWithEmailAndPassword = () => {
    navigation.navigate(ROUTES.AUTH_SIGN_UP);
  };

  return (
    <View style={styles.container}>
      <LoaderModal loading={isAuthLoading} />
      <Text style={styles.title}>Login Screen</Text>
      <KeyboardAvoidingView behavior="padding">
        <LoginForm onChange={handleFormChange} onSubmit={handleLoginWithEmailAndPassword} />
      </KeyboardAvoidingView>
      <ButtonsContainer>
        <ButtonsContainer isHorizontal>
          <Button onPress={handleForgetPassword}>FORGET PASSWORD</Button>
          <Button isPrimary onPress={handleLoginWithEmailAndPassword} disabled={!canSubmitLoginForm}>
            LOGIN
          </Button>
        </ButtonsContainer>
        <Button onPress={handleSignUpWithEmailAndPassword} isPrimary>
          REGISTER THROUGH E-MAIL
        </Button>
        <Button onPress={handleLoginWithGoogle} isPrimary>
          LOGIN THROUGH GOOGLE
        </Button>
        <Button onPress={handleLoginWithFacebook} isPrimary>
          LOGIN THROUGH FACEBOOK
        </Button>
      </ButtonsContainer>
    </View>
  );
};

LoginScreen.navigationOptions = (): NavigationStackScreenOptions => {
  return {};
};

const mapStateToProps = ({ auth }: ApplicationState) => ({
  isAuthLoading: auth.loading,
  isAuthenticated: auth.authenticated,
});

const mapDispatchToProps = {
  loginWithFacebook: authActions.loginWithFacebook.request,
  loginWithGoogle: authActions.loginWithGoogle.request,
  loginWithEmailAndPassword: authActions.loginWithEmailAndPassword.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
