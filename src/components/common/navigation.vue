<template lang="pug">
  nav
    ul
      li
        router-link(to="/" exact) Home
      li
        router-link(to="/resources") Resource Pool
      li
        router-link(to="/invite") Invite friend
</template>

<style lang="scss">
  .active {
    font-weight: bold;
  }
</style>