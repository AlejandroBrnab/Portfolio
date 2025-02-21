<template>
  <div class="container">
    <h1>{{ t('technologies.add_technology') }}</h1>
    <form @submit.prevent="addTechnology">
      <div>
        <label for="name">{{ t('technologies.name') }}:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div>
        <label for="icon">{{ t('technologies.icon') }}:</label>
        <input type="file" @change="handleIconUpload" id="icon" required />
      </div>
      <button type="submit">{{ editing ? t('technologies.update_technology') : t('technologies.add_technology') }}</button>
    </form>

    <h2>{{ t('technologies.technologies') }}</h2>
    <ul>
      <li v-for="tech in technologies" :key="tech._id">
        <strong>{{ tech.name }}</strong>
        <img :src="tech.icon" alt="Technology Icon" v-if="tech.icon" />
        <button @click="editTechnology(tech)">{{ t('technologies.edit') }}</button>
        <button @click="deleteTechnology(tech.slug)">{{ t('technologies.delete') }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { t } = useI18n();
const name = ref('');
const icon = ref<string | null>(null);
const technologies = ref<{ _id: string; name: string; slug: string; icon: string }[]>([]);
const editing = ref(false);
const currentTechnologySlug = ref<string | null>(null);

// Fetch technologies from the backend
const fetchTechnologies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/technologies/admin`);
    technologies.value = response.data;
  } catch (error) {
    console.error('Error fetching technologies:', error);
  }
};

// Handle icon upload and convert to base64
const handleIconUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      icon.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Add or update a technology
const addTechnology = async () => {
  try {
    const technologyData = {
      name: name.value,
      icon: icon.value,
    };

    if (editing.value && currentTechnologySlug.value) {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/technologies/${currentTechnologySlug.value}`, technologyData);
      alert('Technology updated successfully');
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/technologies`, technologyData);
      alert('Technology added successfully');
    }

    // Reset form
    name.value = '';
    icon.value = null;
    editing.value = false;
    currentTechnologySlug.value = null;
    fetchTechnologies();
  } catch (error) {
    console.error('Error adding/updating technology:', error);
    alert('Error adding/updating technology');
  }
};

// Edit a technology (Pre-fill form)
const editTechnology = (tech: { _id: string; name: string; slug: string; icon: string }) => {
  name.value = tech.name;
  icon.value = tech.icon;
  currentTechnologySlug.value = tech.slug;
  editing.value = true;
};

// Delete a technology
const deleteTechnology = async (slug: string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/technologies/${slug}`);
    alert('Technology deleted successfully');
    fetchTechnologies();
  } catch (error) {
    console.error('Error deleting technology:', error);
    alert('Error deleting technology');
  }
};

onMounted(fetchTechnologies);
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

h2 {
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

input[type="text"], input[type="file"] {
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

input:focus {
  border-color: #1098F7;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
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

/* Technologies List */
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

li img {
  max-width: 100%; /* Prevents image from exceeding the card width */
  max-height: 200px; /* Limits the image height */
  object-fit: cover; /* Maintains aspect ratio and fills the space */
  border-radius: 8px; /* Optional: rounds the corners for a cleaner look */
  display: block;
  margin: 0 auto; /* Centers the image */
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
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

  input {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
    padding: 10px 20px;
  }
}
</style>