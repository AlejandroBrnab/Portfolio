<template>
    <section class="contact-me">
      <div class="container">
        <h2>Contact Me</h2>
        <form @submit.prevent="submitForm">
          <input type="text" v-model="name" placeholder="Your Name" required />
          <input type="email" v-model="email" placeholder="Your Email" required />
          <textarea v-model="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  export default {
    name: 'ContactMeComponent',
    data() {
      return {
        name: '',
        email: '',
        message: '',
      }
    },
    methods: {
      submitForm() {
        // Form submission logic
        alert('Your message has been sent!');
      },
    },
  }
  </script>
  
  <style scoped>
  .contact-me {
    background-color: var(--quaternary-color);
    padding: 40px 20px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  
  .container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input, textarea {
    padding: 15px;
    border-radius: var(--border-radius);
    border: 1px solid #ccc;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: var(--accent-color);
  }
  
  button {
    align-self: center;
    width: 200px;
  }
  </style>
  