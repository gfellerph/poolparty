<template lang="pug">
  div
    auth-guard
      div(slot="auth")
        add-resource
        add-skill
        add-pool
        active-pool
        hr
        resource-filter
        resource-list
</template>

<script>
  import AddResource from 'components/resources/add-resource';
  import AddSkill from 'components/skills/add-skill';
  import ResourceFilter from 'components/resources/resource-filter';
  import ResourceList from 'components/resources/resource-list';
  import AuthGuard from 'components/auth/auth-guard';
  import AddPool from 'components/pools/add-pool';
  import ActivePool from 'components/resources/active-pool';

  export default {
    name: 'resource-pool',

    components: {
      AddResource,
      ResourceList,
      ResourceFilter,
      AuthGuard,
      AddSkill,
      AddPool,
      ActivePool,
    },
  };
</script>
