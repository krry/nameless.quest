import {ref} from 'vue'

interface SpinParams {
  getSpinning: () => boolean
  setSpinning: (state: boolean) => void
}

export const useSpinnable = (element: HTMLElement): SpinParams => {
  const moveEvent = ref('')
  const spinning = ref(false)
  const mouseDetected = ref(false)
  const touchDetected = ref(false)
  // console.log('making element spinnable', element)

  function measureDistance(mX: number, mY: number) {
    console.log('mX', mX)
    console.log('mY', mY)
    console.log('element.offsetWidth', element.offsetWidth)
    console.log('element.offsetHeight', element.offsetHeight)
    const rect = element.getBoundingClientRect()
    console.log('rect left', rect.left)
    console.log('rect top', rect.top)
    const dist = Math.floor(
      Math.sqrt(
        Math.pow(mX - (rect.left + element.offsetWidth / 2), 2) +
          Math.pow(mY - (rect.top + element.offsetHeight / 2), 2),
      ),
    )
    console.log('measuring distance', dist)
    return dist
  }

  function isMouseEvent(ev: Event): MouseEvent | undefined {
    if ((ev as MouseEvent).pageX !== undefined) {
      return ev as MouseEvent
    }
  }

  function isTouchEvent(ev: Event): TouchEvent | undefined {
    if ((ev as TouchEvent).touches !== undefined) {
      return ev as TouchEvent
    }
  }

  function fluctuateSpinner(ev: Event) {
    // console.log('fluctuating spinner as move occurs')
    // test for event type
    const me = isMouseEvent(ev)
    const te = isTouchEvent(ev)

    // get position of mouse or finger
    // calculate distance between these points every interval
    if (me) {
      element.style.animationDuration = measureDistance(me.pageX, me.pageY) + 'ms'
    } else if (te) {
      element.style.animationDuration =
        measureDistance(te.touches[0].pageX, te.touches[0].pageY) + 'ms'
    }
  }

  // see if there's a mouse in the house
  function onMouseMove() {
    if (!mouseDetected.value) mouseDetected.value = true
    document.removeEventListener('mousemove', onMouseMove, false)
    trackUser()
  }

  // see if anyone's in touch
  function onTouchMove() {
    if (!touchDetected.value) touchDetected.value = true
    document.removeEventListener('touchmove', onTouchMove, false)
    trackUser()
  }

  // listen to users' movements
  function trackUser() {
    // console.log('tracking user')
    if (touchDetected.value) {
      moveEvent.value = 'touchmove'
    } else if (mouseDetected.value) {
      moveEvent.value = 'mousemove'
    }
    // console.log('wiring up spinning to', moveEvent.value)
    document.addEventListener(moveEvent.value, fluctuateSpinner)
  }

  function senseMovement() {
    // console.log('spinnable mounted')
    // allow :active styles to work in CSS on mobile safari
    document.addEventListener(
      'touchstart',
      function () {
        // console.log('touch happens')
      },
      true,
    )
    // sniff whether we have a toucher or a clicker
    document.addEventListener('mousemove', onMouseMove, false)
    document.addEventListener('touchmove', onTouchMove, false)
  }

  function ignoreMovement() {
    document.removeEventListener(
      'touchstart',
      function () {
        // console.log('touch happens')
      },
      true,
    )
    document.removeEventListener('mousemove', onMouseMove, false)
    document.removeEventListener('touchmove', onTouchMove, false)
    document.removeEventListener(moveEvent.value, fluctuateSpinner)
    document.removeEventListener('all', fluctuateSpinner)
  }

  function getSpinning() {
    // console.log('getting spinning', spinning.value)
    return spinning.value
  }

  function setSpinning(state: boolean) {
    spinning.value = state
    if (state) {
      senseMovement()
      element.style.animationPlayState = 'running'
    } else {
      ignoreMovement()
      element.style.animationPlayState = 'paused'
    }
    // console.log('spinning set to', spinning.value)
  }

  return {
    getSpinning,
    setSpinning,
  }
}
