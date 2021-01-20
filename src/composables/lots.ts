/* eslint-disable @typescript-eslint/explicit-function-return-type */
// adpated from @Cathrine's composable tabs
// https://gist.github.com/cathrinevaage/4eed410b31826ce390153d6834909436

// composables/lots.ts

import {
  ref,
  Ref,
  reactive,
  InjectionKey,
  provide,
  inject,
  onUnmounted,
  computed,
  ComputedRef,
} from 'vue'

import {Hexagram} from '../schema'

interface HexData {
  hex: Hexagram
  id: string
}

const lotsInjectionKey = Symbol('lots') as InjectionKey<{
  registerLot: (identifier: string, hexData: HexData) => void
  deregisterLot: (identifier: string) => void
  lots: Ref<string[]>
}>

export const useLots = (): {
  getLots: () => string[]
  setLots: (identifiers: string[]) => void
  nixLot: (identifier: string) => void
} => {
  const hexes = reactive(new Map<string, HexData>())

  const registerLot = (identifier: string, hexData: HexData) => {
    hexes.set(identifier, hexData)
  }

  const deregisterLot = (identifier: string) => {
    hexes.delete(identifier)
  }

  const lots = ref([''])

  provide(lotsInjectionKey, {
    registerLot,
    deregisterLot,
    lots: lots,
  })

  const getLots = (): string[] => {
    // console.log('getting lots', toRaw(lots.value))
    return lots.value
  }

  const setLots = (identifiers: string[]) => {
    console.log('setting lots to', identifiers)
    lots.value = identifiers
  }

  const nixLot = (binary: string) => {
    // console.log('nixing a lot', binary[0]);
    // console.log('from these lots', toRaw(lots.value));
    lots.value = lots.value.filter((lot) => {
      // console.log('do they match?', binary[0], lot, lot !== binary[0]);
      return lot !== binary[0]
    })
  }

  return {
    getLots,
    setLots,
    nixLot,
  }
}

export const useLot = (hexData: HexData): {isActive: ComputedRef<number>} => {
  const lotsInjection = inject(lotsInjectionKey)

  if (!lotsInjection) {
    throw new Error('Lots were not provided')
  }

  const {registerLot, deregisterLot, lots} = lotsInjection

  const lotId = hexData.id

  registerLot(lotId, hexData)

  onUnmounted(() => {
    deregisterLot(lotId)
  })

  const isActive = computed((): number => {
    const index = lots.value.indexOf(lotId)
    // console.log('index of lots value', index);
    return index
  })

  return {
    isActive,
  }
}
