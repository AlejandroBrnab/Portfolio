import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import i18n from './i18n';
import './assets/main.css';
import auth from './utils/auth';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(auth);
app.use(router);

app.mount('#app');