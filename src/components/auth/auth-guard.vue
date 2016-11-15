<template lang="pug">
  div
    slot(v-if="authenticated")
    slot(name="auth" v-if="authenticated")
    slot(name="no-auth" v-if="!authenticated")
      p Not authenticated
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: mapState({
      authenticated: state => state.auth.authenticated,
    }),
  };
</script>