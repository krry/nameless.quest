import {set} from '../store'

export function bound(): void {
	if (document.documentElement.scrollLeft <= 250) {
		set('drawer', true)
	} else set('drawer', false)
}

export function open(): void {
	window.scrollTo(0, document.documentElement.scrollTop)
}

export function close(): void {
	const drawerWidth = window.innerWidth < 576 ? window.innerWidth - 48 : 360
	console.log('closing drawer to', drawerWidth)
	window.scrollTo(drawerWidth, document.documentElement.scrollTop)
}

export function handle(bit: boolean): void {
	if (bit) open()
	else close()
}
