<template lang="pug">
  div.invite-user
    auth-guard
      label Invite 
      input(
        type="email"
        v-model="invite.invitee"
        placeholder="email"
        name="invite-email"
      )
      span  to
      ul
        li(v-for="pool, index in userPools")
          label(:for="pool.id")
            input(
              v-bind:checked="index===0"
              v-bind:id="pool.id"
              type="radio"
              name="invite-pools"
              v-model="invite.pool"
              v-bind:value="pool.id"
            )
            span {{pool.name}}
      button(
        @click="sendInvitation"
      ) send invitation
</template>

<script>
  import Invite from 'models/invite';
  import emailjs from 'config/emailjs';
  import AuthGuard from 'components/auth/auth-guard';
  import { database } from 'config/firebase';

  const poolsRef = database.ref('/pools');

  export default {
    data() {
      return {
        invite: new Invite(),
      };
    },

    computed: {
      userPools() {
        return this.pools.filter(pool => pool.users.indexOf(this.user.uid) >= 0);
      },
      user() { return this.$store.state.authentication.user; },
    },

    methods: {
      sendInvitation() {
        this.invite.user = this.user.secureUserInfo;
        this.invite.created = Date.now();

        emailjs.send('gmail', 'template_sBAeXYDM', Object.assign({}, this.invite))
          .then(() => {
            this.invite.invitee = '';
            return this.invite.set();
          })
          .then(() => {
            this.invite = new Invite();
          });
      },
    },

    components: { AuthGuard },

    firebase: {
      pools: poolsRef,
    },
  };
</script>
