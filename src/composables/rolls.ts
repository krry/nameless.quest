/* eslint-disable @typescript-eslint/explicit-function-return-type */
// adpated from @Cathrine's composable tabs
// https://gist.github.com/cathrinevaage/4eed410b31826ce390153d6834909436

// composables/rolls.ts

import {
  reactive,
  ref,
  readonly,
  InjectionKey,
  provide,
  inject,
  Ref,
  onUnmounted,
  computed,
  ComputedRef,
} from 'vue'

import {Roll} from '../schema'

const rollsInjectionKey = Symbol('rolls') as InjectionKey<{
  registerRoll: (identifier: string, rollData: Roll) => void
  deregisterRoll: (identifier: string) => void
  activeRoll: Readonly<Ref<string>>
}>

export const useRolls = (): {
  getActiveRoll: () => Roll | undefined
  setActiveRoll: (identifer: string) => void
} => {
  const rolls = reactive(new Map<string, Roll>())

  const activeRoll = ref<string>()

  const registerRoll = (identifier: string, rollData: Roll) => {
    rolls.set(identifier, rollData)
  }

  const deregisterRoll = (identifier: string) => {
    rolls.delete(identifier)
  }

  provide(rollsInjectionKey, {
    registerRoll,
    deregisterRoll,
    activeRoll: readonly(activeRoll),
  })

  const setActiveRoll = (identifier: string) => {
    // console.log('setting active roll from', activeRoll.value, "to", identifier);
    activeRoll.value = identifier
  }

  const getActiveRoll = () => {
    if (activeRoll.value) {
      // console.log('getting active roll', rolls.get(activeRoll.value));
      return rolls.get(activeRoll.value)
    } else {
      console.warn('No active roll to get yet')
    }
  }

  return {
    getActiveRoll,
    setActiveRoll,
  }
}

export const useRoll = (
  rollData: Roll,
): {
  isActive: ComputedRef<void>
  rollId: string
} => {
  const rollsInjection = inject(rollsInjectionKey)

  if (!rollsInjection) {
    throw new Error('Rolls were not provided')
  }

  const {registerRoll, deregisterRoll, activeRoll} = rollsInjection

  const rollId = rollData.toss

  registerRoll(rollId, rollData)

  onUnmounted(() => {
    deregisterRoll(rollId)
  })

  const isActive = computed(() => {
    activeRoll.value === rollId
  })

  return {
    isActive,
    rollId: rollId,
  }
}
