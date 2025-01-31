<template>
  <div class="main-container">
    <div class="project-card" v-for="(project, index) in projectData" :key="index">
      <h3>{{ project.Title }}</h3>
      <p>{{ project.About }}</p>

      <div class="links">
        <a :href="project.Link1" target="_blank">
          <img src="../assets/images/github_borderless.png" alt="GitHub">
        </a>
        <a :href="project.Link2" target="_blank">
          <img src="../assets/images/external_link.png" alt="External link">
        </a>
      </div>
    </div>
  </div>
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
.main-container {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.project-card {
  margin: 10px;
  padding: 10px;
  flex-wrap: 0 0 40%;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.links img {
  height: 1.5rem;
  margin: 5px;
}
</style>
