import {RouteLocationRaw, RouteLocationNormalized} from 'vue-router'
import {auth} from '../firebase'
import {cfg, set} from '../store'
import {addRoll, cachedRoll} from '../store/rolls'
import {cache, uncache, cached, cacheUser} from '../store/cache'
import {getRolls} from '../store/rolls'
import * as drawer from '../utils/drawer'

auth.onAuthStateChanged((user) => {
	if (user) {
		// console.info('user detected', user.uid)
		cache('uid', user.uid)
		// activeUser.value = user.uid
		if (cachedRoll.value) {
			cachedRoll.value.uid = user.uid
			addRoll(cachedRoll.value)
			cachedRoll.value = null
		}
	} else {
		console.warn('user lost 😞')
		uncache('uid')
		// activeUser.value = null
		// No user is signed in.
	}
})

export function beforeEach(to: RouteLocationNormalized): RouteLocationRaw | undefined {
	// console.log('going to params', to.params)
	// const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
	// console.log('before this route', to)
	// console.log('checking for cached user id:', cached.uid)
	// console.log('router pointed toward', to.path)
	// console.log('requiresAuth is', requiresAuth)
	// console.log('cached.uid is missing?', !cached.uid)
	// console.log('we have a cached uid and are going to /login', (!!cached.uid && to.path === '/login'))
	// if (!!cached.uid && to.path === '/login') {
		// console.log('going to journal instead')
		// return '/journal'
		// no auth needed
	// }

	if (auth.isSignInWithEmailLink(window.location.href)) {
		// console.log('coming in from a magic link')
		// console.log('checking for cached email', cached.email)
		if (!cached.email) {
			// console.warn('different device than last sign-in,  need to sign in here.')
			return {
				name: 'login',
				query: {from: to.path},
				replace: true,
			}
		}
		auth
			.signInWithEmailLink(cached.email, window.location.href)
			.then((result) => {
				// console.log('result from firebase auth', result)
				if (result.user) {
					// console.log('valid firebase user', result.user)
					cacheUser(result.user)
					if (result.additionalUserInfo) {
						// console.log('new user?', result.additionalUserInfo.isNewUser)
						// can trigger onboarding flow here
						set('beeny', false)
					}
					// console.log('logged in successfully to', to.path)
					if (cachedRoll.value) {
						addRoll(cachedRoll.value)
					}
					// console.log('proceeding to journal')
					getRolls()
					return {
						name: 'journal',
						query: {},
						replace: true,
					}
				}
			})
			.catch((error) => {
				console.error(error.message)
				return false
			})
	}
}

export function oracleGuard(): RouteLocationRaw {
	// console.log('guarding the oracle')
	if (cached.query) return {name: 'cast'}
	else return {name: 'query'}
}

export function changeGuard(to: RouteLocationNormalized): RouteLocationRaw | boolean {
	const id =
		typeof to.params.id === 'string'
			? parseInt(to.params.id, 10)
			: parseInt(to.params.id.join(''), 10)
	if (id < 1 || id > 64) {
		return {name: 'not-found'}
	} else return true
}

export function afterEach(): void {
	let active = false

	function relax() {
		// console.log('relaxing')
		document.removeEventListener('touchstart', activate)
		document.removeEventListener('mousemove', activate)
		document.removeEventListener('keydown', activate)
		document.removeEventListener('scroll', activate)
	}

	function activate() {
		// console.log('activated')
		active = true
		relax()
	}

	document.addEventListener('touchstart', activate)
	document.addEventListener('mousemove', activate)
	document.addEventListener('keydown', activate)
	document.addEventListener('scroll', activate)

	setTimeout(() => {
		// console.log('activated', active)
		cfg.drawer && !active && drawer.close()
	}, 777)
}
