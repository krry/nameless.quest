function firstHexMatch(char: string): string {
  switch (char) {
    case '6':
      return '0'
    case '7':
      return '1'
    case '8':
      return '0'
    case '9':
      return '1'
    default:
      return 'x'
  }
}

function secondHexMatch(char: string): string {
  switch (char) {
    case '6':
      return '1'
    case '7':
      return '1'
    case '8':
      return '0'
    case '9':
      return '0'
    default:
      return 'x'
  }
}

export const parseTossToBinary = (toss: string): string[] => {
  // console.log('parsing toss to binary', toss);
  if (toss.length !== 6 || !toss) return ['']

  const properlyOrderedToss = toss.split('').reverse().join('')

  const firstHex =
    '0b' +
    properlyOrderedToss
      .split('')
      .map((c: string): string => {
        return firstHexMatch(c)
      })
      .join('')

  const secondHex =
    '0b' +
    properlyOrderedToss
      .split('')
      .map((c: string): string => {
        return secondHexMatch(c)
      })
      .join('')

  if (firstHex === secondHex) {
    return [firstHex]
  }
  const lots = [firstHex, secondHex]

  // console.log('binary parsed to', lots);
  return lots
}

export const generateRandomToss = (): number => {
  function randomFlip(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }
  return parseInt(
    Array(6)
      .fill(0)
      .map((): number => {
        return randomFlip(6, 9)
      })
      .join(''),
  )
}

interface SavedData {
  stored: string[]
  timestamp: number
}

export function checkForFreshData(data: SavedData[]): SavedData | null {
  if (!data) return null
  // sort data by greater timestamp
  const laterData = data.sort((a, b) => b.timestamp - a.timestamp)
  const now = new Date().getTime()
  // if latest datum is less than a day old, it is fresh
  return now - laterData[0].timestamp < 1000 * 60 * 60 * 24 ? laterData[0] : null
}

export function checkForSavedData(nym: string): SavedData[] | null {
  console.log(`checking localStorage for ${nym}`)
  const savedString = localStorage.getItem(nym)
  if (!savedString) return null
  const savedData = JSON.parse(savedString)
  console.log('found stored data:', savedData)
  return savedData
}

export function checkForFreshSavedData(nym: string): string[] {
  const savedData = checkForSavedData(nym)
  if (!savedData) return ['']
  const freshData = checkForFreshData(savedData)
  if (!freshData || !freshData.stored) return ['']
  return freshData.stored
}

export function saveNewDatum(nym: string, goo: string[]): boolean {
  if (!nym || !goo) return false
  // first check for existing data with the same nym
  const savedData = checkForSavedData(nym) || []
  savedData.push({stored: goo, timestamp: new Date().getTime()})
  localStorage.setItem(nym, JSON.stringify(savedData))
  return true
}
