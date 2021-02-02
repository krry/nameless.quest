import {reactive, computed, ComputedRef, watch} from 'vue'

interface DragStyle {
	position?: string
	top?: string
	left?: string
	width?: string
	height?: string
	'box-shadow'?: string
	transform?: string
	cursor?: string
}

interface DragPos {
	init: boolean
	isDragging: boolean
	x: number
	y: number
	width: number
	height: number
	dragStartX: number
	dragStartY: number
}

interface DragParams {
	position: DragPos
	style: ComputedRef<DragStyle | undefined>
}

export const draggable = (element: HTMLElement | undefined): DragParams | undefined => {
	if (!element) return

	const position = reactive({
		init: false,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		isDragging: false,
		dragStartX: 0,
		dragStartY: 0,
	})

	const style = computed(
		(): DragStyle => {
			if (position.init) {
				return {
					position: 'absolute',
					left: `${position.x} px`,
					top: `${position.y} px`,
					width: `${position.width} px`,
					height: `${position.height} px`,
					'box-shadow': position.isDragging ? '3px 6px 1rem rgba(0, 0, 0, 0.15)' : '',
					transform: position.isDragging ? 'translate(-3px, -6px)' : '',
					cursor: position.isDragging ? 'grab' : 'pointer',
				}
			}
			return {}
		},
	)

	const onMouseMove = (event: MouseEvent): void => {
		const {clientX, clientY} = event
		position.x = clientX - position.dragStartX
		position.y = clientY - position.dragStartY
	}

	const onMouseUp = (): void => {
		position.isDragging = false
		position.dragStartX = 0
		position.dragStartY = 0
		document.removeEventListener('mousemove', onMouseMove)
	}

	const onMouseDown = (event: MouseEvent): void => {
		const {clientX, clientY} = event
		position.dragStartX = clientX - position.x
		position.dragStartY = clientY - position.y

		position.isDragging = true

		document.addEventListener('mouseup', onMouseUp, {once: true})
		document.addEventListener('mousemove', onMouseMove)
	}

	watch(element, (element /*, prevElement, onCleanup*/): void => {
		const rect = element.getBoundingClientRect()

		position.init = true
		position.x = Math.round(rect.x)
		position.y = Math.round(rect.y)
		position.width = Math.round(rect.width)
		position.height = Math.round(rect.height)

		element.addEventListener('mousedown', onMouseDown)

		// onCleanup(() => {
		// do cleanup
		// });
	})

	return {
		position,
		style,
	}
}
