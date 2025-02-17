<template>
  <section id="about" class="modern-about">
    <div class="content-box">
      <h2 class="title">{{ t('about.title') }}</h2>
      <div class="description-container">
        <img src="@/assets/images/yo.jpg" alt="pfp" class="profile-image">
        <p class="description">{{ t('about.description') }}</p>
      </div>
      <div class="divider"></div>
      <h2 class="title">{{ t('about.skills_title') }}</h2>
      <p class="description">{{ t('about.skills_description') }}</p>
      <div class="divider"></div>
      <h2 class="title">{{ t('about.technology_title') }}</h2>
      <div class="technologies">
        <img v-for="tech in technologies" :key="tech.name" :src="tech.src" :alt="tech.name" class="tech-image">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const technologies = [
  { name: 'JavaScript', src: new URL('@/assets/images/javascript.png', import.meta.url).href },
  { name: 'Java', src: new URL('@/assets/images/java.png', import.meta.url).href },
  { name: 'Csharp', src: new URL('@/assets/images/csharp.png', import.meta.url).href },
  { name: 'SQL', src: new URL('@/assets/images/sql.png', import.meta.url).href },
  { name: 'Unity', src: new URL('@/assets/images/unity.png', import.meta.url).href },
  { name: 'Php', src: new URL('@/assets/images/php.png', import.meta.url).href },
  { name: 'Spring', src: new URL('@/assets/images/spring.png', import.meta.url).href },
  { name: 'Docker', src: new URL('@/assets/images/docker.png', import.meta.url).href },
];
</script>

<style scoped>
.modern-about {
  background: #000000; 
  color: #FFFFFF; 
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  margin-top: 70px;
}

.content-box {
  background: rgba(255, 255, 255, 0.1); 
  padding: 40px;
  border-radius: 12px;
  backdrop-filter: blur(8px); 
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
  max-width: 800px;
  width: 100%;
  transition: transform 0.3s ease-in-out;
}

.content-box:hover {
  transform: scale(1.02);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #1098F7;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 20px;
}

.description-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  text-align: left; 
}

.profile-image {
  order: 2; 
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.7);
  animation: fadeIn 2s ease-in-out;
}

.description {
  flex: 1; 
  font-size: 1.2rem;
  line-height: 1.6;
  color: #FFFFFF;
  opacity: 0.9;
  animation: fadeIn 2s ease-in-out;
  text-align: justify;
}

.divider {
  width: 60px;
  height: 4px;
  background: #1098F7;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 1);
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .content-box {
    padding: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
    text-align: justify;
  }

  .profile-image {
    width: 100px;
    height: 100px;
  }

  .description-container {
    flex-direction: column;
    text-align: center; 
  }
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.tech-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
  animation: fadeIn 2s ease-in-out;
}

.tech-image:hover {
  transform: scale(1.1);
}
</style>