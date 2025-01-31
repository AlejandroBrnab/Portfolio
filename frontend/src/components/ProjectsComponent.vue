<template>
  <section id="projects" class="section">
    <h2>My Projects</h2>
    <div class="main-container">
      <div class="project-card" v-for="(project, index) in projectData" :key="index">
        <img :src="project.image" alt="Project Image" class="project-image" />
        <h3>{{ project.Title }}</h3>
        <p>{{ project.About }}</p>

        <div class="links">
          <a :href="project.Link1" target="_blank" class="link-icon">
            <img src="../assets/icons/github.png" alt="GitHub">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      projectData: [] as Array<any>, // Initialize as an empty array
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/projects'); // Backend URL
        this.projectData = response.data; // Set the fetched data
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    },
  },
};
</script>

<style scoped>
.section {
  padding: 2rem;
  margin: 1rem 0;
  background: var(--tertiary-color);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
}

.main-container {
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.project-card {
  background-color: var(--secondary-color);
  color: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.project-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.4rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
}

.links {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.link-icon img {
  height: 24px;
  transition: transform 0.2s;
}

.link-icon:hover img {
  transform: scale(1.1);
}
</style>
