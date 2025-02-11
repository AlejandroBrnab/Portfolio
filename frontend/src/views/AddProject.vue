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
        <div>
          <label for="slug">Slug:</label>
          <input type="text" v-model="slug" id="slug" required />
        </div>
        <button type="submit">{{ editing.value ? "Update Project" : "Add Project" }}</button>
      </form>
  
      <h2>Projects</h2>
      <ul>
        <li v-for="project in projects" :key="project._id">
          <strong>{{ project.title }}</strong> - {{ project.about }}
          <a :href="project.link" target="_blank">View</a>
          <button @click="editProject(project)">Edit</button>
          <button @click="deleteProject(project.slug)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/roles';
  
  export default defineComponent({
    name: 'AddProject',
    setup() {
      const title = ref('');
      const description = ref('');
      const link = ref('');
      const slug = ref('');
      const projects = ref<{ _id: string; title: string; about: string; link: string; slug: string }[]>([]);
      const editing = ref(false);
      const currentProjectSlug = ref<string | null>(null);
      const { getToken } = useAuthStore();
  
      // Fetch projects from the backend
      const fetchProjects = async () => {
        try {
          const token = getToken();
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get('http://localhost:31415/api/projects/admin', { headers });
          projects.value = response.data;
        } catch (error) {
          console.error('Failed to fetch projects', error);
        }
      };
  
      // Add or update a project
      const addProject = async () => {
        try {
          const token = getToken();
          const headers = { Authorization: `Bearer ${token}` };
  
          if (editing.value && currentProjectSlug.value) {
            // Update existing project
            await axios.put(
              `http://localhost:31415/api/projects/${currentProjectSlug.value}`,
              {
                title: title.value,
                about: description.value,
                link: link.value,
                slug: slug.value,
              },
              { headers }
            );
            alert('Project updated successfully');
          } else {
            // Add new project
            await axios.post(
              'http://localhost:31415/api/projects',
              {
                title: title.value,
                about: description.value,
                link: link.value,
                slug: slug.value,
              },
              { headers }
            );
            alert('Project added successfully');
          }
  
          // Reset form
          title.value = '';
          description.value = '';
          link.value = '';
          slug.value = '';
          editing.value = false;
          currentProjectSlug.value = null;
          fetchProjects();
        } catch (error) {
          console.error('Failed to save project', error);
          alert('Failed to save project');
        }
      };
  
      // Edit a project (Pre-fill form)
      const editProject = (project: { _id: string; title: string; about: string; link: string; slug: string }) => {
        title.value = project.title;
        description.value = project.about;
        link.value = project.link;
        slug.value = project.slug;
        currentProjectSlug.value = project.slug;
        editing.value = true;
      };
  
      // Delete a project
      const deleteProject = async (slug: string) => {
        try {
          const token = getToken();
          const headers = { Authorization: `Bearer ${token}` };
  
          await axios.delete(`http://localhost:31415/api/projects/${slug}`, { headers });
          alert('Project deleted successfully');
          fetchProjects();
        } catch (error) {
          console.error('Failed to delete project', error);
          alert('Failed to delete project');
        }
      };
  
      onMounted(fetchProjects);
  
      return { title, description, link, slug, projects, editing, currentProjectSlug, addProject, editProject, deleteProject };
    },
  });
  </script>
  
  <style scoped>
  /* .container {
    text-align: center;
    max-width: 800px;
    z-index: 1;
    position: relative;
    padding: 40px;
    margin-top: 110px;
    border: 2px solid rgba(0, 255, 255, 0.7);
    border-radius: 12px;
  } */
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    text-align: center;
    max-width: 800px;
    padding: 40px;
    margin: 100px auto 0;
    border-radius: 12px;
    background: #ffffff; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    font-size: 2rem;
    color: #49516F;
    margin-bottom: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  label {
    font-size: 1rem;
    font-weight: bold;
    color: #6279B8;
  }
  
  input, textarea {
    width: 100%;
    max-width: 500px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border 0.3s ease;
  }
  
  input:focus, textarea:focus {
    border-color: #4C9F70;
  }
  
  textarea {
    resize: none;
    height: 100px;
  }
  
  button {
    padding: 12px 25px;
    background-color: #4C9F70;
    color: #fff;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }
  
  button:hover {
    background-color: #496F5D; 
    transform: translateY(-3px);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }
  
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: 10px auto;
  }
  
  a {
    color: #6279B8; 
    text-decoration: none;
    font-weight: bold;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 20px;
      max-width: 90%;
    }
  
    h1, h2 {
      font-size: 1.5rem;
    }
  
    input, textarea {
      font-size: 0.9rem;
    }
  
    button {
      font-size: 0.9rem;
      padding: 8px 15px;
    }
  } 
  
  </style>