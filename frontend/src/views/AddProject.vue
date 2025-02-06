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
      <button type="submit">Add Project</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'AddProject',
  setup() {
    const title = ref('');
    const description = ref('');
    const link = ref('');

    const addProject = async () => {
      try {
        await axios.post('http://127.0.0.1:5000/api/projects', {
          Title: title.value,
          About: description.value,
          Link: link.value
        });

        alert('Project added successfully');
        title.value = '';
        description.value = '';
        link.value = '';
      } catch (error) {
        console.error('Failed to add project', error);
        alert('Failed to add project');
      }
    };

    return { title, description, link, addProject };
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