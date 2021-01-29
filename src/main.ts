import {createApp} from 'vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import App from './App.vue'
import logout from './plugins/logout'
import {setu} from './store/user'
import {set} from './store/cfg'
import {Focus} from './directives/focus'
import {AutoResize} from './directives/autoresize'
import {titlize, symbolize} from './plugins/utils'

import '@fontsource/quicksand/latin-300.css'
import '@fontsource/quicksand/latin-400.css'
import '@fontsource/quicksand/latin-500.css'
import '@fontsource/quicksand/latin-600.css'
import '@fontsource/quicksand/latin-700.css'
import '@fontsource/roboto-slab/latin-200.css'
import '@fontsource/roboto-slab/latin-300.css'
import '@fontsource/roboto-slab/latin-400.css'
import '@fontsource/roboto-slab/latin-500.css'
import '@fontsource/roboto-slab/latin-600.css'
import '@fontsource/roboto-slab/latin-700.css'
import '@fontsource/roboto-slab/latin-800.css'
import '@fontsource/inconsolata/latin-200.css'
import '@fontsource/inconsolata/latin-300.css'
import '@fontsource/inconsolata/latin-400.css'
import '@fontsource/inconsolata/latin-500.css'
import '@fontsource/inconsolata/latin-600.css'
import '@fontsource/inconsolata/latin-700.css'
import '@fontsource/inconsolata/latin-800.css'
import '@fontsource/museomoderno/latin-300.css'
import '@fontsource/museomoderno/latin-400.css'
import '@fontsource/museomoderno/latin-500.css'
import '@fontsource/museomoderno/latin-600.css'
import '@fontsource/museomoderno/latin-700.css'
import '@fontsource/museomoderno/latin-800.css'
import '@fontsource/museomoderno/latin-900.css'
import './assets/styles/main.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYmeuIr6aDKO7QQi9kTrfbEy6XGZfuCPY',
  authDomain: 'nameless-magic.firebaseapp.com',
  projectId: 'nameless-magic',
  databaseURL: 'https://nameless-magic-default-rtdb.firebaseio.com',
  storageBucket: 'nameless-magic.appspot.com',
  messagingSenderId: '386380781673',
  appId: '1:386380781673:web:265412564c620104f4aaf8',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.auth().useDeviceLanguage()
// Get a reference to the database service
export const database = firebase.database()

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (user.uid) setu('uid', user.uid)
    if (user.email) setu('email', user.email)
    if (user.phoneNumber) setu('phone', user.phoneNumber)
    if (user.displayName) setu('name', user.displayName)
    if (user.emailVerified) set('emailVerified', user.emailVerified)
  } else {
    // No user is signed in.
  }
})

const app = createApp(App)

app.directive('autoresize', AutoResize)
app.directive('focus', Focus)

// prettier-ignore
app
  .use(router)
  .use(logout)
  .use(symbolize)
  .use(titlize)
  .mount('#bollard')
