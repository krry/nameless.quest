import {RouteLocationNormalized, createRouter, createWebHistory} from 'vue-router'
import firebase from 'firebase'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Config from './views/Config.vue'
import Change from './views/Change.vue'
import Journal from './views/Journal.vue'
import NotFound from './views/NotFound.vue'
import Gratitude from './views/Gratitude.vue'

interface PathObj {
  path: string
}

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    props: true,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
    props: true,
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
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
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
  history: createWebHistory(),
  routes,
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

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: (arg0?: PathObj) => void) => {
    // Confirm the link is a sign-in with email link.
    const user = firebase.auth().currentUser
    if (user) next()
    else {
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        const params = new URLSearchParams(window.location.search)
        const apiKey = params.get('apiKey')
        const oobCode = params.get('oobCode')
        const mode = params.get('mode')
        const lang = params.get('lang')
        console.log(apiKey, oobCode, mode, lang)

        const email = window.localStorage.getItem('emailForSignIn') || ''
        if (!email) {
          // User opened the link on a different device.
          // To prevent session fixation attacks, ask the user to provide the associated email again.
          next({path: '/login'})
        }
        firebase
          .auth()
          // The client SDK will parse the code from the link.
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn')
            console.log('user signed in!', result.user)
            if (result.additionalUserInfo) {
              console.log('user is new', result.additionalUserInfo.isNewUser)
              // can trigger onboarding flow here
            }
            next()
          })
          .catch((error) => {
            // Common errors could be invalid email and invalid or expired OTPs.
            console.error("couldn't complete email link sign-in", error)
          })
      } else {
        if (to.matched.some((record) => record.meta.authRequired)) {
          if (firebase.auth().currentUser) {
            next()
          } else {
            next({path: '/login'})
          }
        } else {
          next()
        }
      }
    }
  },
)

export default router
