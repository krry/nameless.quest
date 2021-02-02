import {ref} from 'vue'
import {cfg, set} from '../store'

interface SpinParams {
	getSpinning: () => boolean
	setSpinning: (state: boolean) => void
}

export const useSpinnable = (element: HTMLElement): SpinParams => {
	const moveEvent = ref('')
	const spinning = ref(false)
	// console.log('making element spinnable', element)

	function measureDistance(mX: number, mY: number) {
		// console.log('mX, mY', mX, mY)
		// console.log('element.offsetWidth, element.offsetHeight', element.offsetWidth, element.offsetHeight)
		const rect = element.getBoundingClientRect()
		// console.log('rect left top', rect.left, rect.top)
		const dist = Math.floor(
			Math.sqrt(
				Math.pow(mX - (rect.left + element.offsetWidth / 2), 2) +
					Math.pow(mY - (rect.top + element.offsetHeight / 2), 2),
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
		// console.log('fluctuating spinner as move occurs')
		// test for event type
		const me = isMouseEvent(ev)
		const te = isTouchEvent(ev)

		// get position of mouse or finger
		// calculate distance between these points every interval
		if (me) {
			element.style.animationDuration = `${measureDistance(me.pageX, me.pageY)} ms`
		} else if (te) {
			element.style.animationDuration = `${measureDistance(
				te.touches[0].pageX,
				te.touches[0].pageY,
			)} ms`
		}
	}

	// see if there's a mouse in the house
	function onMouseMove() {
		set('mouseDetected', true)
		trackUser()
	}

	// see if anyone's in touch
	function onTouchMove() {
		set('touchDetected', true)
		trackUser()
	}

	// listen to users' movements
	function trackUser() {
		// console.log('tracking user')
		if (cfg.touchDetected) {
			moveEvent.value = 'touchmove'
		} else if (cfg.mouseDetected) {
			moveEvent.value = 'mousemove'
		}
		// console.log('wiring up spinning to', moveEvent.value)
		document.addEventListener(moveEvent.value, fluctuateSpinner)
	}

	function senseMovement() {
		// console.log('spinnable mounted')
		// to allow :active styles to work in CSS on mobile safari
		// capture touchstart events for a tick and do nothing
		// prettier-ignore
		document.addEventListener('touchstart', ()=>{/**/}, true)
		// sniff out whether we have a toucher or a clicker
		document.addEventListener('mousemove', onMouseMove, {once: true})
		document.addEventListener('touchmove', onTouchMove, {once: true})
	}

	function ignoreMovement() {
		// prettier-ignore
		document.removeEventListener( 'touchstart', ()=>{/**/}, true)
		document.removeEventListener(moveEvent.value, fluctuateSpinner)
		// document.removeEventListener('all', fluctuateSpinner)
	}

	function getSpinning(): boolean {
		// console.log('getting spinning', spinning.value)
		return spinning.value
	}

	function setSpinning(state: boolean): void {
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

	function giveItAWhirl(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			setSpinning(!getSpinning())
			element.blur()
		}
	}

	element.addEventListener('keydown', giveItAWhirl)

	return {
		getSpinning,
		setSpinning,
	}
}
