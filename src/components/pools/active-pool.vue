<template lang="pug">
  div.active-pool
    h3 Active pool:
    ul
      li(v-for="pool in userPools")
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

  function filterPools(pools, uid) {
    return pools.filter(pool => pool.users.indexOf(uid) >= 0);
  }

  export default {
    computed: {
      userPools() {
        return filterPools(this.pools, this.user.uid);
      },
      user() { return this.$store.state.auth.user; },
      activePool() { return this.$store.state.resources.activeState; },
    },

    methods: {
      isActivePool(pool) {
        return this.activePool && pool.id === this.activePool.id;
      },
    },

    firebase: {
      pools: database.ref('/pools'),
    },

    mounted() {
      this.$firebaseRefs.pools.once('value', (snapshot) => {
        const val = snapshot.val();
        if (!val) return;
        const poolArr = Object.keys(val).map(poolId => val[poolId]);
        const pools = filterPools(poolArr, this.user.uid);
        if (!this.activePool) {
          this.setActivePool(new Pool(pools[0]));
        }
      });
    },
  };
</script>
