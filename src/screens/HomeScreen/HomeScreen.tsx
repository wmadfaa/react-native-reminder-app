import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { NavigationScreenComponent, NavigationStackScreenOptions } from 'react-navigation';

import { ROUTES } from '../../routes';
import * as authActions from '../../store/auth/auth.actions';
import { ApplicationState } from '../../store/index';

import styles from './HomeScreen.style';
import LoaderModal from '../../components/LoaderModal/LoaderModal';
import Button, { ButtonsContainer } from '../../components/Button/Button';

interface HomeScreenNavigationParams {}

interface HomeScreenNavigationOptions {}

interface PropsFromStore {
  isAuthenticated: boolean;
  isAuthLoading: boolean;

  signOut: typeof authActions.signOut.request;
}

interface HomeScreenProps extends PropsFromStore {}

const HomeScreen: NavigationScreenComponent<
  HomeScreenNavigationParams,
  HomeScreenNavigationOptions,
  HomeScreenProps
> = ({ isAuthLoading, isAuthenticated, navigation, signOut }) => {
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      navigation.navigate(ROUTES.AUTHENTICATION_LOADING);
    }
  }, [isAuthLoading, isAuthenticated, navigation]);

  const handleSignOut = () => signOut({});

  return (
    <View style={styles.container}>
      <LoaderModal loading={isAuthLoading} />
      <Text style={styles.title}>HomeScreen</Text>
      <ButtonsContainer>
        <Button isPrimary onPress={handleSignOut}>
          SIGN UOT
        </Button>
      </ButtonsContainer>
    </View>
  );
};

HomeScreen.navigationOptions = (): NavigationStackScreenOptions => {
  return {};
};

const mapStateToProps = ({ auth }: ApplicationState) => ({
  isAuthLoading: auth.loading,
  isAuthenticated: auth.authenticated,
});

const mapDispatchToProps = {
  signOut: authActions.signOut.request,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
