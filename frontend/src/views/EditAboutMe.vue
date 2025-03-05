<template>
    <div class="container">
      <h1>{{ t('about.aboutme') }}</h1>
      <div v-for="(desc, lang) in descriptions" :key="lang" class="description-section">
        <label :for="`description-${lang}`">{{ t(`languages.${lang}`) }}</label>
        <textarea :id="`description-${lang}`" v-model="descriptions[lang]" class="description-textarea"></textarea>
      </div>
      <button @click="updateAboutMe" class="update-button">{{ t('about.update_button') }}</button>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { useAuthStore } from '@/stores/roles';

const { t, locale } = useI18n();
const descriptions = ref<{ [key: string]: string }>({ en: '', fr: '' });
const { getToken } = useAuthStore();

const fetchAboutMe = async () => {
  try {
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/about/admin`, { headers });
    console.log("Fetched About Me:", response.data); // Log to inspect the response
    descriptions.value = response.data?.description || { en: '', fr: '' };
  } catch (error) {
    console.error('Error fetching about me:', error);
  }
};


const updateAboutMe = async () => {
  try {
    const token = getToken();
    const headers = { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Explicitly set content type
    };
    await axios.put(`${import.meta.env.VITE_API_URL}/api/about/`, { descriptions: descriptions.value }, { headers });
    alert('About Me updated successfully');
  } catch (error) {
    console.error('Error updating about me:', error);
    alert('Error updating about me');
  }
};

onMounted(fetchAboutMe);

watch(locale, fetchAboutMe);
</script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(8px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
    margin-top: 120px;
  }
  
  h1 {
    font-size: 2rem;
    color: #1098F7;
    font-weight: 600;
    text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
    margin-bottom: 20px;
    text-align: center;
  }
  
  .description-section {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 1rem;
    font-weight: bold;
    color: #8EA4D2;
    display: block;
    margin-bottom: 5px;
  }
  
  .description-textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    outline: none;
    transition: border 0.3s ease, box-shadow 0.3s ease;
  }
  
  .description-textarea:focus {
    border-color: #1098F7;
    box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  }
  
  .update-button {
    display: block;
    width: 100%;
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
    text-align: center;
  }
  
  .update-button:hover {
    transform: translateY(-3px) scale(1.05);
    background: linear-gradient(90deg, #0D7AC4, #3D7F5A);
  }
  
  .update-button:active {
    transform: translateY(1px);
  }
  </style>