import React from 'react';
import { Text, View } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';

import { ROUTES } from '../../routes';

import styles from './AuthenticationLoadingScreen.style';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import LoaderModal from '../../components/LoaderModal/LoaderModal';

interface AuthenticationLoadingScreenNavigationParams {}

interface AuthenticationLoadingScreenNavigationOptions {}

interface propsFromStore {
  isOnBoardingViewed: boolean;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

interface AuthenticationLoadingScreenProps extends propsFromStore {}

const AuthenticationLoadingScreen: NavigationScreenComponent<
  AuthenticationLoadingScreenNavigationParams,
  AuthenticationLoadingScreenNavigationOptions,
  AuthenticationLoadingScreenProps
> = ({ navigation, isOnBoardingViewed, isAuthenticated, isAuthLoading }) => {
  React.useEffect(() => {
    if (!isAuthLoading) {
      gard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading]);

  const gard = () => {
    if (!isOnBoardingViewed) {
      navigation.navigate(ROUTES.ROOT_INTRO);
      return;
    }
    if (isAuthenticated) {
      navigation.navigate(ROUTES.ROOT_MAIN);
      return;
    } else {
      navigation.navigate(ROUTES.AUTH_LOGIN);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <LoaderModal loading />
      <Text style={styles.title}>AuthenticationLoadingScreen</Text>
    </View>
  );
};

const mapStateToProps = ({ ui, auth }: ApplicationState) => ({
  isOnBoardingViewed: ui.onBoardingViewed,
  isAuthenticated: auth.authenticated,
  isAuthLoading: auth.loading,
});

export default connect(mapStateToProps)(AuthenticationLoadingScreen);
