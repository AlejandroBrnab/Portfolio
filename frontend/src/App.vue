<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
</script>

<style scoped>
section {
  padding: 2rem;
  margin: 1rem 0;
}
</style>