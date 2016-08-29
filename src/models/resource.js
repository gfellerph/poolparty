import cuid from 'cuid';
import Skill from 'models/skill';
import firebase from 'config/firebase';

const defaultResource = {
  name: '',
  website: '',
  location: '',
  newSkill: new Skill(),
  chosenSkills: [],
};

export default class Resource {
  constructor(resource) {
    this.id = cuid();

    const populated = Object.assign({}, defaultResource, resource);
    for (const key in populated) {
      if (populated.hasOwnProperty(key)) {
        this[key] = populated[key];
      }
    }
  }

  set() {
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
