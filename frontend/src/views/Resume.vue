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
  padding: 2.5rem;
  background: #F8F9FA;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 800px;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
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
  background-color: #4C9F70;
  color: #fff;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(76, 159, 112, 0.3);
}

.download-btn button:hover {
  background-color: #3D7F5A;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(76, 159, 112, 0.5);
}

.download-btn button:active {
  transform: translateY(1px);
}

@media (max-width: 600px) {
  .cv-section {
    padding: 2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  p {
    font-size: 0.95rem;
  }

  .download-btn button {
    padding: 0.7rem 1.8rem;
  }
}
</style>

