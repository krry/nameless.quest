/* prettier-ignore */
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized
} from 'vue-router'
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
          if (!to.params) {
            if (user.toss) {
              console.log('user.toss', user.toss)
              return {name: 'response'}
            } else if (user.query) {
              console.log('user.query', user.query)
              return {name: 'toss'}
            } else if (cfg.beeny) {
              console.log('cfg.beeny', cfg.beeny)
              return {name: 'query'}
            } else {
              console.log('else going to', to)
              return true
            }
          } else {
            console.log('else has params', to.params)
            return true
          }
        },
        beforeUpdate: (to: RouteLocationNormalized) => {
          set('modal', true)
          set('oracle', true)
          set('drawer', false)
          if (!to.params) {
            if (user.toss) {
              console.log('user.toss', user.toss)
              return {name: 'response'}
            } else if (user.query) {
              console.log('user.query', user.query)
              return {name: 'toss'}
            } else if (cfg.beeny) {
              console.log('cfg.beeny', cfg.beeny)
              return {name: 'query'}
            } else {
              console.log('else going to', to)
              return true
            }
          } else {
            console.log('else has params', to.params)
            return true
          }
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
  },
  {
    name: 'configure',
    path: '/configure',
    component: Config,
    meta: {
      // authRequired: true,
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
  console.log('checking for current user', firebase.auth().currentUser)
  if (firebase.auth().currentUser) {
    console.log('found current user', firebase.auth().currentUser)
    return true
  }
  // not signed in
  else {
    console.log('no current user found')
    // coming in from a magic link
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      console.log('coming in from a magic link')
      const params = new URLSearchParams(window.location.search)

      const apiKey = params.get('apiKey')
      if (apiKey) setu('apiKey', apiKey)
      const oobCode = params.get('oobCode')
      if (oobCode) setu('oobCode', oobCode)
      const mode = params.get('mode')
      if (mode) setu('mode', mode)
      const lang = params.get('lang')
      if (lang) setu('lang', lang)

      let email = user.email || null
      console.log('checking for email for sign in', email)
      // no stored email from a past successful login
      if (!email) {
        // const remail = prompt('Please reenter your email to confirm')
        console.warn('Different device than last sign-in. Need to sign in here.')
        email = prompt('Please enter your email to confirm signing in.')
        // User opened the link on a different device.
        // To prevent session fixation attacks, ask the user to provide the associated email again.
      } else {
        console.log('email from which to sign in', email)
        firebase
          .auth()
          // The client SDK will parse the code from the link.
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            localStorage.removeItem('email')
            if (result.user) {
              console.log('user signed in!', result.user)
              if (result.user.email && user.email !== result.user.email)
                setu('email', result.user.email)
              if (result.user.phoneNumber) setu('phone', result.user.phoneNumber)
              if (result.user.displayName) setu('name', result.user.displayName)
            }
            if (result.additionalUserInfo) {
              console.log('user is new', result.additionalUserInfo.isNewUser)
              // can trigger onboarding flow here
              set('beeny', false)
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
      console.log('routing via a non-magic link to', to.path)
      // routing to a view that needs login
      if (to.matched.some((record) => record.meta.authRequired)) {
        console.log('this route requires auth', to.name)
        return {name: 'login'}
      }
      // routing to a view that is the same if logged out
      else {
        // console.log('going to', to)
        if (!to.matched.some((record) => record.path === '/oracle')) {
          console.log('putting the modal oracle away for', to.name)
          set('modal', false)
        }
        console.log('visiting open route, no auth needed', to.name)
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
