<template>
    <section id="projects" class="section">
      <h2>{{ t('projects.title') }}</h2>
      <div class="main-container">
        <div class="project-card" v-for="(project, index) in projectData" :key="index">
          <h3>{{ project.title }}</h3>
          <p>{{ project.about }}</p>
          <div class="links">
            <a :href="project.link" target="_blank" class="link-icon">
              <img src="../assets/images/github_border.png" alt="GitHub">
            </a>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const projectData = ref<Array<any>>([]);
const { t } = useI18n();
const fetchProjects = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/`);
    projectData.value = response.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
  }
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped>
.section {
  background: #000000; 
  color: #FFFFFF; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  margin-top: 20px;
}

h2 {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #1098F7;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 20px;
}

.main-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
}

.project-card {
  background: rgba(255, 255, 255, 0.1); 
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.project-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 30px rgba(16, 152, 247, 1);
}

.project-card h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1098F7;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 10px;
}

.project-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #FFFFFF;
  opacity: 0.9;
  text-align: justify; 
}

.links {
  margin-top: 10px;
}

.link-icon {
  display: inline-block;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.link-icon img {
  width: 32px;
  height: 32px;
  opacity: 0.8;
  filter: drop-shadow(0px 0px 5px rgba(16, 152, 247, 0.8));
}

.link-icon:hover img {
  opacity: 1;
  transform: scale(1.1);
  filter: drop-shadow(0px 0px 10px rgba(16, 152, 247, 1));
}

@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
  }

  h2 {
    font-size: 2rem;
  }

  .project-card h3 {
    font-size: 1.3rem;
  }

  .project-card p {
    font-size: 1rem;
  }
}
</style>