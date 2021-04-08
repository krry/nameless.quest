<template lang="pug">
transition( name="flag" appear mode="out-in" )
	button.btn.naked.tab.surf.fixed.b.l.ride(
		v-if="cfg.drawer"
		@click.stop="drawer.close"
		tabindex="0"
		)
	button.btn.naked.tab.surf.fixed.b.l.float(
		v-else
		@click.stop="drawer.open"
		tabindex="0"
		)
.drawer.fixed.abs-0.fs.flex.begin(
	@click.stop="drawer.close"
	@keydown.escape.prevent.exact="drawer.close"
	:class="{compact: allGone}"
	)
	SiteNav
	header#header.flex.mid.pad.pad2.b
		LogoBrand(direction="vert" size="md" )
			template(#tagline)
				Taglinez
	ThemeSwitch.tab.fixed.b.themes(size="md")
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {cfg} from '../store'
import SiteNav from './SiteNav.vue'
import LogoBrand from './LogoBrand.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import Taglinez from './Taglinez.vue'
import * as drawer from '../utils/drawer'

export default defineComponent({
	name: 'AppDrawer',
	components: {
		ThemeSwitch,
		LogoBrand,
		SiteNav,
		Taglinez,
	},
	setup() {
		const allGone = computed(
			() =>
				cfg.consulted &&
				cfg.perused &&
				cfg.journaled &&
				cfg.configured &&
				cfg.metafied &&
				cfg.consulted &&
				cfg.thanked &&
				cfg.fedback,
		)

		return {
			cfg,
			drawer,
			allGone,
		}
	},
})
</script>

<style lang="postcss">
.drawer.compact,
.drawer.compact + .app > main {
	--drawer-dim: 16rem;
}
</style>

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

	@media (min-width: 27rem) {
		width: var(--drawer-dim);
	}
}

.btn.tab {
	border: 1px solid var(--glow);
	background-color: var(--ground);
	padding: 0 0.25em;
}

.themes.tab.b {
	padding: 0.5rem 0.75rem;
	background-color: var(--paper);
	border-bottom: 0;
	margin-bottom: 0;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
	box-shadow: 0 0 0.25rem var(--glow);
	transform-origin: bottom center;
	left: calc(var(--drawer-dim) / 2) - 50%;
	bottom: 0;

	&:hover {
		background-color: var(--silk);
		outline: none;
		box-shadow: 0 0 0.5rem 0.125rem var(--glow);
	}
}

header {
	flex: 0.5 0 auto;
	margin: 1rem 0;
	@media (min-height: 36rem) {
		margin: 2rem 0;
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
		background-color: var(--ground);
		box-shadow: 0 0 0.5rem 0.125rem var(--glow);
	}
}

.btn.surf.tab.ride {
	left: 0;
	border-right: 0;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	transform: translateX(calc(100vw - 6rem));

	@media (min-width: 27rem) {
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
