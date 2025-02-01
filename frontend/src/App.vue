<template>
  <div id="app">
    <NavbarComponent />
    <AboutMeComponent />
    <ProjectsComponent />
    <TestimonialsComponent />
    <ContactMeComponent />
    <ResumeComponent />
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import NavbarComponent from './components/NavbarComponent.vue'
import AboutMeComponent from './components/AboutMeComponent.vue'
import ProjectsComponent from './components/ProjectsComponent.vue'
import ContactMeComponent from './components/ContactMeComponent.vue'
import TestimonialsComponent from './components/TestimonialsComponent.vue'
import ResumeComponent from './components/ResumeComponent.vue'

export default {
  components: {
    NavbarComponent,
    AboutMeComponent,
    ProjectsComponent,
    ContactMeComponent,
    TestimonialsComponent,
    ResumeComponent
  },
  setup() {
    const { locale } = useI18n();

    // Method to switch language
    const switchLanguage = () => {
      locale.value = locale.value === 'en' ? 'fr' : 'en';  
    }

    return {
      switchLanguage
    }
  }
}
</script>

<style scoped>
section {
  padding: 2rem;
  margin: 1rem 0;
}
</style>
