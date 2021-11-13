import { reactive } from 'vue';

export const cfg: { [key: string]: boolean } = reactive({
	wenny: lsd('wenny'), // prefer king wen order
	texty: lsd('texty'), // prefer text over glyphs
	pinny: lsd('pinny'), // prefer pinyin visible
	liney: lsd('liney'), // show all changing lines
	gendy: lsd('gendy'), // prefer ungendered text
	turny: lsd('turny'), // prefer vertical lines
	navvy: lsd('navvy'), // prefer no more hints
	beeny: lsd('beeny'), // seen the intro pane
	baguy: lsd('baguy'), // bagua doors shut
	drawer: lsd('drawer'), // site nav visible
	perused: lsd('perused'), // visited changes
	metafied: lsd('metafied'), // visited about
	journaled: lsd('journaled'), // visited journal
	consulted: lsd('consulted'), // visited oracle
	configured: lsd('configured'), // visited config
	thanked: lsd('thanked'), // visited gratitude
	fedback: lsd('fedback'), // visited feedback
	emailVerified: lsd('emailVerified'),
	phoneVerified: lsd('phoneVerified'),
});

export function set(nym: string, val: boolean): void {
	// console.log('set', nym, 'to', val)
	localStorage.setItem(nym, JSON.stringify(val));
	cfg[nym] = val;
}

export function tog(nym: string): void {
	cfg[nym] = !cfg[nym];
	localStorage.setItem(nym, JSON.stringify(cfg[nym]));
}

function lsd(nym: string): boolean {
	const storedNym = localStorage.getItem(nym) ?? 'false';
	try {
		return JSON.parse(storedNym);
	} catch (e) {
		console.error('cannot parse', nym, storedNym);
		return false;
	}
}
