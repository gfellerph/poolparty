<template lang="pug">
  div
    label Filter resources
    input(
      v-model="cFilter"
    )
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    computed: {
      cFilter: {
        get() {
          return this.filter;
        },

        set(value) {
          this.setFilter(value);
        },
      },
      filter() { return this.$store.state.resources.filter; },
    },

    methods: {
      ...mapActions(['setFilter']),
    },
  };
</script>