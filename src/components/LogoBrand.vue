<template lang="pug">
.brand(
	:class="direction, size, {grows: grows}"
	@click.stop="isSpinning = !isSpinning"
	tabindex="0"
	)
	transition(name="popup" appear)
		Spinnable
			.logo
	.stack.reveal(v-if="!noname")
		router-link(to="/")
			h1.nameless#llamo {{ title }}
			slot(name="tagline")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {SITE_TITLE} from '../constants'
import Spinnable from './Spinnable.vue'

export default defineComponent({
	name: 'LogoBrand',
	components: {
		Spinnable,
	},
	props: {
		direction: {
			type: String,
			default: 'none',
		},
		size: {
			type: String,
			default: 'lg',
		},
		grows: Boolean,
		noname: Boolean,
	},
	setup() {
		return {
			title: SITE_TITLE,
		}
	},
})
</script>
<style lang="postcss">
.brand {
	display: flex;
	transition: var(--beat);
	min-height: 10vh;
}

.brand.grows:hover,
.brand.grows:focus {
	transform: scale(1.05);
}

.brand:hover,
.brand:focus {
	outline: none;
}

.brand.vert {
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.reveal,
.logo {
	cursor: pointer;
}

.logo {
	pointer-events: auto;
	cursor: pointer;
	height: var(--logo-dim);
	width: var(--logo-dim);
	background-image: url('../assets/svg/bagua.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: 80%;
	transition: inherit;
}

.brand.sm {
	--logo-dim: clamp(2rem, 2rem + 3vh + 3vw, 5rem);
}

.brand.md {
	--logo-dim: clamp(3rem, 3rem + 3vh + 3vw, 6rem);
}

.brand.lg {
	--logo-dim: clamp(4rem, 4rem + 3vh + 3vw, 7rem);
}

.brand.xl {
	--logo-dim: clamp(5rem, 5rem + 3vh + 3vw, 8rem);
}

.brand.xxl {
	--logo-dim: clamp(6rem, 6rem + 3vh + 3vw, 9rem);
}

.brand.x3l {
	--logo-dim: clamp(8rem, 8rem + 3vh + 3vw, 12rem);
}

.brand.x4l {
	--logo-dim: clamp(12rem, 12rem + 3vh + 3vw, 24rem);
}

h1.nameless#llamo {
	font-size: calc(var(--logo-dim) / 4);
	color: var(--brand);
	font-family: var(--heading);
	--font-casual: 1;
	--font-mono: 0;
	--font-weight: 888;
	text-transform: uppercase;
	letter-spacing: 2px;
	margin: 0;
}

h2.tagline {
	font-size: calc(var(--logo-dim) / 6);
	font-family: var(--font);
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 555;
	margin-bottom: 0;
}

.brand .stack.reveal a {
	text-decoration: none;
}

.brand.horiz h1:first-child {
	margin-top: 0;
}

.brand a:focus,
.brand a:hover {
	outline: none;
}
</style>
