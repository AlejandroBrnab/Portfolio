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
  background: rgba(255, 255, 255, 0.1);
  padding: 50px 20px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
  text-align: center;
  max-width: 600px;
  margin: 60px auto;
  margin-top: 200px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1098F7;
  font-weight: 600;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

p {
  font-size: 1rem;
  color: #d3d3d3;
  margin-bottom: 1.8rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Button Styling */
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
  background: linear-gradient(90deg, #1098F7, #4C9F70);
  color: #fff;
  font-size: 1rem;
  padding: 12px 20px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  border: none;
}

.download-btn button:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(90deg, #0D7AC4, #3D7F5A);
}

.download-btn button:active {
  transform: translateY(1px);
}

/* Responsive Design */
@media (max-width: 600px) {
  .cv-section {
    padding: 40px 15px;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 0.95rem;
  }

  .download-btn button {
    padding: 10px 18px;
    font-size: 0.95rem;
  }
}
</style>

