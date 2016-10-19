<template lang="pug">
  div
    login
    navigation
    router-view
</template>

<script>
  import Vue from 'vue';
  import Login from 'components/auth/login';
  import Navigation from 'components/common/navigation';
  import store from 'config/store';
  import router from 'config/router';

  export default new Vue({
    el: '#app',
    components: {
      Login,
      Navigation,
    },
    store,
    router,
  });
</script>
