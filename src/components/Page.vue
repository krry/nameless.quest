<template lang="pug">
main.desk.flex.string(
  :style="{backgroundImage: backdrop}"
  )
  .page.rel.flex.mid.col
    slot
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect, onMounted} from 'vue'
import {activeTheme} from '../store/theme'
import {getRandTo} from '../utils'
import * as drawer from '../utils/drawer'

export default defineComponent({
	name: 'HexaGrid',
	setup() {
		const backdrop = ref('')

		function sizeBg() {
			const screenWidth = window.innerWidth
			const screenHeight = window.innerHeight
			const smallerDim = screenWidth < screenHeight ? screenWidth : screenHeight
			if (smallerDim > 1080) return 'bg-lg/'
			if (smallerDim > 576) return 'bg-md/'
			else return 'bg-sm/'
		}

		watchEffect(() => {
			backdrop.value = 'url(/' + sizeBg() + activeTheme.value + getRandTo(3) + '.jpg)'
		})

		onMounted(() => drawer.close())

		return {
			backdrop,
		}
	},
})
</script>

<style lang="postcss">
.desk {
	position: relative;
	z-index: 10;
	background-color: var(--paper);
	background-repeat: no-repeat;
	background-position: right center;
	background-attachment: fixed;
	background-size: cover;
	font-size: var(--font-clamp);
	pointer-events: auto;
	margin-left: var(--drawer-buffer);
	box-shadow: 0 0 0.5rem var(--glow);
	border-left: var(--frame) solid var(--glow);
	scroll-snap-align: start;
	min-width: calc(100vw - var(--drawer-dim));
	width: 100vw;
	max-width: 100vw;
	min-height: calc(100vh + 1px);

	@media (min-width: 36rem) {
		margin-left: var(--drawer-dim);
		padding-left: 2rem;
		padding-right: 2rem;
	}

	@media (min-width: 36rem) and (min-height: 36rem) {
		padding: 3rem;
		min-height: 100vh;
	}

	@media (min-width: 48rem) and (min-height: 48rem) {
		padding: 4rem;
	}
}

.page {
	font-size: 125%;
	flex: 1 0 auto;
	overflow-y: auto;
	margin: auto;
	background-color: var(--silk);
	padding: 1rem;
	width: calc(100vw - 4em);
	max-width: 48rem;

	@media (min-height: 36rem) {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}

	@media (min-height: 48rem) {
		padding-top: 3rem;
		padding-bottom: 3rem;
	}

	@media (min-width: 36rem) {
		border-radius: var(--bevels);
	}

	@media (min-width: 48rem) {
		width: auto;
		padding-left: 2rem;
		padding-right: 2rem;
		max-width: 72ch;
	}

	@media (min-width: 64rem) {
		padding-left: 3rem;
		padding-right: 3rem;
		max-width: 80ch;
	}
}

.page h1:first-of-type,
.page h1:first-child,
.page h2:first-child {
	margin-top: 1em;
	@supports (font-variation-settings: normal) {
		font-family: 'MuseoModernoVariable';
		font-variation-settings: 'wght' 666;
	}
}

.page h2,
.page h3,
.page blockquote,
.page p {
	max-width: 48rem;
	margin-left: auto;
	margin-right: auto;
}

.page p {
	line-height: var(--pleading);
	margin: 0.5em;
}

.callout {
	margin: 1.5em 0;
	padding: 1.5em;
	color: var(--ink);
	background-color: var(--ground);
	box-shadow: inset 0 0 0.25rem 0 var(--ink);
	border-radius: var(--bevel);
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 444;
	}
}

.callout strong {
	color: var(--flair);
}

.callout p {
	text-align: left;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 444;
	}
}

.callout h4 {
	text-align: center;
	font-variant: small-caps;
}

.page .toc {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	list-style: none;
}

.page .toc li {
	position: relative;
	font-size: 1.125em;
	font-variant: small-caps;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 666;
	}

	@media (min-width: 48rem) {
		padding: 0 0.5rem;
		flex-basis: 50%;
	}

	@media (min-width: 64rem) {
		padding: 0 1rem;
		flex-basis: 33%;
	}
}

.toc a.btn {
	font-family: var(--font);
	color: var(--flair);
	padding: 0.75rem;
	text-align: center;
}

.page section {
	border: 1px var(--border-style) var(--glow);
	border-radius: var(--bevel);
	margin: 2rem 0;
	padding: 1rem;
	@media (min-width: 36rem) {
		padding: 2rem;
	}
}

section {
	text-align: center;
}

section p,
section li {
	text-align: left;
}

.page h1,
.page h2 {
	text-align: center;
}

.page section h2 {
	text-align: center;
}
</style>
