import { ref } from 'vue';
import { defTheme } from '../schema';
import { THEMES } from '../constants';
import { cached, cache } from './cache';

function checkThemePrefs() {
	let mediaPref, dayOrNight;
	const tiempo = new Date().getHours();
	const savedTheme = cached.theme;
	// console.log('theme saved was', savedTheme)
	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		mediaPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : defTheme;
	}
	if (tiempo) dayOrNight = tiempo < 7 ?? tiempo > 19 ? 'night' : '';
	return savedTheme || mediaPref || dayOrNight || THEMES[1].title;
}

export const activeTheme = ref<string>(checkThemePrefs());

function removeGroupOfClassesFromEl(element: HTMLElement, className: string) {
	const classList = element.classList;
	while (classList.length > 0) {
		const cls = classList.item(0);
		if (cls === null) return;
		if (cls.includes(className)) {
			classList.remove(cls);
		}
	}
}

function applyTheme(theme: string) {
	const doc = document.documentElement;
	removeGroupOfClassesFromEl(doc, 'theme');
	doc.classList.add(`theme-${theme}`);
	doc.setAttribute('data-theme', theme);
	// console.log('applying theme:', theme)
	cache('theme', theme);
	return theme;
}

export function setTheme(title: string): void {
	// console.log('setting theme to', title)
	const titles = THEMES.map(t => t.title);
	// if the title argument is one of the theme titles,
	if (titles.indexOf(title) !== -1) {
		applyTheme(title);
		// console.log('saves the arg as the active theme:', title)
		activeTheme.value = title;
	}
}

export function nextTheme(): void {
	// determines index of current active themes
	// console.log('activeTheme.value', activeTheme.value)
	const currentIndex = THEMES.map(t => t.title).indexOf(activeTheme.value);
	// console.log('currentIndex', currentIndex)
	const nextIndex = currentIndex + 1 >= THEMES.length ? 0 : currentIndex + 1;
	// console.log('advancing theme to', THEMES[nextIndex].title)
	setTheme(THEMES[nextIndex].title);
}
