import {App} from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from '../router'
import {clearu} from '../store/user'

export default {
  install: (app: App): void => {
    app.config.globalProperties.$logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('logging out', firebase.auth().currentUser)
          router.push('/')
        })
        .catch((error) => {
          console.error("couldn't log out", error)
          router.push('/login')
        })
      clearu('uid')
    }
  },
}
