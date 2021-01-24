import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Config from './views/Config.vue'
import Change from './views/Change.vue'
import Journal from './views/Journal.vue'
import NotFound from './views/NotFound.vue'
import Gratitude from './views/Gratitude.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'gratitude',
    path: '/gratitude',
    component: Gratitude,
  },
  {
    name: 'change',
    path: '/change/:id',
    component: Change,
    props: true,
    beforeEnter: (to: RouteLocationNormalized) => {
      const id =
        typeof to.params.id === 'string' ? parseInt(to.params.id) : parseInt(to.params.id.join(''))
      if (id < 1 || id > 64) {
        return {name: 'not-found'}
      } else return true
    },
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    // props: true,
  },
  {
    name: 'config',
    path: '/config',
    component: Config,
    meta: {
      authRequired: true,
    },
  },
  {
    name: 'journal',
    path: '/journal',
    component: Journal,
    meta: {
      authRequired: true,
    },
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(to /*, from, savedPosition*/) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
    return {x: 0, y: 0} // Go to the top of the page if no hash
  },
})

router.beforeEach((to: RouteLocationNormalized) => {
  // console.log('from route location raw', from)
  // console.log('to route location raw', to)
  const user = firebase.auth().currentUser
  if (user) {
    // already signed in, can go anywhere
    // console.log('user is', user.email)
    return true
  }
  // not signed in
  else {
    // coming in from a magic link
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      const email = localStorage.getItem('emailForSignIn') || ''
      // const params = new URLSearchParams(window.location.search)
      // const apiKey = params.get('apiKey')
      // const oobCode = params.get('oobCode')
      // const mode = params.get('mode')
      // const lang = params.get('lang')
      // console.log(apiKey, oobCode, mode, lang)

      // no stored email from a past successful login
      if (!email) {
        // const remail = prompt('Please reenter your email to confirm')
        console.warn('Different device than last sign-in. Need to login here.')
        // User opened the link on a different device.
        // To prevent session fixation attacks, ask the user to provide the associated email again.
      } else {
        firebase
          .auth()
          // The client SDK will parse the code from the link.
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            localStorage.removeItem('emailForSignIn')
            console.log('user signed in!', result.user)
            if (result.additionalUserInfo) {
              console.log('user is new', result.additionalUserInfo.isNewUser)
              // can trigger onboarding flow here
            }
            return true
          })
          .catch((error) => {
            // Common errors could be invalid email and invalid or expired OTPs.
            console.error("couldn't complete email link sign-in", error)
            return false
          })
      }
    }
    // not a magic link, just typical navigation
    else {
      // routing to a view that needs login
      if (to.matched.some((record) => record.meta.authRequired)) {
        return {name: 'login'}
      }
      // routing to a view that is the same if logged out
      else return true
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  if (to.name === 'change') {
    window.scrollTo(0, 0)
  }
})

export default router
