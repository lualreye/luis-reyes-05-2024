import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router'

import '@/style.css'
import '@/styles/tailwind.css'

async function createVueApp() {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);

  app.use(router);

  return app;
}

export { createVueApp };