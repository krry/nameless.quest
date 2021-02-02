export const AutoResize = {
	mounted(el: HTMLElement): void {
		const height = el.scrollHeight
		el.setAttribute('style', `height: ${height}px; overflow-y: hidden;`)
		el.addEventListener('input', OnInput, false)

		function OnInput() {
			const height = el.scrollHeight
			el.style.height = 'auto'
			if (el.value !== '') {
				el.style.height = `${height}px`
			}
		}
	},
}
