<template lang="pug">
  div.invite-user
    auth-guard
      label Invite 
      input(
        type="email"
        v-model="invite.invitee"
        placeholder="email"
        v-focus-auto
      )
      span  to
      ul
        li(v-for="pool in userPools")
          label(for="{{pool.id}}")
            input(
              v-bind:checked="$index===0"
              v-bind:id="pool.id"
              type="radio"
              name="invite-pools"
              v-model="invite.pool"
              value="{{pool.id}}"
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
  import { focusAuto } from 'vue-focus';
  import { database } from 'config/firebase';

  const poolsRef = database.ref('/pools');

  export default {
    data() {
      return {
        invite: new Invite(),
      };
    },

    directives: { focusAuto },

    computed: {
      userPools() {
        return this.pools.filter(pool => pool.users.indexOf(this.user.uid) >= 0);
      },
    },

    methods: {
      sendInvitation() {
        this.invite.user = this.user;
        this.invite.created = Date.now();

        this.invite.set()
          .then(() => {
            emailjs.send('gmail', 'template_sBAeXYDM', Object.assign({}, this.invite));
            this.invite = new Invite();
          });
      },
    },

    components: { AuthGuard },

    vuex: {
      getters: {
        user: state => state.auth.user,
      },
    },

    firebase: {
      pools: poolsRef,
    },
  };
</script>
