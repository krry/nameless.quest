<template lang="pug">
nav.flex.mid.string.col.pads.y
	ul.site-nav
		li
			router-link.btn.outline(:to="{ name: 'oracle' }" tabindex="0")
				IconBase(size="40" viewBox="0 0 100 125")
					IconMiracle
				span(v-if="!cfg.consulted") Consult the 
				span Oracle
		li
			router-link.btn.naked(:to="{ name: 'changes' }" tabindex="0")
				IconBase(size="40" viewBox="0 0 1000 1250")
					IconOpenBook
				span(v-if="!cfg.perused") Peruse the 
				span Changes
		li
			router-link.btn.naked(:to="{ name: 'journal' }" tabindex="0")
				IconBase(size="40" viewBox="0 0 1000 1250")
					IconSpellBook
				span(v-if="!cfg.journaled") Start a 
				span Journal
		li
			router-link.btn.naked(:to="{ name: 'config' }" tabindex="0")
				IconBase(size="40" viewBox="0 0 1000 1250")
					IconCauldron
				| Config
				span(v-if="!cfg.configured") ure
		li
			router-link.btn.naked(:to="{ name: 'about' }" tabindex="0")
				IconBase(size="40" viewBox="0 0 1000 1250")
					IconCrystalBall
				| About 
				span(v-if="!cfg.metafied") This
		li
			router-link.btn.naked(:to="{ name: 'gratitude' }" tabindex="0")
				IconBase(size="40" viewBox="0 0 1000 1250")
					IconCandles
				| Gratitude
		li
			a.btn.naked(
				@click.stop
				tabindex="0"
				data-feedback-fish
				:data-feedback-fish-userid="cached.email"
				)
				IconBase(size="36" viewBox="0 0 17 21")
					IconConversation
				|  Feedback?
		li(v-if="cached.uid")
			a.btn.md.naked.signout(
				@click.stop="$logout"
				tabindex="0"
				)
				IconBase(viewBox="0 0 100 125" size="28")
					IconPeaceSign
				|  Sign out
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg} from '../store'
import {cached} from '../store/cache'
import {getRolls} from '../store/rolls'
import IconBase from '../icons/IconBase.vue'
import IconScroll from '../icons/IconScroll.vue'
import IconCandles from '../icons/IconCandles.vue'
import IconMiracle from '../icons/IconMiracle.vue'
import IconJournal from '../icons/IconJournal.vue'
import IconCauldron from '../icons/IconCauldron.vue'
import IconOpenBook from '../icons/IconOpenBook.vue'
import IconPeaceSign from '../icons/IconPeaceSign.vue'
import IconSpellBook from '../icons/IconSpellBook.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'
import IconConversation from '../icons/IconConversation.vue'

export default defineComponent({
	name: 'SiteNav',
	components: {
		IconBase,
		IconScroll,
		IconMiracle,
		IconJournal,
		IconCauldron,
		IconCandles,
		IconOpenBook,
		IconSpellBook,
		IconPeaceSign,
		IconCrystalBall,
		IconConversation,
	},
	setup() {
		const rolls = getRolls()
		console.log('rolls', rolls)
		return {
			cfg,
			cached,
		}
	},
	computed: {
		isProd(): boolean {
			return process.env.NODE_ENV === 'production'
		},
	},
})
</script>

<style lang="postcss" scoped>
nav {
	flex: 4 0 auto;
	text-align: left;
	padding-bottom: 2rem;
}

nav ul,
nav li {
	list-style: none;
	margin: 0;
	padding: 0;
	color: var(--ink);
}

nav ul,
nav li,
nav a {
	display: block;
}

nav a {
	text-decoration: none;
	font-size: 2ch;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
	padding: 0.5em 1em;

	@media (min-width: 36rem) {
		font-size: 2.25ch;
	}
}

nav .btn {
	width: 100%;
	line-height: 2;
	padding: 0.5em 1em;
	margin: 0;

	@media (min-height: 48rem) {
		padding: 0.25em 1em;
		margin: 0.75rem 0;
	}
}

nav .btn.sm {
	width: auto;
	display: inline-block;
}

nav .btn svg {
	margin-bottom: -0.25rem;
}

hr {
	border-color: var(--glow);
}

.muted {
	opacity: 0.2;
	pointer-events: none;
}

.linklist {
	margin-top: 2rem;
}

@media (min-height: 36rem) {
	.linklist {
		margin-top: 4rem;
	}
}
</style>
