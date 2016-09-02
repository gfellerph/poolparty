import cuid from 'cuid';
import firebase from 'config/firebase';

export default class Pool {
  constructor({
    id = cuid(),
    created = Date.now(),
    name = '',
    users = [],
  } = {}) {
    this.id = id;
    this.created = created;
    this.name = name;
    this.users = users;
  }

  set() {
    return firebase
      .database()
      .ref(`/pools/${this.id}`)
      .set(this);
  }

  remove() {
    return firebase
      .database()
      .ref(`/pools/${this.id}`)
      .remove();
  }
}
