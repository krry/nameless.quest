import {App} from 'vue'

const titleCase = {
  install: (app: App): void => {
    app.config.globalProperties.$titleCase = (str: string) => {
      if (typeof str !== 'string') return
      // we split into an array of space-separated words
      const words = str.split(' ')
      const titledWords = words.map((w) => w.substr(0, 1).toUpperCase() + w.slice(1))
      // uppercase the first letter in each word
      return titledWords.join('')
      // then join the array into a string and return
    }
  },
}

const getSymbol = {
  install: (app: App): void => {
    app.config.globalProperties.$getSymbol = (seed: string | number | undefined) => {
      return Symbol(seed)
    }
  },
}

export {titleCase, getSymbol}
