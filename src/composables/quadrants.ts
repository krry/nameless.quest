import { Quad, defQuad } from '../schema';
import { determineQuadrant } from '../utils/cards';

export function setQuadrant(el: HTMLElement): Quad {
	if (!el) return defQuad;
	// let el = rx.tile.$el || e?.target;
	const bounds = el.getBoundingClientRect();
	console.log('setting quadrant by tile bounds', bounds);
	return determineQuadrant(bounds);
}
