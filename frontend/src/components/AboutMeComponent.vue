<template>
    <section class="about-me">
      <div class="container">
        <h2>About Me</h2>
        <p>I'm a passionate developer skilled in various technologies, with a deep interest in creating meaningful digital experiences.</p>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  export default {
    name: 'AboutMeComponent',
  }
  </script>
  
  <style scoped>
  .about-me {
    background-color: var(--primary-color);
    padding: 40px 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  
  .container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  
  h2 {
    font-size: 2.5rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-top: 20px;
    color: #fff;
  }
  </style>
  