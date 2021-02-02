import {reactive} from 'vue'
import {Hexagram} from '../schema'
import hexagrams from '../data/hexagrams.json'

export const useHexagrams = (): {
	getHexagrams: (wenny: boolean) => Map<symbol, Hexagram>
	getHexagramByOctal: (octal: string) => Hexagram | undefined
	getHexagramByWen: (wen: string) => Hexagram
	getHexagramByBin: (bin: string) => Hexagram
	getEnglishNameByBin: (bin: string) => string
	getWenByBin: (bin: string) => string
} => {
	const rx = reactive({
		hexagrams: hexagrams,
	})

	function getHexagrams(wenny: boolean) {
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
		return rx.hexagrams.filter((h) => {
			return h.binary.toString() === bin
		})[0]
	}

	function getHexagramByWen(wen: string) {
		return rx.hexagrams.filter((h) => {
			return h.kingwen.toString() === wen
		})[0]
	}

	function getHexagramByOctal(octal: string) {
		return rx.hexagrams.filter((h) => {
			return h.octal === '0' + octal
		})[0]
	}

	function binaryToOctal(bin: string) {
		// takes a binary string like 0b010110
		// converts it to a decimal number with parseInt
		// then converts this into an octal string with toString(8)
		return parseInt(bin.slice(2), 2).toString(8)
	}

	function getEnglishNameByBin(bin: string) {
		return getHexagramByOctal(binaryToOctal(bin))?.names.english ?? ''
	}

	function getWenByBin(bin: string) {
		return getHexagramByOctal(binaryToOctal(bin))?.kingwen.toString() ?? '0'
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
