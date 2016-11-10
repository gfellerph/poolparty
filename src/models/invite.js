import cuid from 'cuid';
import { database } from 'config/firebase';
import { APP_ROOT } from 'config/constants';

export default class Invite {
  constructor(props = {}) {
    this.id = props.id || cuid();
    this.created = props.created || Date.now();
    this.pool = props.pool || '';
    this.invitee = props.invitee || '';
    this.user = props.user || '';
    this.inviteURL = `${APP_ROOT}/#/invite/${this.id}`;
  }

  set() {
    return database
      .ref(`/invites/${this.id}`)
      .set(this);
  }

  remove() {
    return database
      .ref(`/invites/${this.id}`)
      .remove();
  }
}
