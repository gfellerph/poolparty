<template lang="pug">
  div
    auth-guard
      spinner(v-if="loading")
      div(v-if="!loading && !err")
        h2 You have been invited to {{pool.name}}, do you like to join?
        button(
          @click="acceptInvitation"
        ) yes
        button(
          @click="declineInvitation"
        ) no
      p(v-if="err") {{err}}
</template>

<script>
  import { database } from 'config/firebase';
  import Pool from 'models/pool';
  import Invite from 'models/invite';
  import router from 'config/router';
  import Spinner from 'components/common/spinner';
  import AuthGuard from 'components/auth/auth-guard';

  export default {
    name: 'Invitation',

    data() {
      return {
        err: null,
      };
    },

    computed: {
      loading() {
        return !(this.invite && this.pool || this.err);
      },
    },

    methods: {
      acceptInvitation() {
        this.pool.users.push(this.user.uid);
        new Pool(this.pool).set();
        new Invite(this.invite).remove();
        router.go('/resources');
      },

      declineInvitation() {
        new Invite(this.invite).remove();
        router.go('/');
      },
    },

    created() {
      const inviteRef = database.ref(`/invites/${this.$route.params.id}`);
      this.$bindAsObject('invite', inviteRef);
      inviteRef.once('value', snapshot => {
        const val = snapshot.val();
        if (val) {
          this.$bindAsObject('pool', database.ref(`/pools/${snapshot.val().pool}`));
        } else {
          this.err = 'no invitation found with this id';
        }
      });
    },

    vuex: {
      getters: {
        user: state => state.auth.user,
      },
    },

    components: { Spinner, AuthGuard },
  };
</script>
