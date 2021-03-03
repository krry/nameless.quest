// types and defaults

export const defTheme = ''

export interface Hexaname {
	chinese: string
	pinyin: string
	english: string
}

export interface Gram {
	position: number
	meaning: string
	ruler?: string
}

export interface TrigramPair {
	above: number
	below: number
}

export interface Trigram {
	trigram: string
	name: {
		en: string
		zh: string
		pn: string
	}
}

export interface Hexagram {
	binary: string
	hexagram: string
	kingwen: number
	names: Hexaname
	octal: string
	trigramPair: TrigramPair
	judgment: string
	images: string
	lines: Gram[]
}

export const defHex: Hexagram = {
	binary: '0b000012', // "0b010101"
	octal: '78', // "[0-7][0-7]", e.g., 43
	hexagram: '䷆', // unicode glyph \4dc0 to \4dff
	kingwen: 0, // decimal 1 to 64
	names: {
		chinese: '師', // 1 or 2 hanzi characters
		pinyin: 'shī', // 1 or 2 transliterated words
		english: 'The Metamorphosis', // up to 4 words, maybe parenthetical
	},
	trigramPair: {
		above: 0, // 1 to 8, indicating a bagua or trigram
		below: 2,
	},
	judgment:
		'Gewöhnlich glaubt der Mensch, wenn er gut gezogen, Wird selbst ein weiser Mann gewogen. Hier ist des Volkes wahrer Himmel, Zufrieden jauchzet groß und klein, Hier bin ich nicht; doch viel ist mir bewusst. Es irrt der Mensch, wenn er sie beim Kragen hätte.',
	images:
		' Ich bin von je der Ordnung Freund gewesen. Ich bin Ein Teil von jener Kraft, Die stets das Gute schafft. Ich bin von je der Ordnung Freund gewesen.',
	lines: [
		{
			position: 5,
			meaning:
				'Vom Rechte, das mit Recht; denn alles, was ihr Sünde, Zerstörung, kurz das Böse will und stets das Gute schafft.',
			ruler: 'gobernding',
		},
	],
}

export interface Roll {
	uid: string
	query: string
	toss: string
	moment: Date
	id?: string
	notes?: string
}

export const defRoll: Roll = {
	query: '',
	toss: '',
	moment: new Date(),
	uid: '',
	// notes: '',
}

export interface Quad {
	yPos: string
	xPos: string
	edge: string
	middle: string
}

export const defQuad: Quad = {
	yPos: '',
	xPos: '',
	edge: '',
	middle: '',
}

export interface Person {
	name: string
	face: string
	location: Geolocation
}

export interface Enquiry {
	time: Date
	user: Person
	query: string
	roll: Roll
}

export interface Bounds {
	top: number
	right: number
	bottom: number
	left: number
}

export const defBounds: Bounds = {
	top: 120,
	right: 240,
	bottom: 240,
	left: 120,
}

export interface Token {
	val: string
	expiration: number
}

export const defToken: Token = {
	val: 'holytokenstringsbatman1234567',
	expiration: 1610861293901,
}

export interface User {
	id: symbol
	email: string
	authd: boolean
	token: Token
}

export const defUser: User = {
	id: Symbol('human.name@domain.tld'),
	email: 'human.name@domain.tld',
	authd: true,
	token: defToken,
}
