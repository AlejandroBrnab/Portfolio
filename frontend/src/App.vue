<template>
  <MainCard />
  <ProjectsCard />

</template>

<script lang="ts">

import MainCard from './components/MainCard.vue'
import ProjectsCard from './components/ProjectsCard.vue'

export default {
name: 'App',
components: {
  MainCard,
  ProjectsCard
}
}

</script>

<style scoped>

</style>
