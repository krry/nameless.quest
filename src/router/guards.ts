import { RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
import { cfg } from '../store';
import * as drawer from '../utils/drawer';

export async function beforeEach(/*to: RouteLocationNormalized*/): Promise<
	RouteLocationRaw | undefined
> {
	// No auth checks — users land straight on the app
	return;
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
