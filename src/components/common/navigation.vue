<template lang="pug">
  nav
    ul
      li
        a(v-link="{path: '/', exact: true}") Home
      li
        a(v-link="{path: '/resources'}") Resource Pool
      li
        a(v-link="{path: '/invite'}") Invite friend
</template>

<style lang="scss">
  .active {
    font-weight: bold;
  }
</style>