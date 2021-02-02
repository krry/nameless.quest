<template lang="pug">
.drawer.fixed.abs-0.fs.flex.begin(
	@click.stop="$emit('drawer', false)"
	)
	header#header.flex.mid
		LogoBrand(direction="vert" size="md" )
			template(#tagline)
				Taglinez
	SiteNav
	ThemeSwitch.tab.fixed.l.themes(size="md")
transition( name="flag" appear mode="out-in" )
	button.btn.naked.tab.surf.fixed.b.l.ride(
		v-if="cfg.drawer"
		@click.stop="$emit('drawer', false)"
		tabindex="0"
		)
	button.btn.naked.tab.surf.fixed.b.l.float(
		v-else
		@click.stop="$emit('drawer', true)"
		tabindex="0"
		)
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg} from '../store'
import SiteNav from './SiteNav.vue'
import LogoBrand from './LogoBrand.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import Taglinez from './Taglinez.vue'

export default defineComponent({
	name: 'AppDrawer',
	components: {
		ThemeSwitch,
		LogoBrand,
		SiteNav,
		Taglinez,
	},
	emits: ['drawer'],
	setup() {
		return {
			cfg,
		}
	},
})
</script>

<style lang="postcss" scoped>
.drawer {
	display: flex;
	justify-content: center;
	flex-flow: column nowrap;
	align-items: center;
	padding: 2rem 1rem;
	z-index: 0;
	right: auto; /* to counter the abs-0 ute */
	width: var(--drawer-buffer);
	background: var(--ground);
	transition: var(--bea2) var(--ease-in-out-quad);
	overflow-y: auto;
	overflow-x: hidden;

	@media (min-width: 36rem) {
		width: var(--drawer-dim);
	}
}

.btn.tab {
	border: 1px solid var(--glow);
	background-color: var(--ground);
	padding: 0 0.25em;
}

.themes.tab.l {
	padding: 0.5rem 0.75rem;
	border-bottom: 0;
	margin-bottom: 0;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	box-shadow: 0 0 0.25rem var(--glow);
	transform-origin: bottom left;
	transform: rotate(90deg);
	top: 61%;

	&:hover {
		background-color: var(--silk);
		outline: none;
		box-shadow: 0 0 0.5rem 0.125rem var(--glow);
	}
}

header {
	flex: 0.5 0 auto;
	margin-bottom: 1rem;
	@media (min-height: 36rem) {
		margin-bottom: 2rem;
	}
}

.btn.surf::after {
	content: var(--pip);
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	line-height: 2em;
	transition: inherit;
}

.btn.surf.tab {
	font-size: 1.5em;
	height: 2em;
	width: 2em;
	margin: 1em 0;
	border: 2px solid var(--glow);
	background-color: var(--paper);
	padding: 0;
	box-shadow: 0 0 0.25rem var(--glow);

	&:hover {
		outline: none;
		box-shadow: 0 0 0.5rem 0.125rem var(--glow);
	}

	&:hover::after {
		background-color: var(--dust);
	}
}

.btn.surf.tab.ride {
	left: 0;
	border-right: 0;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	transform: translateX(calc(100vw - 6rem));

	@media (min-width: 36rem) {
		transform: translateX(16.9rem);
	}
}

.btn.surf.tab.float {
	border-left: 0;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	z-index: 3;
}

.flag-enter-active,
.flag-leave-active {
	transition: all var(--bea2) var(--ease-in-out-quad);
}

.flag-leave-to,
.flag-enter-from {
	transform: translateX(-6rem);
}

.flag-enter-to,
.flag-leave-from {
	transform: translateX(0);
}
</style>
