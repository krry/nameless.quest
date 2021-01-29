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
