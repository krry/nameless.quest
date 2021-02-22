import {RouteLocationRaw, RouteLocationNormalized} from 'vue-router'
import {auth} from '../firebase'
import {cfg, set} from '../store'
import {addRoll, cachedRoll} from '../store/rolls'
import {cached, cacheUser} from '../store/cache'
import * as drawer from '../utils/drawer'

export function beforeEach(to: RouteLocationNormalized): RouteLocationRaw | boolean {
	const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
	// console.log('before this route', to)
	console.log('user authd?', cached.uid)
	if (requiresAuth && !cached.uid) {
		console.log('need auth and no user signed in')
		return {name: 'login'}
	}

	if (auth.isSignInWithEmailLink(window.location.href)) {
		console.log('coming in from a magic link')
		console.log('checking for cached email', cached.email)
		if (!cached.email) {
			console.warn('different device than last sign-in,  need to sign in here.')
			return {
				name: 'login',
				query: {from: to.path},
				replace: true,
			}
		}
		auth
			.signInWithEmailLink(cached.email, window.location.href)
			.then((result) => {
				if (result.user) {
					console.log('user signed in!', result.user)
					cacheUser(result.user)
				}
				if (result.additionalUserInfo) {
					console.log('user is new', result.additionalUserInfo.isNewUser)
					// can trigger onboarding flow here
					set('beeny', false)
				}
				console.log('logged in successfully to', to)
				if (cachedRoll.value) {
					addRoll(cachedRoll.value)
				}
				return {name: 'journal', replace: true}
			})
			.catch((error) => {
				console.error(
					"couldn't complete email link sign-in due to invalid email and invalid or expired OTPs",
					error,
				)
				return false
			})
	}
	// no auth needed
	return true
}

export function oracleGuard(): RouteLocationRaw {
	console.log('guarding the oracle')
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
		console.log('relaxing')
		document.removeEventListener('touchstart', activate)
		document.removeEventListener('mousemove', activate)
		document.removeEventListener('keydown', activate)
		document.removeEventListener('scroll', activate)
	}

	function activate() {
		console.log('activated')
		active = true
		relax()
	}

	document.addEventListener('touchstart', activate)
	document.addEventListener('mousemove', activate)
	document.addEventListener('keydown', activate)
	document.addEventListener('scroll', activate)

	setTimeout(() => {
		console.log('activated', active)
		cfg.drawer && !active && drawer.close()
	}, 1500)
}
