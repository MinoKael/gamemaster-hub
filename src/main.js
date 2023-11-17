import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader';
import vuetify from './plugins/vuetify';
import router from './router';

const app = createApp(App);
loadFonts();
app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
