<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2>Contact Me</h2>
      <form action="mailto:dadasg@yopmail.com" method="post" enctype="text/plain">
        <input type="text" name="name" v-model="name" placeholder="Your Name" required />
        <input type="email" name="email" v-model="email" placeholder="Your Email" required />
        <textarea name="message" v-model="message" placeholder="Your Message" required></textarea>
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
    };
  },
};
</script>

<style scoped>
/* Cyberpunk Contact Section */
.contact {
  background-color: #1A1A1A; /* Dark background */
  padding: 40px 20px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 255, 204, 0.2); /* Neon glowing shadow */
  margin-bottom: 2rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #00ffcc;  /* Neon teal */
  text-shadow: 0 0 15px #00ffcc, 0 0 30px #00ffcc, 0 0 45px #00ffcc; /* Glowing text */
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

input, textarea {
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #333; /* Dark border */
  background-color: #2D2D2D; /* Darker background */
  color: #fff; /* White text */
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #00ffcc; /* Neon teal border on focus */
  box-shadow: 0 0 10px #00ffcc; /* Glowing effect on focus */
}

button {
  padding: 15px 25px;
  background-color: #ff0066;  /* Neon pink */
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(255, 0, 102, 0.4); /* Neon glow for button */
  transition: all 0.3s ease;
}

button:hover {
  background-color: #ff3385; /* Lighten neon pink on hover */
  box-shadow: 0 4px 15px rgba(255, 0, 102, 0.7); /* Stronger glow on hover */
}

button:active {
  transform: translateY(2px); /* Slightly move the button on click */
}

/* Responsive styling */
@media (max-width: 600px) {
  form {
    width: 100%;
    gap: 10px;
  }
}
</style>
