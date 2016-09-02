<template lang="pug">
  div
    login
    navigation
    router-view
</template>

<script>
import Login from 'components/auth/login';
import Navigation from 'components/common/navigation';
import store from 'config/store';

export default {
  components: {
    Login,
    Navigation,
  },
  store,
};
</script>
