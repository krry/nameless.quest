/**
 * SWIPEABLE
 *
 * originally nabbed from https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d#gistcomment-3385647
 *
 * @param   {[TouchEvent]}  useSwipeable  [carries the touch handlers into a components]
 * @injects {{Function}} handleSwipeStart, handleSwipeEnd
 * @return  {[(TouchEvent) => void]} [return eventListener callback functions]
 *
 * USAGE:
 * const gestureZone = document.querySelector('gestureZone')
 *
 * if (!gestureZone) return
 * gestureZone.addEventListener(
 *   'touchstart',
 *   handleSwipeStart,
 *   false,
 * )
 *
 * gestureZone.addEventListener(
 *   'touchend',
 *   handleSwipeEnd,
 *   false,
 * )
 *
 */

export const useSwipeable = (): {
  handleSwipeStart: (ev: TouchEvent) => void
  handleSwipeEnd: (ev: TouchEvent) => void
} => {
  let startX = 0
  let startY = 0

  function handleSwipeStart(ev: TouchEvent) {
    startX = ev.changedTouches[0].screenX
    startY = ev.changedTouches[0].screenY
  }

  function handleSwipeEnd(ev: TouchEvent) {
    const diffX = ev.changedTouches[0].screenX - startX
    const diffY = ev.changedTouches[0].screenY - startY
    const ratioX = Math.abs(diffX / diffY)
    const ratioY = Math.abs(diffY / diffX)
    const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY)

    // Ignore small movements.
    if (absDiff < 30) {
      return
    }

    if (ratioX > ratioY) {
      if (diffX >= 0) {
        console.log('right swipe')
      } else {
        console.log('left swipe')
      }
    } else {
      if (diffY >= 0) {
        console.log('down swipe')
      } else {
        console.log('up swipe')
      }
    }
  }
  return {
    handleSwipeStart,
    handleSwipeEnd,
  }
}
