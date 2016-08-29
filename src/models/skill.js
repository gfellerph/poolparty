import firebase from 'config/firebase';
import cuid from 'cuid';

const defaultSkill = {
  name: '',
};

export default class Skill {
  constructor(skill) {
    this.id = cuid();

    const populated = Object.assign({}, defaultSkill, skill);
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
