import {ref} from 'vue'

// a reference to the activeLots
export const activeLots = ref()

export function setLots(lots: string[]): void {
  console.log('setting lots', lots)
  if (lots) {
    activeLots.value = lots
    localStorage.setItem('lots', JSON.stringify(lots))
  }
}

export function saveLot(lot: string): void {
  console.log('saving lot', lot)
  const oldLots = activeLots.value
  console.log('oldLots', oldLots)
  if (oldLots) {
    oldLots.unshift(lot)
    setLots(oldLots)
  } else setLots([lot])
}

export function clearLots(): void {
  console.log('clearing lots')
  activeLots.value = []
  localStorage.removeItem('lots')
}

export function removeLot(lot: string): void {
  console.log('removing lot', lot)
  const oldLots = activeLots.value
  clearLots()
  const keepers =
    oldLots && oldLots.indexOf(lot) !== -1 ? oldLots.filter((l: string) => l !== lot) : oldLots
  if (keepers) setLots(keepers)
}
