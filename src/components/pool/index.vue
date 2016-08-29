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
  import { index } from 'components/pool/resource-index';

  let resourceRef;

  export default {
    name: 'resource-pool',
    created() {
      resourceRef = firebase
        .database()
        .ref('/resources');

      resourceRef.on('child_added', snapshot => {
        store.dispatch('ADD_RESOURCE', { resource: snapshot.val() });
        const res = snapshot.val();
        const filtered = store.state.pool.skills.filter(skill => res.skills.indexOf(skill.id) >= 0);
        res.joinedSkills = filtered.map(skill => skill.name).join(' ');
        index.addDoc(res);
        index.addDoc(snapshot.val());
      });

      resourceRef.on('child_changed', snapshot => {
        store.dispatch('UPDATE_RESOURCE', { resource: snapshot.val() });
        index.removeDoc(snapshot.val());
        const res = snapshot.val();
        const filtered = store.state.pool.skills.filter(skill => res.skills.indexOf(skill.id) >= 0);
        res.joinedSkills = filtered.map(skill => skill.name).join(' ');
        index.addDoc(res);
      });

      resourceRef.on('child_removed', snapshot => {
        store.dispatch('REMOVE_RESOURCE', { resource: snapshot.val() });
        index.removeDoc(snapshot.val());
      });

      const skillRef = firebase
        .database()
        .ref('/skills');

      skillRef.on('child_added', snapshot => {
        store.dispatch('ADD_SKILL', { skill: snapshot.val() });
      });

      skillRef.on('child_changed', snapshot => {
        store.dispatch('UPDATE_SKILL', { skill: snapshot.val() });
      });

      skillRef.on('child_removed', snapshot => {
        store.dispatch('REMOVE_SKILL', { skill: snapshot.val() });
      });
    },
    beforeDestroy() {
      store.dispatch('CLEAR_RESOURCES');
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