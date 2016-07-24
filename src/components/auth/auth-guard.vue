<template lang="pug">
  div
    slot(name="auth" v-if="user")
    slot(name="no-auth" v-if="!user")
      p Not authenticated
</template>

<script>
  export default {
    vuex: {
      getters: {
        user: state => state.auth.user,
      },
    },
  };
</script>