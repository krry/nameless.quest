import {App} from 'vue'

const titlize = {
	install: (app: App): void => {
		app.config.globalProperties.$titlize = (str: string): string => {
			if (typeof str !== 'string') return ''
			// we split into an array of space-separated words
			const words = str.split(' ')
			const titledWords = words.map((w) => w.substr(0, 1).toUpperCase() + w.slice(1))
			// uppercase the first letter in each word
			return titledWords.join('')
			// then join the array into a string and return
		}
	},
}

const symbolize = {
	install: (app: App): void => {
		app.config.globalProperties.$symbolize = (seed: string | number | undefined): symbol => {
			return Symbol(seed)
		}
	},
}

const cruiseTo = {
	install: (app: App): void => {
		app.config.globalProperties.$cruiseTo = (el: HTMLElement): void => {
			el.scrollIntoView({behavior: 'smooth'})
		}
	},
}

export {titlize, symbolize, cruiseTo}
