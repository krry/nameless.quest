import { App } from 'vue'
import { auth } from '../firebase'
import router from '../router'
import { uncache } from '../store/cache'

const logout = {
	install: (app: App): void => {
		app.config.globalProperties.$logout = () => {
			auth
				.signOut()
				.then(() => {
					console.log('logging out', auth.currentUser)
					return router.push('/')
				})
				.catch(error => {
					console.error("couldn't log out", error)
					return router.push('/login')
				})
			uncache('uid')
		}
	},
}

export default logout
