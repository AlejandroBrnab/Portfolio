<template>
    <section id="cv" class="cv-section">
      <h2>My CV</h2>
      <p>Click below to download my CV and learn more about my professional background.</p>
      <a :href="cvLink" download class="download-btn">
        <button>Download CV</button>
      </a>
    </section>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        cvLink: '../assets/CV_Alejandro_Bernabe.pdf', // Update the path to your CV file
      };
    },
  };
  </script>
  
  <style scoped>
  .cv-section {
    padding: 2rem;
    background: var(--tertiary-color);
    color: var(--text-color);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    font-size: 2.5rem;
    color: var(--accent-color);
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .download-btn {
    text-decoration: none;
  }
  
  .download-btn button {
    background-color: var(--secondary-color);
    color: white;
    font-size: 1.1rem;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .download-btn button:hover {
    background-color: var(--tertiary-color);
  }
  </style>
  