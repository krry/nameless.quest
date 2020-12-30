// https://codepen.io/krry/pen/NmpVLv
export interface Hexaname {
  chinese: string
  pinyin: string
  english: string
}

export interface Gram {
  position: number
  meaning: string
}

export interface TrigramPair {
  above: number
  below: number
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
  binary: '0b000010', // "0b010101"
  octal: '02', // "[0-7][0-7]", e.g., 43
  hexagram: '䷆', // unicode glyph \4dc0 to \4dff
  kingwen: 7, // decimal 1 to 64
  names: {
    chinese: '師', // 1 or 2 hanzi characters
    pinyin: 'shī', // 1 or 2 transliterated words
    english: 'The Army', // up to 4 words, maybe parenthetical
  },
  trigramPair: {
    above: 0, // 1 to 8, indicating a bagua or trigram
    below: 2,
  },
  judgment: 'The Army. The army needs perseverance\nAnd a strong man.\nGood fortune without blame.\n', // multiline sentence, leading with name.english
  images: "In the middle of the earth is water:\nThe image of the Army.\nThus the superior man increases his masses\nBy generosity toward the people.\n", // multiline sentence naming the trigrams
  lines: [
    // Array of up to 6 changing line interpretations
    {
      "position": 5,
      "meaning": "There is game in the field.\nIt furthers one to catch it.\nWithout blame.\nLet the eldest lead the army.\nThe younger transports corpses;\nThen perseverance brings misfortune.\n"
    },
],
}

export interface Roll {
  coinToss: number,
  toBinary: string,
  hex: Hexagram,
  changing: number[],
}

export const defRoll: Roll = {
  coinToss: 888898,
  toBinary: "0b000010",
  hex: defHex,
  changing: [5],
}
