<template>
  <section id="resume" class="cv-section">
    <h2>My CV</h2>
    <p>Click below to download my CV and learn more about my professional background.</p>
    <a :href="cvLink" download="CV_AlejandroBernabe_EN.pdf" class="download-btn">
      <button>Download CV</button>
    </a>
  </section>
</template>

<script lang="ts">
export default {
  data() {
    return {
      cvLink: '/CV_AlejandroBernabe_EN.pdf' // Reference the file in public folder
    };
  },
};
</script>

<style scoped>
/* Cyberpunk Resume Section */
.cv-section {
  padding: 3rem;
  background: #212121; /* Dark, almost black background */
  color: #fff; /* Light text for contrast */
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 255, 204, 0.4); /* Neon glowing shadow */
  text-align: center;
  position: relative;
}

.cv-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #ff0066, #00ffcc, #ff0066);
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;
  border-radius: 15px;
  z-index: -1;
}

/* Glowing Gradient Animation */
@keyframes gradientAnimation {
  0% {
    background-position: 400% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 400% 0%;
  }
}

h2 {
  font-size: 3rem;
  color: #00ffcc;  /* Neon teal */
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc, 0 0 45px #00ffcc; /* Glowing effect */
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #b0b0b0;  /* Subtle light gray */
}

.download-btn {
  text-decoration: none;
}

.download-btn button {
  background-color: #ff0066; /* Neon pink */
  color: #fff;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 0, 102, 0.5); /* Neon glow */
  transition: background-color 0.3s, box-shadow 0.3s;
}

.download-btn button:hover {
  background-color: #ff3385; /* Lighten the neon pink */
  box-shadow: 0 4px 20px rgba(255, 0, 102, 0.7); /* Stronger glow on hover */
}

.download-btn button:active {
  transform: translateY(2px); /* Slight push effect on click */
}

/* Responsive styling */
@media (max-width: 600px) {
  .cv-section {
    padding: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .download-btn button {
    padding: 0.8rem 2rem;
  }
}
</style>
