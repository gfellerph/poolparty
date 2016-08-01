<template lang="pug">
  div
    input(
      v-model="cFilter"
    )
</template>

<script>
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
    },

    vuex: {
      getters: {
        filter: state => state.pool.filter,
      },
      actions: {
        setFilter({ dispatch }, value) {
          // Don't dispatch if filter is the same
          if (value === this.filter) return;

          // Dispatch with new filter object
          dispatch('SET_FILTER', {
            filter: value,
          });
        },
      },
    },
  };
</script>