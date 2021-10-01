<template lang="pug">
section.flex.col.string
	Spinnable.mrg.mrg2.t
		IconBase(size="80" viewBox="0 0 512 600" iconColor="var(--flair)")
			IconCarnivalCoin
	h1.head.x3l Feeling the gratitude?
	p.font.md
		| I welcome your feedback and your support.
	AppLink.btn.lg.outline(to="https://ko-fi.com/kerrbear")
		span 🦁 Give what feels good 🐻
	hr
	p.text.md
		| Friends and fram call me&nbsp;
		AppLink._blank(to="https://kerrbear.wtf") Kerrbear
		| . I love to devsign. Here is my&nbsp;
		AppLink._blank(to="https://krry.dev") folio
		| .
	p.text.md.mrg.b0
		| I made Nameless Quest to share the profound and humbling insight that&nbsp;
		span
			HanziChar(
				char="易"
				pinyin="Yì"
				size="sm"
				place="under"
				reveal
				)
		| &nbsp;offers me.
	p.text.md
		| I've heard Charles Eisenstein, Nipun Mehta, and Cynthia Jurs all describe gratitude as the seed or origin of generosity. This resonates with the deep, low tone of basic truth.
		| As a passion project, I couldn't put a price tag on Nameless. And as an oracle, its impact can be negligible or incalculable. So it is free. I sincerely hope my efforts yield insight, prosperity, catharsis, or joy for you in some form.
	p.text.md
		| Your support means the world to me.
	AppLink.btn.lg.outline(to="https://ko-fi.com/kerrbear")
		span 🏺 We are living in the gift 💗
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import AppLink from './AppLink.vue'
import HanziChar from './HanziChar.vue'
import IconBase from '../icons/IconBase.vue'
import IconCarnivalCoin from '../icons/IconCarnivalCoin.vue'
import Spinnable from './Spinnable.vue'

export default defineComponent({
	name: 'Busking',
	components: {
		AppLink,
		HanziChar,
		Spinnable,
		IconBase,
		IconCarnivalCoin,
	},
})
</script>

<style lang="postcss"></style>
