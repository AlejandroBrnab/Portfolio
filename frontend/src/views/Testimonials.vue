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

