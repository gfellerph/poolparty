<template lang="pug">
  div
    auth-guard
      div(slot="auth")
        add-resource
        add-skill
        add-pool
        hr
        resource-filter
        resource-list
</template>

<script>
  import firebase from 'config/firebase';
  import store from 'config/store';
  import AddResource from 'components/resources/add-resource';
  import AddSkill from 'components/skills/add-skill';
  import ResourceFilter from 'components/resources/resource-filter';
  import ResourceList from 'components/resources/resource-list';
  import AuthGuard from 'components/auth/auth-guard';
  import AddPool from 'components/pools/add-pool';
  // import { index } from 'components/resources/resource-index';

  let resourceRef;
  let skillRef;

  export default {
    name: 'resource-pool',
    created() {
      resourceRef = firebase
        .database()
        .ref('/resources');

      skillRef = firebase
        .database()
        .ref('/skills');

      resourceRef.on('child_added', snapshot => {
        store.dispatch('ADD_RESOURCE', { resource: snapshot.val() });
      });

      resourceRef.on('child_changed', snapshot => {
        store.dispatch('UPDATE_RESOURCE', { resource: snapshot.val() });
      });

      resourceRef.on('child_removed', snapshot => {
        store.dispatch('REMOVE_RESOURCE', { resource: snapshot.val() });
      });

      skillRef.on('child_added', snapshot => {
        store.dispatch('SET_SKILL', { skill: snapshot.val() });
      });

      skillRef.on('child_changed', snapshot => {
        store.dispatch('SET_SKILL', { skill: snapshot.val() });
      });

      skillRef.on('child_removed', snapshot => {
        store.dispatch('REMOVE_SKILL', { skill: snapshot.val() });
      });
    },
    beforeDestroy() {
      store.dispatch('CLEAR_RESOURCES');
      store.dispatch('CLEAR_SKILLS');
      resourceRef.off();
      skillRef.off();
    },
    components: {
      AddResource,
      ResourceList,
      ResourceFilter,
      AuthGuard,
      AddSkill,
      AddPool,
    },
  };
</script>
