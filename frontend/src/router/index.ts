import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Projects from '@/views/Projects.vue';
import ContactMe from '@/views/ContactMe.vue';
import Resume from '@/views/Resume.vue';
import Testimonials from '@/views/Testimonials.vue';
import AboutMe from '@/views/AboutMe.vue';
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'aboutme', component: AboutMe },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/contact', name: 'contactme', component: ContactMe },
  { path: '/resume', name: 'resume', component: Resume },
  { path: '/testimonials', name: 'testimonials', component: Testimonials }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;