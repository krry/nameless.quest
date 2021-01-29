import {computed} from 'vue'
import {Roll, defRoll} from '../schema'

// a reference to the activeRoll
export const activeRoll = computed(() => getRolls()[0])

export const getRolls = (): Roll[] => {
  const storedRolls = localStorage.getItem('rolls') || '[]'
  try {
    return JSON.parse(storedRolls)
  } catch (e) {
    console.error("couldn't parse", storedRolls, e)
    return [defRoll]
  }
}

export const saveRoll = (roll: Roll): void => {
  const rolls = getRolls()
  localStorage.setItem('rolls', JSON.stringify(rolls.unshift(roll)))
}
