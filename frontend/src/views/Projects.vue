<template>
    <section id="projects" class="section">
      <h2>{{ t('projects.title') }}</h2>
      <div class="main-container">
        <div class="project-card" v-for="(project, index) in projectData" :key="index">
          <h3>{{ project.Title }}</h3>
          <p>{{ project.About }}</p>
          <div class="links">
            <a :href="project.Link" target="_blank" class="link-icon">
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
    const response = await axios.get('http://127.0.0.1:5000/api/projects');
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
  padding: 3rem;
  margin: 3rem 0;
  background: #121212;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 255, 204, 0.1);
}

h2 {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #00ffcc;
  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;
}

.main-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: #1f1f1f;
  color: #fff;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 255, 204, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 255, 204, 0.4);
}

.project-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.project-card:hover img {
  transform: scale(1.05);
}

.project-card h3 {
  font-size: 1.8rem;
  margin: 1rem 0;
  color: #ff0066;
  text-shadow: 0 0 5px #ff0066, 0 0 15px #ff0066;
}

.project-card p {
  font-size: 1rem;
  color: #f0f0f0;
  margin-bottom: 1rem;
}

.links {
  margin-top: 1rem;
}

.link-icon {
  display: inline-block;
  padding: 5px;
  border-radius: 50%;
  background-color: #1f1f1f;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.link-icon img {
  width: 25px; /* Set a specific width for the icon image */
  height: 25px; /* Set a specific height for the icon image */
  object-fit: contain; /* Ensures the icon does not stretch */
  transition: transform 0.3s ease, filter 0.3s ease;
}

.link-icon:hover img {
  transform: scale(1.2);
  filter: brightness(1.2);
}

.project-card::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100%;
  height: 100%;
  border: 2px solid #ff0066;
  z-index: -1;
  animation: pulseBorder 2s infinite ease-in-out;
}

@keyframes pulseBorder {
  0% {
    box-shadow: 0 0 10px #ff0066, 0 0 20px #ff0066, 0 0 30px #ff0066;
  }
  50% {
    box-shadow: 0 0 20px #00ffcc, 0 0 40px #00ffcc, 0 0 60px #00ffcc;
  }
  100% {
    box-shadow: 0 0 10px #ff0066, 0 0 20px #ff0066, 0 0 30px #ff0066;
  }
}
</style>