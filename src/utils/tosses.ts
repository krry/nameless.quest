function firstHexMatch(char: string): string {
	switch (char) {
		case '6':
			return '0';
		case '7':
			return '1';
		case '8':
			return '0';
		case '9':
			return '1';
		default:
			return 'x';
	}
}

function secondHexMatch(char: string): string {
	switch (char) {
		case '6':
			return '1';
		case '7':
			return '1';
		case '8':
			return '0';
		case '9':
			return '0';
		default:
			return 'x';
	}
}

export const parseTossToBinary = (toss: string): string[] => {
	// console.log('parsing toss to binary', toss)
	if (toss.length !== 6 || !toss) return [''];

	// const properlyOrderedToss = toss.split('').reverse().join('')

	const firstHex =
		'0b' +
		toss
			.split('')
			.map((c: string): string => {
				return firstHexMatch(c);
			})
			.join('');

	const secondHex =
		'0b' +
		toss
			.split('')
			.map((c: string): string => {
				return secondHexMatch(c);
			})
			.join('');

	// console.log('[firstHex, secondHex]', [firstHex, secondHex])
	if (firstHex === secondHex) {
		return [firstHex];
	}
	const lots = [firstHex, secondHex];

	// console.log('binary parsed to', lots)
	return lots;
};

const yarrowOdds = {
	6: 0.0625,
	7: 0.3125,
	8: 0.4375,
	9: 0.1875,
};

// const threeCoinOdds = {
// 	6: 0.125,
// 	7: 0.375,
// 	8: 0.375,
// 	9: 0.125,
// }

export const generateRandomToss = (): number => {
	return parseInt(
		Array(6)
			.fill(0)
			.map(() => {
				return randomFlip(yarrowOdds);
			})
			.join(''),
		10
	);
};

function randomFlip(spec: { [key: number]: number }) {
	let i;
	let sum = 0;
	const r = Math.random();

	for (i in spec) {
		sum += spec[i];
		if (r <= sum) return parseInt(i, 10);
	}
} // random in distribution...
