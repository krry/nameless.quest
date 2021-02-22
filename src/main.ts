import {createApp} from 'vue'
import router from './router'
import App from './App.vue'
import {auth} from './firebase'

import {uncache, activeUser} from './store/cache'
import {addRoll, cachedRoll} from './store/rolls'

import logout from './plugins/logout'
import {Focus} from './directives/focus'
import {AutoResize} from './directives/autoresize'
import {titlize, symbolize, cruiseTo} from './plugins/utils'

import './assets/styles/main.css'

const app = createApp(App)

app.directive('autoresize', AutoResize)
app.directive('focus', Focus)

// prettier-ignore
app
  .use(router)
  .use(logout)
  .use(symbolize)
  .use(titlize)
  .use(cruiseTo)
  .mount('#bollard')

auth.onAuthStateChanged((user) => {
	if (user) {
		console.log('user detected', user.uid)
		activeUser.value = user.uid
		if (cachedRoll.value) {
			cachedRoll.value.uid = user.uid
			addRoll(cachedRoll.value)
			cachedRoll.value = null
		}
	} else {
		console.warn('user lost 😞')
		uncache('uid')
		activeUser.value = null
		// No user is signed in.
	}
})
