// https://codepen.io/krry/pen/NmpVLv

var hexagramObj = {
  "0binary": {
    "hexagram": String,     // unicode glyph \4dc0 to \4dff
    "kingwen": Number,      // decimal 1 to 64
    "name": {
      "chinese": String,    // 1 or 2 hanzi characters
      "pinyin": String,     // 1 or 2 transliterated words
      "english": String,    // up to 4 words, maybe parenthetical
    },
    "trigramPair": {
      "above": Number,      // 1 to 8, indicating a bagua or trigram
      "below": Number
    },
    "judgement": String,    // multiline sentence, leading with name.english
    "images": String,       // multiline sentence naming the trigrams
    "lines": [              // Array of up to 6 changing line interpretations
      {
        "position": Number, // 1 to 6, indicating bottom to top line
        "meaning": String,  // often multiline
      }
    ]
  }
}
