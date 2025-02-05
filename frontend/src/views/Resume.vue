<template>
    <section id="resume" class="cv-section">
      <h2>{{ t("resume.title") }}</h2>
      <p>{{ t("resume.description") }}</p>
      <div class="button-container">
        <a :href="cvLinkEN" download="CV_AlejandroBernabe_EN.pdf" class="download-btn">
          <button>{{t("resume.downloadEN") }}</button>
        </a>
        <a :href="cvLinkFR" download="CV_AlejandroBernabe_FR.pdf" class="download-btn">
          <button>{{ t("resume.downloadFR") }}</button>
        </a>
      </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const cvLinkEN = ref('/CV_AlejandroBernabe_EN.pdf');
const cvLinkFR = ref('/CV_AlejandroBernabe_FR.pdf');
const { t } = useI18n();
</script>

<style scoped>

.cv-section {
  margin: 50px auto;
  padding: 3rem;
  background: #212121; 
  color: #fff; 
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 255, 204, 0.4); 
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
  color: #00ffcc; 
  margin-bottom: 1.5rem;
  text-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc, 0 0 45px #00ffcc;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #b0b0b0; 
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap; 
}

.download-btn {
  text-decoration: none;
}

.download-btn button {
  background-color: #ff0066;
  color: #fff;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 0, 102, 0.5);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.download-btn button:hover {
  background-color: #ff3385; 
  box-shadow: 0 4px 20px rgba(255, 0, 102, 0.7); 
}

.download-btn button:active {
  transform: translateY(2px);
}

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
