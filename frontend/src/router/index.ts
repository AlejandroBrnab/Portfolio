import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Projects from '@/views/Projects.vue';
import ContactMe from '@/views/ContactMe.vue';
import Resume from '@/views/Resume.vue';
import Testimonials from '@/views/Testimonials.vue';
import AboutMe from '@/views/AboutMe.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import AddProject from '@/views/AddProject.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'aboutme', component: AboutMe },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/contact', name: 'contactme', component: ContactMe },
  { path: '/resume', name: 'resume', component: Resume },
  { path: '/testimonials', name: 'testimonials', component: Testimonials },
  { path: '/admin', name: 'admin', component: AdminDashboard },
  { path: '/admin/add-project', name: 'add-project', component: AddProject }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;