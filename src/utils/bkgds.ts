export function sizeBg(): string {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const smallerDim = screenWidth < screenHeight ? screenWidth : screenHeight;
	if (smallerDim > 1080) return 'lg';
	if (smallerDim > 576) return 'md';
	else return 'sm';
}
