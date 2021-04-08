import {reactive} from 'vue'
import {cfg} from '../store'
import {Hexagram} from '../schema'
import hexagrams from '../data/hexagrams.json'
import hermagrams from '../data/hermagrams.json'

export const useHexagrams = (): {
	getHexagrams: (wenny: boolean) => Map<symbol, Hexagram>
	getHexagramByOctal: (octal: string) => Hexagram | undefined
	getHexagramByWen: (wen: string) => Hexagram
	getHexagramByBin: (bin: string) => Hexagram
	getEnglishNameByBin: (bin: string) => string
	getWenByBin: (bin: string | undefined) => string
} => {
	const rx = reactive({
		hexagrams: cfg.gendy ? hexagrams : hermagrams,
	})

	function getHexagrams(wenny: boolean) {
		// console.log('getHexagrams', wenny)
		const order = wenny ? 'kingwen' : 'octal'
		return new Map(
			rx.hexagrams
				.slice(0)
				.sort((a: Hexagram, b: Hexagram) => {
					return Number(a[order]) - Number(b[order])
				})
				.map((h: Hexagram) => [Symbol(h.binary), h]),
		)
	}

	function getHexagramByBin(bin: string) {
		// console.log('getHexagramByBin', bin)
		// console.log('getting hexagram with bin', bin)
		return rx.hexagrams.filter((h) => {
			return h.binary.toString() === bin
		})[0]
	}

	function getHexagramByWen(wen: string) {
		// console.log('getHexagramByWen', wen)
		return rx.hexagrams.filter((h) => {
			return h.kingwen.toString() === wen
		})[0]
	}

	function getHexagramByOctal(octal: string) {
		// console.log('getHexagramByOctal', octal)
		const octalWithZeroes = octal.length === 1 ? '00' + octal : '0' + octal
		return rx.hexagrams.filter((h) => {
			return h.octal === octalWithZeroes
		})[0]
	}

	function binaryToOctal(bin: string) {
		// console.log('binaryToOctal', bin)
		// takes a binary string like 0b010110
		// converts it to a decimal number with parseInt
		// then converts this into an octal string with toString(8)
		return parseInt(bin.slice(2), 2).toString(8)
	}

	function getEnglishNameByBin(bin: string) {
		// console.log('getEnglishNameByBin', bin)
		return getHexagramByOctal(binaryToOctal(bin))?.names.english ?? ''
	}

	function getWenByBin(bin: string | undefined) {
		if (bin) {
			// console.log('getWenByBin', bin)
			return getHexagramByBin(bin)?.kingwen.toString()
		} else return '0'
	}

	return {
		getHexagrams,
		getHexagramByBin,
		getHexagramByOctal,
		getHexagramByWen,
		getWenByBin,
		getEnglishNameByBin,
	}
}
