import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Projects from '@/views/Projects.vue';
import ContactMe from '@/views/ContactMe.vue';
import Resume from '@/views/Resume.vue';
import Testimonials from '@/views/Testimonials.vue';
import AboutMe from '@/views/AboutMe.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import AddProject from '@/views/AddProject.vue';
import { useAuthStore } from '@/stores/roles';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'aboutme', component: AboutMe },
  { path: '/projects', name: 'projects', component: Projects },
  { path: '/contact', name: 'contactme', component: ContactMe },
  { path: '/resume', name: 'resume', component: Resume },
  { path: '/testimonials', name: 'testimonials', component: Testimonials },
  { path: '/admin', name: 'admin', component: AdminDashboard, meta: { requiresAdmin: true } },
  { path: '/admin/add-project', name: 'add-project', component: AddProject, meta: { requiresAdmin: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Add a navigation guard to check for admin role
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isUserAuthenticated, hasRole } = authStore;

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (isUserAuthenticated && hasRole('Admin')) {
      next();
    } else {
      next({ name: 'aboutme' }); // Redirect to home page if not authorized
    }
  } else {
    next(); // Always call next() to resolve the hook
  }
});

export default router;