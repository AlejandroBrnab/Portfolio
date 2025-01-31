<template>
  <nav class="navbar">
    <ul>
      <li><a href="#about" class="nav-link">About Me</a></li>
      <li><a href="#projects" class="nav-link">My Projects</a></li>
      <li><a href="#testimonials" class="nav-link">Testimonials</a></li>
      <li><a href="#contact" class="nav-link">Contact Me</a></li>
      <li><a href="#resume" class="nav-link">CV</a></li>
      <li><a href="#login" class="nav-link">Log In</a></li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  mounted() {
    // Optional: Add smooth scrolling to anchor links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        if (targetElement) {
          // Scroll to the target element smoothly
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};
</script>

<style scoped>
/* Cyberpunk Navbar Styling */
.navbar {
  background-color: #121212;  /* Dark background for a cyberpunk look */
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.navbar li {
  font-size: 18px;
}

.navbar .nav-link {
  text-decoration: none;
  color: #fff;
  position: relative;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;
  text-shadow: 0 0 5px #ff0066, 0 0 10px #ff0066, 0 0 20px #ff0066;  /* Neon glow effect */
}

/* Hover effect - neon color change and glowing text */
.navbar .nav-link:hover {
  color: #00ffcc;  /* Neon teal */
  transform: scale(1.1); /* Slightly enlarge the text */
  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;
}

/* Underline effect on hover */
.navbar .nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #00ffcc;  /* Neon teal underline */
  transition: width 0.3s ease;
}

.navbar .nav-link:hover::after {
  width: 100%;  /* Underline grows on hover */
}

/* Add a glowing border around navbar */
.navbar {
  border-bottom: 3px solid #ff0066; /* Neon pink */
  box-shadow: 0 0 10px #ff0066, 0 0 20px #ff0066;
}

/* Optional: Add a glowing animated background to make the navbar more dynamic */
.navbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://cdn.pixabay.com/photo/2016/09/13/14/26/abstract-1677734_960_720.jpg') repeat;
  opacity: 0.2;
  z-index: -1;
  animation: glowAnimation 2s infinite linear;
}

@keyframes glowAnimation {
  0% {
    background-color: rgba(255, 0, 102, 0.1);
  }
  50% {
    background-color: rgba(0, 255, 204, 0.1);
  }
  100% {
    background-color: rgba(255, 0, 102, 0.1);
  }
}
</style>
