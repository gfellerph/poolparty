<template>
  <div>
    <login></login>
  </div>
</template>

<script>
import Login from 'components/auth/login';
import store from 'config/store';

export default {
  components: {
    Login,
  },
  store,
};
</script>
