import {Hexagram} from '../schema'
import hexagrams from '../data/hexagrams.json'

export const useHexagrams = (): {
  getHexagrams: (wenny: boolean) => Map<symbol, Hexagram>
  getHexagramByOctal: (octal: string) => Hexagram | undefined
  getHexagram: (id: string) => Hexagram
} => {
  function getHexagrams(wenny: boolean) {
    const order = wenny ? 'kingwen' : 'octal'
    return new Map(
      hexagrams
        .slice(0)
        .sort((a: Hexagram, b: Hexagram) => {
          return Number(a[order]) - Number(b[order])
        })
        .map((h: Hexagram) => [Symbol(h.binary), h]),
    )
  }

  function getHexagram(id: string) {
    return hexagrams.filter((h) => {
      return h.kingwen.toString() === id
    })[0]
  }

  function getHexagramByOctal(octal: string) {
    return hexagrams.filter((h) => {
      console.log('h.octal', h.octal)
      console.log('octal', '0' + octal)
      return h.octal === '0' + octal
    })[0]
  }

  return {
    getHexagram,
    getHexagramByOctal,
    getHexagrams,
  }
}
