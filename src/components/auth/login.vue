<template lang="pug">
  div
    auth-guard
      div(slot="auth")
        p Hoi {{user.displayName}} ({{user.email}})
        p
          img(v-bind:src="user.photoURL")
        button(@click="logout") logout

      div(slot="no-auth")
        p Login with google
        spinner(v-if="isLoading")
        button(@click="login") login with google
        p.error(v-if="err") {{err}}
</template>

<script>
  import { auth, GoogleProvider } from 'config/firebase';
  import store from 'config/store';
  import Spinner from 'components/common/spinner';
  import AuthGuard from 'components/auth/auth-guard';
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        err: '',
        isLoading: false,
      };
    },

    computed: mapState({
      user: state => state.auth.user,
    }),

    methods: {
      login() {
        this.isLoading = true;

        auth
          .signInWithPopup(GoogleProvider)
          .then(() => {
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.err = err;
          });
      },
      logout() {
        auth.signOut();
      },
    },

    created() {
      this.isLoading = true;

      // Listen to auth changes at firebase
      auth
        .onAuthStateChanged((user) => {
          this.isLoading = false;

          // Dispatch according to auth state
          if (user) {
            store.commit('LOGIN', {
              user,
            });
            user.set();
          } else {
            store.commit('LOGOUT');
          }
        });
    },

    components: {
      Spinner,
      AuthGuard,
    },
  };
</script>
