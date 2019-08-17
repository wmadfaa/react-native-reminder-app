import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenComponent, NavigationScreenProps, NavigationStackScreenOptions } from 'react-navigation';

import { ROUTES } from '../../routes';

import * as uiActions from '../../store/ui/ui.actions';

import Button from '../../components/Button/Button';

import styles from './OnboardingScreen.style';

interface OnboardingScreenNavigationParams {}

interface OnboardingScreenNavigationOptions {}

interface OnboardingScreenProps {}

const OnboardingScreen: NavigationScreenComponent<
  OnboardingScreenNavigationParams,
  OnboardingScreenNavigationOptions,
  OnboardingScreenProps
> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OnboardingScreen</Text>
    </View>
  );
};

const HeaderRightButton = connect(
  null,
  {
    setOnBoardingState: uiActions.setOnBoardingState,
  },
)(
  ({
    onSkepPress,
    setOnBoardingState,
  }: {
    onSkepPress: () => void;
    setOnBoardingState: typeof uiActions.setOnBoardingState;
  }) => {
    return (
      <Button
        onPress={() => {
          setOnBoardingState(true);
          onSkepPress();
        }}
      >
        Skep Intro
      </Button>
    );
  },
);

OnboardingScreen.navigationOptions = ({ navigation }: NavigationScreenProps): NavigationStackScreenOptions => {
  return {
    headerLeft: <Text style={styles.title}>Reminder App</Text>,
    headerRight: <HeaderRightButton onSkepPress={() => navigation.navigate(ROUTES.AUTHENTICATION_LOADING)} />,
  };
};

export default OnboardingScreen;
