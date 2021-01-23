import {createApp} from 'vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import App from './App.vue'
import users from './plugins/users'
import {titleCase, getSymbol} from './plugins/utils'
import {AutoResize} from './directives/autoresize'

import '@fontsource/quicksand/300.css'
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/500.css'
import '@fontsource/quicksand/600.css'
import '@fontsource/quicksand/700.css'
import '@fontsource/roboto-slab/300.css'
import '@fontsource/roboto-slab/400.css'
import '@fontsource/roboto-slab/500.css'
import '@fontsource/roboto-slab/600.css'
import '@fontsource/roboto-slab/700.css'
import '@fontsource/inconsolata/300.css'
import '@fontsource/inconsolata/400.css'
import '@fontsource/inconsolata/500.css'
import '@fontsource/inconsolata/600.css'
import '@fontsource/inconsolata/700.css'
import '@fontsource/museomoderno/300.css'
import '@fontsource/museomoderno/400.css'
import '@fontsource/museomoderno/500.css'
import '@fontsource/museomoderno/600.css'
import '@fontsource/museomoderno/700.css'
import '@fontsource/museomoderno/800.css'
import './assets/styles/main.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYmeuIr6aDKO7QQi9kTrfbEy6XGZfuCPY',
  authDomain: 'nameless-magic.firebaseapp.com',
  projectId: 'nameless-magic',
  storageBucket: 'nameless-magic.appspot.com',
  messagingSenderId: '386380781673',
  appId: '1:386380781673:web:265412564c620104f4aaf8',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.auth().useDeviceLanguage()

const app = createApp(App)

app.directive('autoresize', AutoResize)

// prettier-ignore
app
  .use(router)
  .use(users)
  .use(getSymbol)
  .use(titleCase)
  .mount('#bollard')
