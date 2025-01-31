<template>
    <section class="testimonials">
      <div class="container">
        <h2>Testimonials</h2>
        <div class="testimonial-cards">
          <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
            <p>"{{ testimonial.text }}"</p>
            <p><em>- {{ testimonial.name }}</em></p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  interface Testimonial {
    id: number;
    text: string;
    name: string;
  }
  
  export default {
    name: 'TestimonialsComponent',
    data() {
      return {
        testimonials: [
          { id: 1, text: 'Alejandro is a fantastic developer!', name: 'John Doe' },
          { id: 2, text: 'I highly recommend Alejandro for any project.', name: 'Jane Smith' },
        ] as Testimonial[],
      }
    },
  }
  </script>
  
  <style scoped>
  .testimonials {
    background-color: var(--primary-color);
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
  
  .testimonial-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .testimonial-card {
    background-color: var(--secondary-color);
    padding: 20px;
    margin: 10px;
    border-radius: var(--border-radius);
    width: 280px;
    transition: transform var(--transition-time);
  }
  
  .testimonial-card:hover {
    transform: translateY(-10px);
  }
  
  p {
    color: #fff;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  em {
    font-style: italic;
    color: var(--accent-color);
  }
  </style>
  