<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2>{{ t('contact.title') }}</h2>
      <form @submit.prevent="sendEmail">
        <div>
          <label for="firstName">{{ t('contact.firstName') }}</label>
          <input type="text" v-model="firstName" id="firstName" required />
        </div>
        <div>
          <label for="lastName">{{ t('contact.lastName') }}</label>
          <input type="text" v-model="lastName" id="lastName" required />
        </div>
        <div>
          <label for="email">{{ t('contact.email') }}</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div>
          <label for="message">{{ t('contact.message') }}</label>
          <textarea v-model="message" id="message" required></textarea>
        </div>
        <button type="submit">{{ t('contact.send_email_button') }}</button>
      </form>

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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

const { t } = useI18n();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const message = ref('');

const sendEmail = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'el.quesoapestoso@hotmail.com',
        subject: `Portfolio: Contact from ${firstName.value} ${lastName.value}`,
        text: `${firstName.value} ${lastName.value} has contacted you about your portfolio from ${email.value}, and here's what they said:\n\n${message.value}`,
      }),
    });

    if (response.ok) {
      alert(t('contact.emailSent'));
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      message.value = '';
    } else {
      alert(t('contact.emailFailed'));
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert(t('contact.emailFailed'));
  }
};
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

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #8EA4D2;
}

input, textarea {
  width: 100%;
  max-width: 500px;
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #1098F7;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

textarea {
  resize: none;
  height: 120px;
}

button {
  padding: 12px 25px;
  background: linear-gradient(90deg, #1098F7, #4C9F70);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

button:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(90deg, #0D7AC4, #3D7F5A);
}

button:active {
  transform: translateY(1px);
}

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

