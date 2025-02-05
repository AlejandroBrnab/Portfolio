<template>
    <section id="testimonials" class="testimonials">
      <div class="container">
        <h2>{{ t('testimonials.title') }}</h2>
        <div class="testimonial-cards">
          <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
            <p>"{{ testimonial.text }}"</p>
            <p><em>- {{ testimonial.name }}</em></p>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Testimonial {
  id: number;
  text: string;
  name: string;
}
const { t } = useI18n();
const testimonials: Testimonial[] = [
  { id: 1, text: 'Alejandro is a fantastic developer!', name: 'John Doe' },
  { id: 2, text: 'I highly recommend Alejandro for any project.', name: 'Jane Smith' },
];
</script>

<style scoped>

.testimonials {
  background-color: #1A1A1A; 
  padding: 40px 20px;
  border-radius: 10px;
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
  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;  
}

.testimonial-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.testimonial-card {
  background-color: #2D2D2D;  
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
  width: 280px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 255, 204, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 15px rgba(0, 255, 204, 0.5); 
}

.testimonial-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #f0f0f0;
}

.testimonial-card em {
  font-style: italic;
  color: #ff0066;
  text-shadow: 0 0 5px #ff0066, 0 0 15px #ff0066;
}

@media (max-width: 600px) {
  .testimonial-cards {
    flex-direction: column;
    align-items: center;
  }
}
</style>
