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
  background: rgba(255, 255, 255, 0.1);
  padding: 50px 20px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
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

/* Email Button */
.email-button {
  display: inline-block;
  padding: 12px 20px;
  background: linear-gradient(90deg, #1098F7, #4C9F70);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

.email-button:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(90deg, #0D7AC4, #3D7F5A);
}

.email-button:active {
  transform: translateY(1px);
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
  color: #8EA4D2;
  font-size: 1rem;
  transition: color 0.3s ease, transform 0.2s ease;
  padding: 10px 15px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
}

.social-links .link img {
  width: 36px;
  height: 36px;
}

.social-links .link:hover {
  color: #1098F7;
  transform: translateY(-3px);
  box-shadow: 0px 0px 15px rgba(16, 152, 247, 0.8);
}

@media (max-width: 600px) {
  .social-links {
    flex-direction: column;
    gap: 15px;
  }
}

</style>

