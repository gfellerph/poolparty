<template lang="pug">
  form
    h3 NEW SKILL
    p
      label Add skill
      input(
        v-model="skill.name"
      )
      button(
        @click.prevent="saveSkill"
      ) Add skill
</template>

<script>
  import Skill from 'models/skill';

  export default {
    data() {
      return {
        skill: new Skill(),
      };
    },

    methods: {
      saveSkill() {
        this.skill.set()
          .catch(err => { throw err; });

        this.skill = new Skill();
      },
    },
  };
</script>
