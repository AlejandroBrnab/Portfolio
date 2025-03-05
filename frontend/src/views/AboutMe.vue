<template>
  <section id="about" class="modern-about">
    <div class="content-box">
      <h2 class="title">{{ t('about.title') }}</h2>
      <div class="description-container">
        <img src="@/assets/images/yo.jpg" alt="pfp" class="profile-image">
        <p class="description">{{ description }}</p>
      </div>
      <div class="divider"></div>
      <h2 class="title">{{ t('about.skills_title') }}</h2>
      <p class="description">{{ t('about.skills_description') }}</p>
      <div class="divider"></div>
      <h2 class="title">{{ t('about.technology_title') }}</h2>
      <div class="technologies">
        <img v-for="tech in technologies" :key="tech.name" :src="tech.icon" :alt="tech.name" class="tech-image">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { t, locale } = useI18n();

interface Technology {
  name: string;
  icon: string;
}

interface Description {
  en: string;
  fr: string;
}

const technologies = ref<Technology[]>([]);
const description = ref<string>('');

const fetchAboutMe = async () => {
  try {
    const response = await axios.get<{ description: Description }>(`${import.meta.env.VITE_API_URL}/api/about/`);
    description.value = response.data.description[locale.value as keyof Description] || '';
  } catch (error) {
    console.error('Error fetching about me:', error);
  }
};

const fetchTechnologies = async () => {
  try {
    const response = await axios.get<Technology[]>(`${import.meta.env.VITE_API_URL}/api/technologies/`);
    technologies.value = response.data;
  } catch (error) {
    console.error('Error fetching technologies:', error);
  }
};

onMounted(() => {
  fetchAboutMe();
  fetchTechnologies();
});

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
  margin-top: 70px;
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

/* Description Container */
.description-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  text-align: left; /* Align text to the left */
}

.profile-image {
  order: 2; /* Move the image to the right */
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.7); /* Neon blue glow */
  animation: fadeIn 2s ease-in-out;
}

.description {
  flex: 1; /* Make the text take the remaining space */
  font-size: 1.2rem;
  line-height: 1.6;
  color: #FFFFFF;
  opacity: 0.9;
  animation: fadeIn 2s ease-in-out;
  text-align: justify;
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

  .profile-image {
    width: 100px;
    height: 100px;
  }

  .description-container {
    flex-direction: column; /* Stack image and text vertically on smaller screens */
    text-align: center; /* Center text on smaller screens */
  }
}

/* Technologies Section */
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
