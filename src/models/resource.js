import cuid from 'cuid';
import firebase from 'config/firebase';

export default class Resource {
  constructor(props = {}) {
    if (!props) props = {};
    this.id = props.id || cuid();
    this.created = props.created || Date.now();
    this.name = props.name || '';
    this.website = props.website || '';
    this.location = props.location || '';
    this.user = props.user || '';
    this.skills = props.skills || [];
    this.pool = props.pool || '';
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
