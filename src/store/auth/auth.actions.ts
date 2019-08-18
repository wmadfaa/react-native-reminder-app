import { RNFirebase } from 'react-native-firebase';
import { createAsyncAction, action } from 'typesafe-actions';
import { AuthActionTypes } from './auth.types';

export interface SignupOrLoginWithEmailAndPasswordPayload {
  email: string;
  password: string;
}

export const loginWithFacebook = createAsyncAction(
  AuthActionTypes.LOGIN_WITH_FACEBOOK_REQUEST,
  AuthActionTypes.LOGIN_WITH_FACEBOOK_SUCCESS,
  AuthActionTypes.LOGIN_WITH_FACEBOOK_FAILURE,
)<{}, { user: RNFirebase.User }, Error>();

export const loginWithGoogle = createAsyncAction(
  AuthActionTypes.LOGIN_WITH_GOOGLE_REQUEST,
  AuthActionTypes.LOGIN_WITH_GOOGLE_SUCCESS,
  AuthActionTypes.LOGIN_WITH_GOOGLE_FAILURE,
)<{}, { user: RNFirebase.User }, Error>();

export const loginWithEmailAndPassword = createAsyncAction(
  AuthActionTypes.LOGIN_WITH_EMAIL_AND_PASSWORD_REQUEST,
  AuthActionTypes.LOGIN_WITH_EMAIL_AND_PASSWORD_SUCCESS,
  AuthActionTypes.LOGIN_WITH_EMAIL_AND_PASSWORD_FAILURE,
)<SignupOrLoginWithEmailAndPasswordPayload, { user: RNFirebase.User }, Error>();

export const signUpWithEmailAndPassword = createAsyncAction(
  AuthActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_REQUEST,
  AuthActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS,
  AuthActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD_FAILURE,
)<SignupOrLoginWithEmailAndPasswordPayload, { user: RNFirebase.User }, Error>();

export const signOut = createAsyncAction(
  AuthActionTypes.SIGN_OUT_REQUEST,
  AuthActionTypes.SIGN_OUT_SUCCESS,
  AuthActionTypes.SIGN_OUT_FAILURE,
)<{}, {}, Error>();

export const sendPasswordResetEmail = createAsyncAction(
  AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST,
  AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
  AuthActionTypes.SEND_PASSWORD_RESET_EMAIL_FAILURE,
)<{ email: string }, {}, Error>();

export const clearErrors = () => action(AuthActionTypes.CLEAR_ERRORS);
