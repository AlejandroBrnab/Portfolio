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
    const response = await axios.get('http://localhost:31415/api/projects/');
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
  padding: 2.5rem;
  margin: 3rem auto;
  background: #F8F9FA;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 900px;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.main-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: #fff;
  color: #333;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.project-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.project-card p {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.links {
  margin-top: 1rem;
}

.link-icon {
  display: inline-block;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.link-icon img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.link-icon:hover img {
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 600px) {
  .section {
    padding: 2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  .project-card h3 {
    font-size: 1.2rem;
  }

  .project-card p {
    font-size: 0.9rem;
  }
}
</style>
