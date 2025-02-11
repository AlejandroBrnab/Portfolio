<template>
  <section id="about" class="cyberpunk-about">
      <div class="container">
      <h2>{{ t('about.title') }}</h2>
      <p>{{ t('about.description') }}</p>
      &nbsp;
      <h2>{{ t('about.skills_title') }}</h2>
      <p>{{ t('about.skills_description') }}</p>
    </div>
  </section>
</template>
  
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
  
<style scoped>
/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cyberpunk-about {
  background-color: #f8f9fa; /* Light neutral background */
  color: #333; /* Dark gray for contrast */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-top: 70px;
}

.container {
  text-align: center;
  max-width: 800px;
  padding: 40px;
  border-radius: 12px;
  background: #ffffff; /* White card */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

h2 {
  font-size: 2.5rem;
  color: #49516F; /* Dark blue-gray */
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #6279B8; /* Muted blue */
}

/* Button Styling */
button {
  padding: 12px 25px;
  background-color: #4C9F70; /* Green accent */
  color: #fff;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #496F5D; /* Darker green */
  transform: translateY(-3px);
}

/* Responsive Styling */
@media (max-width: 768px) {
  .cyberpunk-about {
    height: auto;
    margin-top: 50px;
    padding: 20px;
  }

  .container {
    padding: 20px;
    max-width: 90%;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
}
</style>
