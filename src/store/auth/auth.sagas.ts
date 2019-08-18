import firebase, { AuthCredential, RNFirebase } from 'react-native-firebase';
import { eventChannel, EventChannel } from 'redux-saga';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { getFacebookCredential, getGoogleCredential } from '../../services/SocialCredentials.service';
import * as actions from './auth.actions';
import { AuthActionTypes } from './auth.types';

const FBAuthRef = firebase.auth();

function authChanel(): EventChannel<{ user: RNFirebase.auth.OrNull<RNFirebase.User> }> {
  return eventChannel(emit => {
    return FBAuthRef.onAuthStateChanged(user => {
      emit({ user });
    });
  });
}

function* statusWatcher() {
  const channel: EventChannel<{ user: RNFirebase.auth.OrNull<RNFirebase.User> }> = yield call(authChanel);

  while (true) {
    const { user }: { user: RNFirebase.auth.OrNull<RNFirebase.User> } = yield take(channel);
    if (user) {
      switch (user.providerId) {
        case 'facebook.com':
          yield put(actions.loginWithFacebook.success({ user }));
          break;
        case 'google.com':
          yield put(actions.loginWithFacebook.success({ user }));
          break;
        case 'firebase':
          yield put(actions.loginWithEmailAndPassword.success({ user }));
          break;
      }
    } else {
      yield put(actions.signOut.success({}));
    }
  }
}

function* loginWithFacebook(): Generator {
  try {
    const credential: AuthCredential = yield call(getFacebookCredential);
    yield call([FBAuthRef, FBAuthRef.signInWithCredential], credential);
  } catch (err) {
    yield put(actions.loginWithFacebook.failure(err.message));
  }
}

function* loginWithGoogle(): Generator {
  try {
    const credential: AuthCredential = yield call(getGoogleCredential);
    yield call([FBAuthRef, FBAuthRef.signInWithCredential], credential);
  } catch (err) {
    yield put(actions.loginWithGoogle.failure(err.message));
  }
}

function* loginWithEmailAndPassword({
  payload: { email, password },
}: ReturnType<typeof actions.loginWithEmailAndPassword.request>): Generator {
  try {
    return yield call([FBAuthRef, FBAuthRef.signInWithEmailAndPassword], email, password);
  } catch (err) {
    yield put(actions.loginWithEmailAndPassword.failure(err.message));
  }
}

function* signUp({
  payload: { email, password },
}: ReturnType<typeof actions.signUpWithEmailAndPassword.request>): Generator {
  try {
    return yield call([FBAuthRef, FBAuthRef.createUserWithEmailAndPassword], email, password);
  } catch (err) {
    yield put(actions.signUpWithEmailAndPassword.failure(err.message));
  }
}

function* signOut(): Generator {
  try {
    yield call([FBAuthRef, FBAuthRef.signOut]);
  } catch (err) {
    yield put(actions.signOut.failure(err.message));
  }
}

function* sendPasswordResetEmail({
  payload: { email },
}: ReturnType<typeof actions.sendPasswordResetEmail.request>): Generator {
  try {
    yield call([FBAuthRef, FBAuthRef.sendPasswordResetEmail], email);
    yield put(actions.sendPasswordResetEmail.success({}));
  } catch (err) {
    yield put(actions.sendPasswordResetEmail.failure(err.message));
  }
}

export default function* AuthRootSaga() {
  yield fork(statusWatcher);
  yield all([
    takeEvery(AuthActionTypes.LOGIN_WITH_FACEBOOK_REQUEST, loginWithFacebook),
    takeEvery(AuthActionTypes.LOGIN_WITH_GOOGLE_REQUEST, loginWithGoogle),
    takeEvery(AuthActionTypes.LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST, loginWithEmailAndPassword),
    takeEvery(AuthActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_REQUEST, signUp),
    takeEvery(AuthActionTypes.SIGN_OUT_REQUEST, signOut),
    takeEvery(AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST, sendPasswordResetEmail),
  ]);
}
