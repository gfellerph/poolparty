import firebase from 'config/firebase';

export default class Skill {
  constructor(skill) {
    const { key, name } = skill || {};
    this.key = key || '';
    this.name = name || '';
  }

  push() {
    const ref = firebase
      .database()
      .ref('/skills')
      .push();

    ref.set({
      key: ref.key,
      name: this.name,
    });

    return ref;
  }

  update() {
    return firebase
      .database()
      .ref(`/skills/${this.key}`)
      .set(this);
  }

  delete() {
    return firebase
      .database()
      .ref(`/skills/${this.key}`)
      .remove();
  }
}
