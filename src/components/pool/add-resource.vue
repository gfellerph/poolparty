<template lang="pug">
  form
    p
      label Name
      input(
        v-model="name"
      )

    p
      label Website
      input(
        v-model="website"
      )

    p
      label Location
      input(
        v-model="location"
      )

    p
      label Add skill
      input(
        v-model="newSkill.name"
        @keyup.enter="addSkill"
      )
      button(@click="addSkill") Add skill

    ul
      li(v-for="skill in selectableSkills")
        label
          input(
            type="checkbox"
            v-model="skill.checked"
          )
          span {{skill.name}}
    p {{selectedSkills | json}}
    p
      button Cancel
      button(@click="save") Save
</template>

<script>
  import firebase from 'config/firebase';
  import Skill from 'models/skill';

  const defaultResource = {
    name: '',
    website: '',
    location: '',
    newSkill: new Skill(),
    chosenSkills: [],
  };

  export default {
    name: 'add-resource',

    data() {
      return Object.assign({}, defaultResource);
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
        const newResourceRef = firebase
          .database()
          .ref('/resources')
          .push();

        // Merge with key
        const newResource = Object.assign({
          key: newResourceRef.key,
        }, this.$data);

        newResourceRef.set(newResource);

        this.$data = Object.assign({}, defaultResource);
      },

      addSkill() {
        if (!this.newSkill.name) return;
        this.newSkill.push();
        this.newSkill = new Skill();
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