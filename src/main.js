import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from "@iconify/vue";
import router from './router/index.js'

const app = createApp(App).component("Icon",Icon);
app.use(router);
app.mount('#app')