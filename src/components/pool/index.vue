<template lang="pug">
  div
    auth-guard
      div(slot="auth")
        add-resource
        resource-filter
        resource-list
</template>

<script>
  import firebase from 'config/firebase';
  import store from 'config/store';
  import AddResource from 'components/pool/add-resource';
  import ResourceFilter from 'components/pool/resource-filter';
  import ResourceList from 'components/pool/resource-list';
  import AuthGuard from 'components/auth/auth-guard';

  let resourceRef;

  export default {
    name: 'resource-pool',
    created() {
      resourceRef = firebase
        .database()
        .ref('/resources');

      resourceRef.on('child_added', snapshot => {
        store.dispatch('ADD_RESOURCE', { resource: snapshot.val() });
      });

      resourceRef.on('child_removed', snapshot => {
        store.dispatch('REMOVE_RESOURCE', { resource: snapshot.val() });
      });
    },
    beforeDestroy() {
      resourceRef.off();
    },
    components: {
      AddResource,
      ResourceList,
      ResourceFilter,
      AuthGuard,
    },
  };
</script>