import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import router from "@/routes";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

createApp(App)
    .use(router)
    .use(ToastPlugin)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
