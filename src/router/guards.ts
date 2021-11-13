import { RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
import { auth } from '../firebase';
import {
	UserCredential,
	onAuthStateChanged,
	signInWithEmailLink,
	isSignInWithEmailLink,
} from 'firebase/auth';
import { cfg } from '../store';
import { addRoll, cachedRoll } from '../store/rolls';
import { cache, uncache, cached, cacheUser } from '../store/cache';
import { getRolls } from '../store/rolls';
import * as drawer from '../utils/drawer';

onAuthStateChanged(auth, user => {
	if (user) {
		// console.info('user detected', user.uid)
		cache('uid', user.uid);
		// activeUser.value = user.uid
		if (!cachedRoll.value) return;
		cachedRoll.value.uid = user.uid;
		addRoll(cachedRoll.value);
		cachedRoll.value = null;
	} else {
		console.warn('👋 welcome, guest');
		uncache('uid');
	}
});

export async function beforeEach(
	to: RouteLocationNormalized
): Promise<RouteLocationRaw | undefined> {
	console.log('beforeEach', to);
	if (cached.uid) {
		console.log('uid cached', cached.uid);
		await getRolls();
		return;
	}
	if (isSignInWithEmailLink(auth, window.location.href)) {
		console.log('is a sign in link');

		if (cached.email) {
			console.log('email cached', cached.email);
			const signInResult = await signInWithEmailLink(auth, cached.email, window.location.href);
			if (signInResult.user) {
				// console.log('valid firebase user', result.user)
				cacheUser(signInResult.user);
				if (cachedRoll.value) {
					addRoll(cachedRoll.value);
				}
				// console.log('proceeding to journal')
				getRolls();
				return {
					name: 'journal',
					query: {},
					replace: true,
				};
			} else {
				console.error(signInResult);
				return;
			}
		} else {
			console.error('no cached email');
			return;
		}
	} else {
		console.log('proceeding to login');
		return {
			name: 'login',
			query: {},
			replace: true,
		};
	}
}

export function oracleGuard(): RouteLocationRaw {
	// console.log('guarding the oracle')
	if (cached.query) return { name: 'cast' };
	else return { name: 'query' };
}

export function changeGuard(to: RouteLocationNormalized): RouteLocationRaw | boolean {
	const id =
		typeof to.params.id === 'string'
			? parseInt(to.params.id, 10)
			: parseInt(to.params.id.join(''), 10);
	if (id < 1 || id > 64) {
		return { name: 'not-found' };
	} else return true;
}

export function afterEach(): void {
	let active = false;

	function relax() {
		// console.log('relaxing')
		document.removeEventListener('touchstart', activate);
		document.removeEventListener('mousemove', activate);
		document.removeEventListener('keydown', activate);
		// document.removeEventListener('scroll', activate)
	}

	function activate() {
		// console.log('activated')
		active = true;
		relax();
	}

	document.addEventListener('touchstart', activate, { passive: true });
	document.addEventListener('mousemove', activate);
	document.addEventListener('keydown', activate);
	// document.addEventListener('scroll', activate)

	setTimeout(() => {
		// console.log('activated', active)
		cfg.drawer && !active && drawer.close();
	}, 777);
}
