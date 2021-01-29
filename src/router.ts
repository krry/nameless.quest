import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import {cfg, set} from './store/cfg'
import {user, setu} from './store/user'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Config from './views/Config.vue'
import Change from './views/Change.vue'
import Journal from './views/Journal.vue'
import NotFound from './views/NotFound.vue'
import Gratitude from './views/Gratitude.vue'
import OracleModal from './components/OracleModal.vue'
import OracleIntro from './components/OracleIntro.vue'
import OracleQuery from './components/OracleQuery.vue'
import OracleToss from './components/OracleToss.vue'
import OracleResponse from './components/OracleResponse.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    children: [
      {
        name: 'oracle',
        path: 'oracle',
        component: OracleModal,
        beforeEnter: (to: RouteLocationNormalized) => {
          set('modal', true)
          set('oracle', true)
          set('drawer', false)
          console.log('to params', to.params)
          if (!to.params) {
            if (user.toss) return {name: 'response'}
            else if (user.query) return {name: 'toss'}
            else if (cfg.beeny) return {name: 'query'}
            else return true
          } else return true
        },
        children: [
          {
            name: 'intro',
            path: '',
            component: OracleIntro,
          },
          {
            name: 'query',
            path: 'query',
            component: OracleQuery,
          },
          {
            name: 'toss',
            path: 'toss',
            component: OracleToss,
          },
          {
            name: 'response',
            path: 'response',
            component: OracleResponse,
          },
        ],
      },
    ],
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
    name: 'configure',
    path: '/configure',
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
  if (firebase.auth().currentUser || user.uid) {
    return true
  }
  // not signed in
  else {
    // coming in from a magic link
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      const params = new URLSearchParams(window.location.search)

      const apiKey = params.get('apiKey')
      if (apiKey) setu('apiKey', apiKey)
      const oobCode = params.get('oobCode')
      if (oobCode) setu('oobCode', oobCode)
      const mode = params.get('mode')
      if (mode) setu('mode', mode)
      const lang = params.get('lang')
      if (lang) setu('lang', lang)

      const email = user.email
      console.log('email to login from', email)
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
            // localStorage.removeItem('emailForSignIn')
            console.log('user signed in!', result.user)
            if (result.additionalUserInfo) {
              console.log('user is new', result.additionalUserInfo.isNewUser)
              // can trigger onboarding flow here
              set('beeny', true)
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
      else {
        if (to.name !== 'oracle') set('modal', false)
        return true
      }
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  if (to.name === 'change') {
    // window.scrollTo(window.innerWidth, 0)
  }
})

export default router
