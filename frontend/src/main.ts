import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import i18n from './i18n';
import './assets/main.css';
import auth from './utils/auth';

const app = createApp(App);

// Use your existing plugins
app.use(createPinia());
app.use(i18n);
app.use(auth);

// Mount the app
app.mount('#app');