// I'm thinking of a number between one and …
export function getRandTo(max: number): number {
	return Math.floor(Math.random() * max) + 1;
}

export function isEmptyObject(obj: Record<string, unknown>): boolean {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}

type Node = string | number | symbol | null | undefined;

export function getRandNode(arr: Node[]): Node {
	return arr[getRandTo(arr.length)];
}

export const cruiseTo = (el?: HTMLElement): void => {
	console.log(el, 'el to cruise to');
	if (el) el.scrollIntoView({ behavior: 'smooth' });
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

export const lineIconByNumber = (char?: string): string | undefined => {
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
			return;
	}
};

export function hideLogsInProd(): void {
	if (process.env.NODE_ENV === 'production') {
		console.log = () => false;
		console.info = () => false;
		console.warn = () => false;
		console.error = () => false;
	}
}
