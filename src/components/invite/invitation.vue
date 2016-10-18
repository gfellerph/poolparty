<template lang="pug">
  div
    h2 You have been invited to {{pool.name}}, do you like to join?
    button(
      @click="acceptInvitation"
    ) yes
    button(
      @click="declineInvitation"
    ) no
</template>

<script>
  import { database } from 'config/firebase';
  import Pool from 'models/pool';
  import Invite from 'models/invite';
  import router from 'config/router';

  export default {
    computed: {
      invite() {
        return new Invite(this.invites[this.$route.params.id]);
      },

      pool() {
        return (this.invite)
          ? new Pool(this.pools[this.invite.pool])
          : new Pool();
      },
    },

    methods: {
      acceptInvitation() {

      },

      declineInvitation() {
        this.invite.remove();
        router.go('/');
      },
    },

    firebase: {
      pools: {
        source: database.ref('/pools'),
        asObject: true,
      },
      invites: {
        source: database.ref('/invites'),
        asObject: true,
      },
    },
  };
</script>
