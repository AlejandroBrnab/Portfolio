<template>
  <section id="testimonials" class="testimonials">
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
  }
}
</script>

<style scoped>
/* Cyberpunk Testimonials Section */
.testimonials {
  background-color: #1A1A1A;  /* Dark background for cyberpunk feel */
  padding: 40px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 255, 204, 0.2); /* Neon glow shadow */
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
  text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc;  /* Glowing text */
}

.testimonial-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.testimonial-card {
  background-color: #2D2D2D;  /* Dark card background */
  padding: 20px;
  margin: 10px;
  border-radius: 15px;
  width: 280px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 255, 204, 0.3); /* Soft glowing effect */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 15px rgba(0, 255, 204, 0.5);  /* Stronger glowing effect on hover */
}

.testimonial-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #f0f0f0;
}

.testimonial-card em {
  font-style: italic;
  color: #ff0066;  /* Neon pink */
  text-shadow: 0 0 5px #ff0066, 0 0 15px #ff0066;
}

@media (max-width: 600px) {
  .testimonial-cards {
    flex-direction: column;
    align-items: center;
  }
}
</style>
