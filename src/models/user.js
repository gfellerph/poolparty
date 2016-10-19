import firebase from 'config/firebase';

export default class User {
  constructor(user) {
    this.uid = user.uid || null;
    this.displayName = user.displayName || '';
    this.email = user.email || '';
    this.isAnonymous = user.isAnonymous || false;
    this.emailVerified = user.emailVerified || false;
    this.photoURL = user.photoURL || null;
    this.refreshToken = user.refreshToken || null;
  }

  get secureUserInfo() {
    return {
      uid: this.uid,
      displayName: this.displayName,
      photoURL: this.photoURL,
    };
  }

  set() {
    return firebase
      .database()
      .ref(`/users/${this.uid}`)
      .set(this);
  }
}
