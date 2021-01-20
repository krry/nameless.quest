import {Trigram} from '../schema'
import trigrams from '../data/trigrams.json'

export const useTrigrams = (): {
  getTrigram: (index: number) => Trigram
  getTrigrams: () => Trigram[]
} => {
  function getTrigrams() {
    return trigrams.slice(0)
  }

  function getTrigram(index: number) {
    return trigrams[index]
  }

  return {
    getTrigram,
    getTrigrams,
  }
}
