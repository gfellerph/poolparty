import firebase from 'config/firebase';
import cuid from 'cuid';

export default class Skill {
  constructor(skill) {
    this.id = cuid();
    this.name = '';
    this.user = null;
    this.created = Date.now();

    // Prefill values from payload
    const populated = Object.assign({}, this, skill);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this[key] = populated[key];
      }
    }
  }

  set() {
    return firebase
      .database()
      .ref(`/skills/${this.id}`)
      .set(this);
  }

  remove() {
    return firebase
      .database()
      .ref(`/skills/${this.id}`)
      .remove();
  }
}
