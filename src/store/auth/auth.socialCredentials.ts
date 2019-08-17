import { AuthCredential, auth as FBAuth } from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

export const getFacebookCredential = async (): Promise<AuthCredential> => {
  return new Promise(async (res, rej) => {
    try {
      const { isCancelled } = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (isCancelled) {
        rej(new Error('The user cancelled the request'));
      }
      const token = await AccessToken.getCurrentAccessToken();
      const accessToken = token ? token.accessToken : null;
      const authCredential = FBAuth.FacebookAuthProvider.credential(accessToken);
      res(authCredential);
    } catch (err) {
      rej(new Error(err));
    }
  });
};

export const getGoogleCredential = async (): Promise<AuthCredential> => {
  return new Promise(async (res, rej) => {
    try {
      await GoogleSignin.configure({
        offlineAccess: false,
        webClientId: '567378576255-3g7j87f6inhbg8262ub8fqoumvdaf635.apps.googleusercontent.com',
      });
      const { idToken } = await GoogleSignin.signIn();
      const authCredential = FBAuth.GoogleAuthProvider.credential(idToken);
      res(authCredential);
    } catch (err) {
      rej(new Error(err));
    }
  });
};
