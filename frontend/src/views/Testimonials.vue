<template>
  <section id="testimonials" class="testimonials">
    <div class="container">
      <h2>{{ t('testimonials.title') }}</h2>

      <form @submit.prevent="submitTestimonial" class="testimonial-form">
        <input v-model="newTestimonial.author" type="text" :placeholder="t('testimonials.your_name')" required />
        <textarea v-model="newTestimonial.text" :placeholder="t('testimonials.your_testimonial')" required></textarea>
        <button type="submit">{{ t('testimonials.submit') }}</button>
      </form>

      <p v-if="submissionMessage" class="submission-message">{{ t('testimonials.submit') }}</p>

      <div class="testimonial-cards">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="testimonial._id">
          <p>"{{ testimonial.text }}"</p>
          <p class="author-info">
            <img :src="icons[index % icons.length].src" :alt="icons[index % icons.length].name" class="author-icon" />
            <em>- {{ testimonial.author }}</em>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define the structure for testimonials
interface Testimonial {
  _id?: string;
  text: string;
  author: string;
}

// List of available icons (cycling through them for each testimonial)
const icons = [
  { name: 'Dino', src: new URL('@/assets/images/dino.png', import.meta.url).href },
  { name: 'Disk', src: new URL('@/assets/images/disk.png', import.meta.url).href },
  { name: 'Explorer', src: new URL('@/assets/images/explorer.png', import.meta.url).href },
  { name: 'Pizza', src: new URL('@/assets/images/pizza.png', import.meta.url).href },
];

const { t } = useI18n();
const testimonials = ref<Testimonial[]>([]);
const newTestimonial = ref<Testimonial>({ author: '', text: '' });
const submissionMessage = ref<string | null>(null);

// Fetch approved testimonials from the API
const fetchTestimonials = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/`);
    testimonials.value = [...response.data]; // Ensure reactivity
    console.log("Fetched Testimonials:", testimonials.value); // Debugging
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
};

// Submit a new testimonial
const submitTestimonial = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/`, newTestimonial.value);
    submissionMessage.value = t('testimonials.thank_you');
    newTestimonial.value = { author: '', text: '' }; // Clear input fields
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    submissionMessage.value = t('testimonials.error_message');
  }
};

onMounted(fetchTestimonials);
</script>

<style scoped>
/* Testimonials Section */
.testimonials {
  background: #000000;
  color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  margin-top: 40px;
}

/* Title */
h2 {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #1098F7;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
  margin-bottom: 20px;
}

/* Testimonial Form */
.testimonial-form {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 20px rgba(16, 152, 247, 0.7);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 50px;
}

/* Input and Textarea */
.testimonial-form input,
.testimonial-form textarea {
  width: calc(100% - 20px);
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: #FFFFFF;
  outline: none;
}

/* Button */
.testimonial-form button {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  background-color: #1098F7;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease;
}

.testimonial-form button:hover {
  background-color: #0D7AC4;
  transform: scale(1.05);
}

/* Submission Message */
.submission-message {
  color: #1098F7;
  font-weight: bold;
  margin-top: 10px;
}

/* Testimonial Cards */
.testimonial-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 12px;
  width: 260px;
  text-align: center;
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 15px rgba(16, 152, 247, 0.5);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 0px 30px rgba(16, 152, 247, 1);
}

/* Testimonial Text */
.testimonial-card p {
  font-size: 1rem;
  line-height: 1.5;
  color: #FFFFFF;
  opacity: 0.9;
}

/* Author */
.testimonial-card em {
  font-style: italic;
  color: #1098F7;
  text-shadow: 0px 0px 10px rgba(16, 152, 247, 0.8);
}

/* Author Icon */
.author-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 10px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px; /* Adds spacing between icon and name */
  justify-content: center; /* Centers content */
}

.author-icon {
  width: 35px; /* Adjust as needed */
  height: 35px;
  border-radius: 10%;
}

/* Responsive Design */
@media (max-width: 600px) {
  .testimonial-cards {
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-size: 2rem;
  }
}
</style>
