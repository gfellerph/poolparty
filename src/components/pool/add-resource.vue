<template lang="pug">
  form
    p
      label Name
      input(
        v-model="resource.name"
      )

    p
      label Website
      input(
        v-model="resource.website"
      )

    p
      label Location
      input(
        v-model="resource.location"
      )

    p
      label Add skill
      input(
        v-model="resource.newSkill.name"
        @keyup.enter="addSkill"
      )
      button(@click="addSkill") Add skill

    ul
      li(v-for="skill in skills")
        label(@click="toggleSkill")
          input(
            type="checkbox"
          )
          span {{skill.name}}
    p {{resource.selectedSkills | json}}
    p
      button Cancel
      button(@click.prevent="save") Save
</template>

<script>
  import Skill from 'models/skill';
  import Resource from 'models/resource';

  export default {
    name: 'add-resource',

    data() {
      return { resource: new Resource() };
    },

    computed: {
      selectableSkills() {
        return this.skills;
      },

      selectedSkills() {
        return this.selectableSkills.filter(skill => skill.checked);
      },
    },

    methods: {
      save() {
        this.resource.set()
          .catch(err => {
            throw err;
          });
        this.resource = new Resource();
      },

      toggleSkill(e, o) {
        this.blah = o;
        this.bla2 = e;
        debugger;
      },

      addSkill() {
        if (!this.resource.newSkill.name) return;
        this.resource.newSkill.set();
        this.resource.newSkill = new Skill();
      },
    },

    vuex: {
      getters: {
        user: state => state.auth.user,
        skills: state => state.pool.skills,
      },
    },
  };
</script>