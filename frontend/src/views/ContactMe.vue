<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2>{{ t('contact.title') }}</h2>
      <a 
        :href="'mailto:dadafsdfdssg@yopmail.com?subject=Hello&body=' + encodeURIComponent(t('contact.mail_body'))" 
        class="email-button"
      >
        {{ t('contact.send_email_button') }}
      </a>

      <div class="social-links">
        <a href="https://github.com/AlejandroBrnab" target="_blank" class="link">
          <img src="../assets/images/github_border.png" alt="GitHub">
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/alejandro-bernab%C3%A9-rodr%C3%ADguez-97984a32a/" target="_blank" class="link">
          <img src="../assets/images/linkedin.png" alt="LinkedIn">
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped>
.contact {
  background-color: #F8F9FA;
  padding: 40px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 60px auto;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
}

.email-button {
  display: inline-block;
  padding: 12px 20px;
  background-color: #4C9F70;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.email-button:hover {
  background-color: #3D7F5A;
  transform: translateY(-2px);
}

.email-button:active {
  transform: translateY(1px);
}

/* Social Links */
.social-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.social-links .link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #49516F;
  font-size: 1rem;
  transition: color 0.3s ease, transform 0.2s ease;
}

.social-links .link img {
  width: 32px;
  height: 32px;
}

.social-links .link:hover {
  color: #6279B8;
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .social-links {
    flex-direction: column;
    gap: 12px;
  }
}
</style>

