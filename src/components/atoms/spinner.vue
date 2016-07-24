<template lang="pug">
  span.spinner
</template>

<style lang="scss">
  .spinner {
    &:before{
      content: '.';
      animation: spin 2s infinite;
    }
  }

  @keyframes spin {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
</style>