<template lang="pug">
  div.active-pool
    h3 Active pool:
    ul
      li(v-for="pool in pools")
        label(:for="pool.id")
          input(
            :id="pool.id"
            type="radio"
            v-bind:checked="isActivePool(pool)"
            v-bind:value="pool"
            @change="setActivePool(pool)"
            name="activepool"
          )
          span {{pool.name}}
</template>

<script>
  import { database } from 'config/firebase';
  import Pool from 'models/pool';
  import { mapActions } from 'vuex';

  export default {
    computed: {
      user() { return this.$store.state.auth.user; },
      activePool() { return this.$store.state.resources.activePool; },
    },

    methods: {
      isActivePool(pool) {
        return this.activePool && pool.id === this.activePool.id;
      },
      ...mapActions(['setActivePool']),
    },

    created() {
      this.$bindAsArray('pools', database
          .ref('/pools')
          .orderByChild(`users/${this.user.uid}`)
          .equalTo(true));

      this.$firebaseRefs.pools.once('value', () => {
        if (!this.activePool) {
          this.setActivePool(new Pool(this.pools[0]));
        }
      });
    },
  };
</script>
