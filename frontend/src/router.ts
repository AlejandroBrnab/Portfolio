import { createRouter, createMemoryHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import AboutMeComponent from './components/AboutMeComponent.vue';
import ProjectsComponent from './components/ProjectsComponent.vue';
import ContactMeComponent from './components/ContactMeComponent.vue';
import ResumeComponent from './components/ResumeComponent.vue';
import TestimonialsComponent from './components/TestimonialsComponent.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: AboutMeComponent },
  { path: '/projects', component: ProjectsComponent },
  { path: '/contact', component: ContactMeComponent },
  { path: '/resume', component: ResumeComponent },
  { path: '/testimonials', component: TestimonialsComponent }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;