import cuid from 'cuid';
import { database } from 'config/firebase';
import Vue from 'vue';

export default class Pool {
  constructor({
    id = cuid(),
    created = Date.now(),
    name = '',
    users = {},
  } = {}) {
    this.id = id;
    this.created = created;
    this.name = name;
    this.users = users;
  }

  toggleUser(user) {
    if (this.users[user]) {
      Vue.delete(this.users, user);
    } else {
      Vue.set(this.users, user, true);
    }
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
