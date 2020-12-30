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

export const defaultHexagram: Hexagram = {
  binary: '0b000000', // "0b010101"
  octal: '00', // "[0-7][0-7]", e.g., 43
  hexagram: '䷁', // unicode glyph \4dc0 to \4dff
  kingwen: 2, // decimal 1 to 64
  names: {
    chinese: '坤', // 1 or 2 hanzi characters
    pinyin: 'kūn', // 1 or 2 transliterated words
    english: 'The Receptive (Earth)', // up to 4 words, maybe parenthetical
  },
  trigramPair: {
    above: 0, // 1 to 8, indicating a bagua or trigram
    below: 0,
  },
  judgment: 'It furthers one to see about the Great Earth', // multiline sentence, leading with name.english
  images: "The earth's condition is receptive devotion.", // multiline sentence naming the trigrams
  lines: [
    // Array of up to 6 changing line interpretations
    {
      position: 1, // 1 to 6, indicating bottom to top line
      meaning: 'Where there is hoarfrost underfoot, solid ice is not far off.', // often multiline
    },
  ],
}
