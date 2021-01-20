import {Hexagram} from '../schema'
import hexagrams from '../data/hexagrams.json'

export const useHexagrams = (): {
  getHexagrams: (wenny: boolean) => Map<symbol, Hexagram>
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

  return {
    getHexagram,
    getHexagrams,
  }
}
