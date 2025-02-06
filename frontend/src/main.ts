import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';  // Import the plugin
import App from './App.vue';
import i18n from './i18n';
import './assets/main.css';
import auth from './utils/auth';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);  // Add the plugin to Pinia

app.use(pinia);
app.use(i18n);
app.use(auth);
app.use(router);

app.mount('#app');
