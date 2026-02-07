import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import VueScrollTo from 'vue-scrollto';
import { AutoFocus } from './directives/autofocus';
import { AutoResize } from './directives/autoresize';
import { supabase } from './firebase';
import { cached, cacheUser, uncache } from './store/cache';
import { activeRolls } from './store/rolls';
import './assets/styles/main.css';

const app = createApp(App);
const head = createHead();
app.directive('scroll-to', VueScrollTo);
app.directive('autoresize', AutoResize);
app.directive('autofocus', AutoFocus);

// Set up auth state listener
supabase.auth.onAuthStateChange(async (event, session) => {
	console.log('Auth state changed:', event);

	if (event === 'SIGNED_IN' && session?.user) {
		cacheUser(session.user);
	} else if (event === 'SIGNED_OUT') {
		uncache('uid');
		uncache('email');
		uncache('phone');
		uncache('name');
		activeRolls.value = [];
	}
});

// prettier-ignore
app
	.use(router)
	.use(head)
	.mount('#bollard');
