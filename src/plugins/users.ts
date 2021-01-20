import {App, ref, reactive} from 'vue'
import router from '../router'
import firebase from 'firebase'
import {Token} from '../schema'

// interface User {
//   id: string
//   email: string
//   authd: boolean
//   token: Token
// }
const token = reactive({
  val: ref(''),
  expiration: new Date().getTime(),
})

const userData = reactive({
  id: ref<symbol>(),
  email: ref(''),
  authd: ref(false),
  token: ref<Token>(token),
})

export default {
  install: (app: App): void => {
    app.config.globalProperties.$logout = () => {
      console.log('logging out user', userData.id)
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/')
          // Sign-out successful.
        })
        .catch((error) => {
          router.push('/login')
          console.error("couldn't log out", error)
        })
    }
  },
}
