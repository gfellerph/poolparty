<template lang="pug">
  div.active-pool
    h3 Active pool:
    ul
      li(v-for="pool in userPools")
        label(for="{{pool.id}}")
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

  export default {
    computed: {
      userPools() {
        return this.pools.filter(pool => {
          return pool.users.filter(userId => userId === this.user.uid).length > 0;
        });
      },
    },

    methods: {
      isActivePool(pool) {
        console.log(this.activePool && pool.id === this.activePool.id, pool.name);
        return this.activePool && pool.id === this.activePool.id;
      },
    },

    vuex: {
      getters: {
        user: state => state.auth.user,
      },
      actions: {
        setActivePool({ dispatch }, e) {
          dispatch('SET_ACTIVE_POOL', { activePool: e });
        },
      },
    },

    firebase: {
      pools: database.ref('/pools'),
    },

    created() {
      const poolValue = this.$firebaseRefs.pools.on('child_added', snapshot => {
        const pool = snapshot.val();
        if (!this.activePool && pool.users.indexOf(this.user.uid) >= 0) {
          this.setActivePool(new Pool(pool));
          this.$firebaseRefs.pools.off('child_added', poolValue);
        }
      });
    },
  };
</script>
