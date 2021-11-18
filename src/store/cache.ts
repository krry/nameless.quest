import { reactive } from 'vue';
import { set } from '.';
import { User } from 'firebase/auth';

/** a simple reactive store
 * drawing on a concept I forked
 * https://codesandbox.io/s/vue-3-global-stores-forked-5iscw
 */

export const cached: { [key: string]: string } = reactive({
	uid: lsd('uid'),
	name: lsd('name'),
	toss: lsd('toss'),
	step: lsd('step'),
	help: lsd('help'),
	email: lsd('email'),
	phone: lsd('phone'),
	theme: lsd('theme'),
	query: lsd('query'),
	token: lsd('token'),
	newRoll: lsd('newRoll'),
});

export const cache = (
	nym: string | undefined,
	val: string | null | undefined
): void => {
	if (!nym || !val)
		throw new Error("can't cache nada. nym: " + nym + ', val: ' + val);
	// console.log('setting user data', nym, 'from', cached[nym], 'to', val)
	cached[nym] = val;
	localStorage.setItem(nym, val);
};

export const uncache = (nym: string | undefined): void => {
	if (!nym) throw new Error("can't uncache nada. nym: " + nym);
	// console.log('clearing user data for', nym)
	localStorage.removeItem(nym);
	cached[nym] = '';
};

function lsd(nym: string): string {
	return localStorage.getItem(nym) ?? '';
}

export function cacheUser(user: User): void {
	// console.info('caching user', user)
	if (user.uid) cache('uid', user.uid);
	if (user.email) cache('email', user.email);
	if (user.phoneNumber) cache('phone', user.phoneNumber);
	if (user.displayName) cache('name', user.displayName);
	if (user.emailVerified) set('emailVerified', user.emailVerified);
}

// export const activeUser = ref()
