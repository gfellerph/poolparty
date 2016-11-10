<template lang="pug">
  div
    login
    navigation
    router-view
</template>

<script>
  import Login from 'components/auth/login';
  import Navigation from 'components/common/navigation';

  export default {
    components: {
      Login,
      Navigation,
    },
  };
</script>
