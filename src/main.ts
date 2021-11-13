import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import VueScrollTo from 'vue-scrollto';

import logout from './plugins/logout';
import { AutoFocus } from './directives/autofocus';
import { AutoResize } from './directives/autoresize';

import './assets/styles/main.css';

const app = createApp(App);
const head = createHead();
app.directive('scroll-to', VueScrollTo);
app.directive('autoresize', AutoResize);
app.directive('autofocus', AutoFocus);

// prettier-ignore
app
	.use(router)
	.use(logout)
	.use(head)
	.mount('#bollard');
