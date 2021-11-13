export const cruiseTo = (el?: HTMLElement): void => {
	el?.scrollIntoView({ behavior: 'smooth' });
};

export const symbolize = (seed: string | number | undefined): symbol => {
	if (!seed) return Symbol(Math.random());
	return Symbol(seed);
};

export const titlize = (str: string): string => {
	if (typeof str !== 'string') return '';
	// we split into an array of space-separated words
	const words = str.split(' ');
	const titledWords = words.map(w => w.substr(0, 1).toUpperCase() + w.slice(1));
	// uppercase the first letter in each word
	return titledWords.join('');
	// then join the array into a string and return
};

export const lineIconByNumber = (char?: string): string => {
	switch (char) {
		case '6':
			return 'IconSix';
		case '7':
			return 'IconSeven';
		case '8':
			return 'IconEight';
		case '9':
			return 'IconNine';
		default:
			return '';
	}
};
