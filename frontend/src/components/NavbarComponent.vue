<template>
    <nav class="navbar">
      <div class="logo">
        <h1>My Portfolio</h1>
      </div>
      <ul class="nav-links">
        <li><a href="#about-me">About Me</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact Me</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#testimonials">CV</a></li>
        <li><a href="#testimonials">Log In</a></li>
      </ul>
    </nav>
  </template>
  
  <script lang="ts">
  export default {
    name: 'NavbarComponent',
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: var(--secondary-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: #fff;
  }
  
  .logo h1 {
    font-size: 2rem;
    margin: 0;
    color: var(--accent-color);
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
  }
  
  .nav-links li {
    font-size: 1.1rem;
  }
  
  .nav-links a {
    text-decoration: none;
    color: #fff;
    transition: color 0.3s;
  }
  
  .nav-links a:hover {
    color: var(--tertiary-color);
  }
  </style>
  