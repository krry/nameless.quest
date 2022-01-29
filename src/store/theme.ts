import { ref } from 'vue';
import { defTheme } from '../schema';
import { THEMES } from '../constants';
import { cached, cache } from './cache';

function checkThemePrefs() {
	let mediaPref, dayOrNight;
	const tiempo = new Date().getHours();
	const savedTheme = cached.theme;
	console.log('theme saved was', savedTheme);
	if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
		mediaPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : defTheme;
	}
	if (tiempo) dayOrNight = tiempo < 7 ?? tiempo > 19 ? 'night' : '';
	return savedTheme || mediaPref || dayOrNight || THEMES[1].title;
}

export const activeTheme = ref<string>(checkThemePrefs());

// removes all classes containing the string 'theme' from the element passed as a parameter
function removeGroupOfClassesFromEl(el: HTMLElement | null, str: string) {
	if (el) {
		const classes = el.classList;
		for (let i = 0; i < classes.length; i++) {
			if (classes[i].includes(str)) {
				classes.remove(classes[i]);
			}
		}
	}
}

function applyTheme(theme: string) {
	console.log('applying theme:', theme);
	const doc = document?.documentElement;
	console.log('applying theme to doc');
	removeGroupOfClassesFromEl(doc, 'theme');
	doc.classList.add(`theme-${theme}`);
	doc.setAttribute('data-theme', theme);
	cache('theme', theme);
	return theme;
}

export function setTheme(title: string): void {
	console.log('setting theme to', title);
	const titles = THEMES.map(t => t.title);
	console.log('titles of themes', titles);

	// if the title argument is one of the theme titles,
	if (titles.some(t => t === title)) {
		console.log('saves the arg as the active theme:', title);
		applyTheme(title);
		activeTheme.value = title;
		return;
	} else {
		console.log('not the title of a theme');
	}
}

export function nextTheme(): void {
	if (!activeTheme.value) return;
	// determines index of current active themes
	console.log('activeTheme.value', activeTheme.value);
	const currentIndex = THEMES.map(t => t.title).indexOf(activeTheme.value);
	console.log('currentIndex', currentIndex);
	const nextIndex = currentIndex + 1 >= THEMES.length ? 0 : currentIndex + 1;
	console.log('advancing theme to', THEMES[nextIndex].title);
	setTheme(THEMES[nextIndex].title);
}
