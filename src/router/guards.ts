import { RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
import { supabase, getAuthUser } from '../firebase';
import { cfg } from '../store';
import { addRoll, cachedRoll } from '../store/rolls';
import { uncache, cached, cacheUser } from '../store/cache';
import { getRolls } from '../store/rolls';
import * as drawer from '../utils/drawer';

// Set up auth state listener for Supabase
supabase.auth.onAuthStateChange(async (event, session) => {
	if (event === 'SIGNED_IN' && session?.user) {
		console.info('user detected', session.user.id);
		cacheUser(session.user);
		if (!cachedRoll.value) return;
		// Note: Supabase handles user_id in the Roll interface, so we don't set it here
		addRoll(cachedRoll.value);
		cachedRoll.value = null;
	} else if (event === 'SIGNED_OUT') {
		uncache('uid');
		uncache('email');
		uncache('name');
	}
});

export async function beforeEach(/*to: RouteLocationNormalized*/): Promise<
	RouteLocationRaw | undefined
> {
	// Check if user is already authenticated
	if (cached.uid) {
		return;
	}

	// Check if we have a valid session (user is authenticated)
	const user = await getAuthUser();
	if (user) {
		console.log('User already authenticated:', user.id);
		cacheUser(user);
		await getRolls();
		return {
			name: 'journal',
			query: {},
			replace: true,
		};
	}

	// Check if we're returning from a magic link (email auth)
	// Supabase handles this automatically in the auth state change listener
	// and will set the session, so the above getAuthUser() check will catch it

	// If no user and no valid session, redirect to login
	if (!cached.uid) {
		console.log('No authenticated user, redirecting to login');
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
