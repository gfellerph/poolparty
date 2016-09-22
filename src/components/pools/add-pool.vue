<template lang="pug">
  form
    h3 NEW POOL
    p
      label Name
      input(
        v-model="pool.name"
      )

    ul
      li(v-for="user in users")
        label
          input(
            type="checkbox"
            v-bind:value="user.uid"
            v-model="pool.users"
          )
          img(v-bind:src="user.photoURL" v-bind:alt="user.displayName")
          span {{user.displayName}} ({{user.email}})

    h4 Pools
    p(v-for="pool in pools") {{pool.name}}
      img(v-for="user in pool.users" v-bind:src="getUserImg(user)" style="width:24px;height:24px")
      a(@click="deletePool(pool)") delete
    p
      button(
        @click="addPool"
      ) Save pool

</template>

<script>
  import Pool from 'models/pool';
  import { database } from 'config/firebase';

  export default {
    data() {
      return {
        pool: new Pool(),
      };
    },

    firebase: {
      users: database.ref('/users'),
      pools: database.ref('/pools'),
    },

    methods: {
      getUserImg(userId) {
        const targetUser = this.users.filter(user => user.uid === userId)[0];
        return targetUser ? targetUser.photoURL : '';
      },
      addPool() {
        this.pool.set();
        this.pool = new Pool();
      },
      deletePool(pool) {
        new Pool(pool).remove();
      },
    },
  };
</script>