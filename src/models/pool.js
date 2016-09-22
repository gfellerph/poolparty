import cuid from 'cuid';
import { database } from 'config/firebase';

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
    return database
      .ref(`/pools/${this.id}`)
      .set(this);
  }

  remove() {
    return database
      .ref(`/pools/${this.id}`)
      .remove();
  }
}
