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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cyberpunk-about {
  background-color: #121212;
  color: #fff;
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
  z-index: 1;
  position: relative;
  padding: 40px;
  border: 2px solid rgba(0, 255, 255, 0.7); 
  border-radius: 12px;
}

h2 {
  font-size: 3rem;
  color: #00ffcc; 
  text-shadow: 0 0 8px #00ffcc, 0 0 12px #00ffcc, 0 0 16px #00ffcc;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #e60073;
  text-shadow: 0 0 5px #e60073, 0 0 10px #e60073, 0 0 15px #e60073;
}

button {
  padding: 12px 25px;
  background-color: #00ffcc;
  color: #121212;
  border: 2px solid #00ffcc;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc;
}

button:hover {
  background-color: transparent;
  color: #00ffcc;
  box-shadow: 0 0 20px #00ffcc;
}

.cyberpunk-about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: particles 1.5s infinite linear;
  z-index: 0;
}

@keyframes particles {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 100%);
  }
}

/* Responsiveness */
@media (max-width: 1200px) {
  .container {
    padding: 30px;
  }

  h2 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.1rem;
  }

  button {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}

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
    max-width: 90%;
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