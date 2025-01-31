<template>

  <NavbarComponent />
  <AboutComponent />
  <ProjectsComponent />
  <TestimonialsComponent />
  <ContactMeComponent />
  <ResumeComponent />
  
</template>

<script lang="ts">

import ProjectsComponent from './components/ProjectsComponent.vue'
import AboutComponent from './components/AboutMeComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';
import ContactMeComponent from './components/ContactMeComponent.vue';
import TestimonialsComponent from './components/TestimonialsComponent.vue';
import ResumeComponent from './components/ResumeComponent.vue';

export default {
name: 'App',
components: {
  NavbarComponent,
  AboutComponent,
  ProjectsComponent,
  TestimonialsComponent,
  ContactMeComponent,
  ResumeComponent
}
}

</script>

<style scoped>

</style>
