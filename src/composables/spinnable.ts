import {ref, watchEffect} from 'vue'

interface SpinParams {
  getSpinning: () => boolean
  setSpinning: (state: boolean) => void
}

export const useSpinnable = (element: HTMLElement): SpinParams => {
  const spinning = ref(false)
  const mouseDetected = ref(false)
  const touchDetected = ref(false)
  const moveEvent = ref('')

  function measureDistance(el: HTMLElement, mX: number, mY: number) {
    const rect = el.getBoundingClientRect()
    const dist = Math.floor(
      Math.sqrt(
        Math.pow(mX - (rect.left + el.offsetWidth / 2), 2) +
          Math.pow(mY - (rect.top + el.offsetHeight / 2), 2),
      ),
    )
    // console.log('measuring distance', dist)
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
    // console.log('fluctuating spinner')
    // test for event type
    const me = isMouseEvent(ev)
    const te = isTouchEvent(ev)

    let mX = 0
    let mY = 0

    // get position of mouse or finger
    if (me) {
      mX = me.pageX
      mY = me.pageY
    } else if (te) {
      mX = te.touches[0].pageX
      mY = te.touches[0].pageY
    }

    // console.log('detected movement, propelling spinner', mX, mY)
    // calculate distance between these points every interval
    element.style.animationDuration = measureDistance(element, mX, mY) + 'ms'
  }

  // see if there's a mouse in the house
  function onMouseMove() {
    document.removeEventListener('mousemove', onMouseMove, false)
    mouseDetected.value = true
    trackUser()
    // initializeMouseBehavior();
  }

  // see if anyone's in touch
  function onTouchMove() {
    document.removeEventListener('touchmove', onTouchMove, false)
    touchDetected.value = true
    trackUser()
    // initializeTouchBehavior();
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

    trackUser()
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
