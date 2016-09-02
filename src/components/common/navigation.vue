<template lang="pug">
  nav
    ul
      li
        a(v-link="{path: '/', exact: true}") Home
      li
        a(v-link="{path: '/resources'}") Resource Pool
</template>

<style lang="scss">
  .active {
    font-weight: bold;
  }
</style>