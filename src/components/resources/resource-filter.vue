<template lang="pug">
  div
    label Filter resources
    input(
      v-model="filter"
    )
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    computed: {
      filter: {
        get() {
          return this.$store.state.resources.filter;
        },

        set(value) {
          this.setFilter(value);
        },
      },
    },

    methods: {
      ...mapActions(['setFilter']),
    },
  };
</script>