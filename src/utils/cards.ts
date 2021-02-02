/**
 * cards.ts
 *
 * manages the positioning of cards relative to their tiles
 * had to build this because popper.js ain't work with Vue 3 yet
 */

import {Bounds, Quad} from '../schema'

export const determineQuadrant = (bounds: Bounds): Quad => {
	const fullWidth = document.body.offsetWidth
	const fullHeight = document.body.offsetHeight
	const xHalf = fullWidth / 2 > bounds.left ? 'left' : 'right'
	const yHalf = fullHeight / 2 > bounds.top ? 'top' : 'bottom'
	let edge = ''
	if (bounds.left < 240 || fullWidth - bounds.right < 240) {
		edge = 'edge'
	}
	if (bounds.left < 120 || fullWidth - bounds.right < 120) {
		edge = 'extreme'
	}

	const middle =
		// in the middle third of the vertical window space
		bounds.top > fullHeight * 0.25 && bounds.bottom < fullHeight * 0.75 ? 'middle' : ''

	const quadrant = {
		yPos: yHalf,
		xPos: xHalf,
		edge: edge,
		middle: middle,
	}
	// console.log('bounds of tile', bounds)
	// console.log('card to quadrant', quadrant)
	return quadrant
}
/*
Result: {
  yPos: "top",
  xPos: "right",
  edge: "edge",
  middle: "middle" }

top: 385.45001220703125
right: 1243.6833190917969
bottom: 448.1000213623047
left: 1096.316650390625

width: 147.36666870117188
height: 62.65000915527344

x: 1096.316650390625
y: 385.45001220703125

quadrant determined to be
*/
