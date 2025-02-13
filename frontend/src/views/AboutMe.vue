<template>
  <section id="about" class="modern-about">
    <div class="content-box">
      <h2 class="title">{{ t('about.title') }}</h2>
      <p class="description">{{ t('about.description') }}</p>
      <div class="divider"></div>
      <h2 class="title">{{ t('about.skills_title') }}</h2>
      <p class="description">{{ t('about.skills_description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
/* General Styling */
.modern-about {
  background: #000000; /* Black background */
  color: #FFFFFF; /* White text */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
}

/* Content Box */
.content-box {
  background: rgba(255, 255, 255, 0.1); /* Transparent white for a glass effect */
  padding: 40px;
  border-radius: 12px;
  backdrop-filter: blur(8px); /* Blur effect for a modern look */
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7); /* Neon blue glow */
  max-width: 800px;
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.content-box:hover {
  transform: scale(1.02);
}

/* Title */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #1098F7; /* Neon blue */
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 20px;
}

/* Description */
.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #FFFFFF;
  opacity: 0.9;
  animation: fadeIn 2s ease-in-out;
  text-align: justify; /* Justify the text */
}

/* Divider */
.divider {
  width: 60px;
  height: 4px;
  background: #1098F7;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 1);
}

/* Fade-in Animation */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .content-box {
    padding: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
    text-align: justify; /* Ensure justification on smaller screens too */
  }
}
</style>
