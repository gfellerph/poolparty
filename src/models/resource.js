import cuid from 'cuid';
import firebase from 'config/firebase';

export default class Resource {
  constructor({
    id = cuid(),
    created = Date.now(),
    name = '',
    website = '',
    location = '',
    user = null,
    skills = [],
  } = {}) {
    this.id = id;
    this.created = created;
    this.name = name;
    this.website = website;
    this.location = location;
    this.user = user;
    this.skills = [...skills];
  }

  set() {
    if (!this.user) {
      throw new Error('Resource: User must be specified.');
    }

    this.updated = Date.now();

    return firebase
      .database()
      .ref(`/resources/${this.id}`)
      .set(this);
  }

  remove() {
    return firebase
      .database()
      .ref(`/resources/${this.id}`)
      .remove();
  }
}
