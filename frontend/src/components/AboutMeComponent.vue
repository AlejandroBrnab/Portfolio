<template>
  <section id="about" class="cyberpunk-about">
    <div class="container">
      <h2>About Me</h2>
      <p>I'm a developer passionate about technology and design, with a special interest in cybersecurity and AI.</p>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AboutMeComponent',
}
</script>

<style scoped>
/* Basic reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Cyberpunk Background and Styling */
.cyberpunk-about {
  background-color: #121212; /* Dark background */
  color: #fff; /* Light text color for readability */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Container for content */
.container {
  text-align: center;
  max-width: 800px;
  z-index: 1;
  position: relative;
  padding: 40px;
  border: 2px solid rgba(0, 255, 255, 0.7); /* Neon border */
  border-radius: 12px;
}

/* Heading with a neon effect */
h2 {
  font-size: 3rem;
  color: #00ffcc; /* Neon teal */
  text-shadow: 0 0 8px #00ffcc, 0 0 12px #00ffcc, 0 0 16px #00ffcc;
  margin-bottom: 20px;
}

/* Text with glowing effect */
p {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #e60073; /* Neon pink */
  text-shadow: 0 0 5px #e60073, 0 0 10px #e60073, 0 0 15px #e60073;
}

/* Neon button */
button {
  padding: 12px 25px;
  background-color: #00ffcc; /* Neon teal */
  color: #121212;
  border: 2px solid #00ffcc;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px #00ffcc, 0 0 10px #00ffcc;
}

/* Hover effect for button */
button:hover {
  background-color: transparent;
  color: #00ffcc;
  box-shadow: 0 0 20px #00ffcc;
}

/* Glowing particles background (optional futuristic touch) */
.cyberpunk-about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2018/06/19/00/48/matrix-3480811_960_720.png') repeat;
  animation: particles 1.5s infinite linear;
  z-index: 0;
}

@keyframes particles {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 100%);
  }
}
</style>
