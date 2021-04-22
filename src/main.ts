import {createApp} from 'vue'
import router from './router'
import App from './App.vue'
import VueScrollTo from 'vue-scrollto'

import logout from './plugins/logout'
import {AutoFocus} from './directives/autofocus'
import {AutoResize} from './directives/autoresize'
import {titlize, symbolize, cruiseTo} from './plugins/utils'

import './assets/styles/main.css'

const app = createApp(App)
app.directive('scroll-to', VueScrollTo)
app.directive('autoresize', AutoResize)
app.directive('autofocus', AutoFocus)

app
  .use(router)
  .use(logout)
  .use(symbolize)
  .use(titlize)
  .use(cruiseTo)
  .mount('#bollard')
