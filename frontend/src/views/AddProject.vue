<template>
  <div class="container">
    <h1>{{ t('projects.add_project') }}</h1>
    <form @submit.prevent="addProject">
      <div>
        <label for="title">{{ t('projects.name') }}:</label>
        <input type="text" v-model="title" id="title" required />
      </div>
      <div>
        <label for="description">{{ t('projects.description') }}:</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div>
        <label for="link">{{ t('projects.link') }}:</label>
        <input type="url" v-model="link" id="link" required />
      </div>
      <!-- <div>
        <label for="slug">{{ t('projects.slug') }}:</label>
        <input type="text" v-model="slug" id="slug" required />
      </div> -->
      <button type="submit">{{ editing ? t('projects.update_project') : t('projects.add_project') }}</button>
    </form>

    <h2>{{ t('projects.projects') }}</h2>
    <ul>
      <li v-for="project in projects" :key="project._id">
        <strong>{{ project.title }}</strong> - {{ project.about }}
        <!-- <a :href="project.link" target="_blank">{{ t('projects.view') }}</a> -->
        <button @click="editProject(project)">{{ t('projects.edit') }}</button>
        <button @click="deleteProject(project.slug)">{{ t('projects.delete') }}</button>
      </li>
    </ul>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useAuthStore } from '@/stores/roles';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'AddProject',
    setup() {
      const { t } = useI18n();
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
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/admin`, { headers });
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
              `${import.meta.env.VITE_API_URL}/api/projects/${currentProjectSlug.value}`,
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
              `${import.meta.env.VITE_API_URL}/api/projects`,
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
  
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${slug}`, { headers });
          alert('Project deleted successfully');
          fetchProjects();
        } catch (error) {
          console.error('Failed to delete project', error);
          alert('Failed to delete project');
        }
      };
  
      onMounted(fetchProjects);
  
      return { title, description, link, slug, projects, editing, currentProjectSlug, addProject, editProject, deleteProject, t };
    },
  });
  </script>
  
<style scoped>
/* General Reset */
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
  margin-top: 130px;
}

h1, h2 {
  font-size: 2rem;
  color: #1098F7;
  font-weight: 600;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 20px;
}

h2{
  margin-top: 40px;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #8EA4D2;
}

input, textarea {
  width: 100%;
  max-width: 500px;
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #1098F7;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

textarea {
  resize: none;
  height: 120px;
}

/* Buttons */
button {
  padding: 12px 25px;
  background: linear-gradient(90deg, #1098F7, #4C9F70);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

button:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(90deg, #0D7AC4, #3D7F5A);
}

button:active {
  transform: translateY(1px);
}

/* Projects List */
ul {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 600px;
  margin: 15px auto;
}

a {
  color: #8EA4D2;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.2s ease;
}

a:hover {
  color: #1098F7;
  transform: translateY(-3px);
  text-decoration: underline;
}

/* Responsive */
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
    padding: 10px 20px;
  }
}
</style>
