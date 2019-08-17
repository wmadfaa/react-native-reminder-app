import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthenticationLoadingScreen from '../screens/AuthenticationLoadingScreen/AuthenticationLoadingScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import IntroScreen from '../screens/OnboardingScreen/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';

export enum ROUTES {
  AUTHENTICATION_LOADING = 'AUTHENTICATION_LOADING',

  ROOT_INTRO = 'ROOT_INTRO',
  INTRO_ONBOARDING = 'INTRO_ONBOARDING',

  ROOT_AUTH = 'ROOT_AUTH',
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_SIGN_UP = 'AUTH_SIGN_UP',
  AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD',

  ROOT_MAIN = 'ROOT_MAIN',
  MAIN_HOME = 'MAIN_HOME',
}

const authStack = createStackNavigator({
  [ROUTES.AUTH_LOGIN]: LoginScreen,
  [ROUTES.AUTH_SIGN_UP]: SignUpScreen,
  [ROUTES.AUTH_RESET_PASSWORD]: ForgetPassword,
});

const introStack = createStackNavigator({
  [ROUTES.INTRO_ONBOARDING]: IntroScreen,
});

const mainStack = createStackNavigator({
  [ROUTES.MAIN_HOME]: HomeScreen,
});

const app = createSwitchNavigator({
  [ROUTES.AUTHENTICATION_LOADING]: AuthenticationLoadingScreen,
  [ROUTES.ROOT_INTRO]: introStack,
  [ROUTES.ROOT_AUTH]: authStack,
  [ROUTES.ROOT_MAIN]: mainStack,
});

export default createAppContainer(app);
