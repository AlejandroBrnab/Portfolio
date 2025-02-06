<template>
  <div class="container">
    <h1>Add Project</h1>
    <form @submit.prevent="addProject">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div>
        <label for="link">Link:</label>
        <input type="url" v-model="link" id="link" required />
      </div>
      <button type="submit">{{ editing.value ? "Update Project" : "Add Project" }}</button>
    </form>

    <h2>Projects</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <strong>{{ project.Title }}</strong> - {{ project.About }}
        <a :href="project.Link" target="_blank">View</a>
        <button @click="editProject(project)">Edit</button>
        <button @click="deleteProject(project._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AddProject",
  setup() {
    const title = ref("");
    const description = ref("");
    const link = ref("");
    const projects = ref<{ _id: string; Title: string; About: string; Link: string }[]>([]);
    const editing = ref(false);
    const currentProjectId = ref<string | null>(null);

    // Fetch projects from the backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/projects");
        projects.value = response.data;
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    // Add or update a project
    const addProject = async () => {
      try {
        if (editing.value && currentProjectId.value) {
          // Update existing project
          await axios.put(`http://127.0.0.1:5000/api/projects/${currentProjectId.value}`, {
            Title: title.value,
            About: description.value,
            Link: link.value
          });
          alert("Project updated successfully");
        } else {
          // Add new project
          await axios.post("http://127.0.0.1:5000/api/projects", {
            Title: title.value,
            About: description.value,
            Link: link.value
          });
          alert("Project added successfully");
        }

        // Reset form
        title.value = "";
        description.value = "";
        link.value = "";
        editing.value = false;
        currentProjectId.value = null;
        fetchProjects();
      } catch (error) {
        console.error("Failed to save project", error);
        alert("Failed to save project");
      }
    };

    // Edit a project (Pre-fill form)
    const editProject = (project: { _id: string; Title: string; About: string; Link: string }) => {
      title.value = project.Title;
      description.value = project.About;
      link.value = project.Link;
      currentProjectId.value = project._id;
      editing.value = true;
    };

    // Delete a project
    const deleteProject = async (id: string) => {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/projects/${id}`);
        alert("Project deleted successfully");
        fetchProjects();
      } catch (error) {
        console.error("Failed to delete project", error);
        alert("Failed to delete project");
      }
    };

    onMounted(fetchProjects);

    return { title, description, link, projects, editing, currentProjectId, addProject, editProject, deleteProject };
  }
});
</script>

<style scoped>
.container {
  text-align: center;
  max-width: 800px;
  z-index: 1;
  position: relative;
  padding: 40px;
  margin-top: 110px;
  border: 2px solid rgba(0, 255, 255, 0.7); 
  border-radius: 12px;
}
</style>