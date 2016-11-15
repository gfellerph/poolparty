<template lang="pug">
  form
    h3 NEW POOL
    p
      label Name
      input(
        v-model="pool.name"
      )

    ul
      li(v-for="user in userList")
        label
          input(
            type="checkbox"
            @change="pool.toggleUser(user.uid)"
          )
          img(v-bind:src="user.photoURL" v-bind:alt="user.displayName")
          span {{user.displayName}} ({{user.email}})

    h4 Pools
    p(v-for="pool in pools") {{pool.name}}
      img(v-for="(user, key) in pool.users" v-bind:src="getUserImg(key)" style="width:24px;height:24px")
      a(@click="deletePool(pool)") delete
    p
      button(
        @click.prevent="addPool"
      ) Save pool

</template>

<script>
  import Vue from 'vue';
  import Pool from 'models/pool';
  import { database } from 'config/firebase';

  export default {
    data() {
      return {
        pool: new Pool(),
      };
    },

    computed: {
      userList() {
        Vue.delete(this.users, '.key');
        return this.users;
      },
    },

    firebase: {
      users: {
        source: database.ref('/users'),
        asObject: true,
      },
      pools: database.ref('/pools'),
    },

    methods: {
      getUserImg(userId) {
        return this.users[userId] ? this.users[userId].photoURL : '';
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