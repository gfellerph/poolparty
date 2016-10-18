import cuid from 'cuid';
import { database } from 'config/firebase';
import { APP_ROOT } from 'config/constants';

export default class Invite {
  constructor({
    id = cuid(),
    created = Date.now(),
    pool = '',
    invitee = '',
    user = '',
  } = {}) {
    this.id = id;
    this.created = created;
    this.pool = pool;
    this.invitee = invitee;
    this.user = user;
    this.inviteURL = `${APP_ROOT}/#/invite/${id}`;
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
