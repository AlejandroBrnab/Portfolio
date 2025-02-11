<template>
  <section id="testimonials" class="testimonials">
    <div class="container">
      <h2>{{ t('testimonials.title') }}</h2>

      <!-- Form to submit a new comment -->
      <form @submit.prevent="submitTestimonial" class="testimonial-form">
        <input v-model="newTestimonial.author" type="text" placeholder="Your name" required />
        <textarea v-model="newTestimonial.text" placeholder="Your testimonial" required></textarea>
        <button type="submit">Submit</button>
      </form>

      <p v-if="submissionMessage" class="submission-message">{{ submissionMessage }}</p>

      <!-- Display approved testimonials -->
      <div class="testimonial-cards">
        <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial._id">
          <p>"{{ testimonial.text }}"</p>
          <p><em>- {{ testimonial.author }}</em></p>
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

const { t } = useI18n();
const testimonials = ref<Testimonial[]>([]);
const newTestimonial = ref<Testimonial>({ author: '', text: '' });
const submissionMessage = ref<string | null>(null);

// Fetch approved testimonials from the API
const fetchTestimonials = async () => {
  try {
    const response = await axios.get('http://localhost:31415/api/comments/');
    testimonials.value = response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }
};

// Submit a new testimonial
const submitTestimonial = async () => {
  try {
    await axios.post('http://127.0.0.1:5000/api/comments', newTestimonial.value);
    submissionMessage.value = "Thank you! Your comment is awaiting approval.";
    newTestimonial.value = { author: '', text: '' }; // Clear input fields
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    submissionMessage.value = "An error occurred. Please try again later.";
  }
};

onMounted(fetchTestimonials);
</script>

<style scoped>
.testimonials {
  background-color: #f9f9f9;
  padding: 40px 20px;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Testimonial Form */
.testimonial-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.testimonial-form input,
.testimonial-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.testimonial-form button {
  background-color: #4C9F70;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.testimonial-form button:hover {
  background-color: #496F5D;
}

.submission-message {
  color: #4C9F70;
  font-weight: bold;
  margin-bottom: 15px;
}

/* Testimonials Display */
.testimonial-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.testimonial-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  width: 260px;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.testimonial-card:hover {
  transform: translateY(-5px);
}

.testimonial-card p {
  font-size: 1rem;
  line-height: 1.5;
}

.testimonial-card em {
  font-style: italic;
  color: #666;
}

@media (max-width: 600px) {
  .testimonial-cards {
    flex-direction: column;
    align-items: center;
  }
}
</style>
