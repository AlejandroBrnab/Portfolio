<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2>{{ t('contact.title') }}</h2>
      <a 
        :href="'mailto:dadasg@yopmail.com?subject=Hello&body=' + encodeURIComponent($t('contact.mail_body'))" 
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
  background-color: #1A1A1A;
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 255, 204, 0.2);
  margin-bottom: 2rem;
}

.container {
  max-width: 900px;
  margin: 100px auto;
  text-align: center;
}

h2 {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #00ffcc;
  text-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc, 0 0 45px #00ffcc;
}

.email-button {
  display: inline-block;
  padding: 15px 25px;
  background-color: #ff0066;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(255, 0, 102, 0.4);
  transition: all 0.3s ease;
}

.email-button:hover {
  background-color: #ff3385;
  box-shadow: 0 4px 15px rgba(255, 0, 102, 0.7);
}

.email-button:active {
  transform: translateY(2px);
}

/* Social Links */
.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.social-links .link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-links .link img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.social-links .link:hover {
  color: #00ffcc;
  transform: scale(1.1);
}

@media (max-width: 600px) {
  .social-links {
    flex-direction: column;
    gap: 15px;
  }
}
</style>