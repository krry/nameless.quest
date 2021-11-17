<template lang="pug">
Page.config.col
	Spinnable.mrg.mrg2.t
		IconBase(viewBox="0 0 1000 1250" size="128" iconColor="var(--ink)")
			IconCauldron
	h1.font.x3l Configure the Oracle
	h3.font.lg Arrange the altar, hone the ritual
	section.flex.wrap.btw.even
		.setting.half
			ToggleSwitch(
				label="Pinyin begins"
				v-model:checked="pinny"
				tabindex="0"
				dis="Hidden"
				dat="Visible"
			)
			.flex.font.mid.string.font.center.pad.pad1.y
				HanziChar(
					char="易"
					pinyin="Yì"
					size="lg"
					place="over"
					reveal
					)
				HanziChar(
					char="經"
					pinyin="Jīng"
					size="lg"
					place="over"
					reveal
					)
		.setting.half
			ToggleSwitch(
				label="Cards begin showing"
				v-model:checked="texty"
				tabindex="0"
				dis="Glyphs"
				dat="Text"
			)
			transition.pad.pads.y(name="slide-fade" mode="out-in" appear)
				.right(v-if="texty")
					router-link(to="/changes/62")
						h4 Preponderance of the Small
					HanziChar.pad.pad1.x(char="小" reveal size="md" pinyin="xiǎo")
					HanziChar.pad.pad1.x(char="過" reveal size="md" pinyin="guò")
				.glyphs.right(v-else)
					LineGlyph(glyph="䷽" size="x4l")
		.setting.half
			ToggleSwitch(
				label="Line orientation"
				v-model:checked="turny"
				tabindex="0"
				dis="Horizontal"
				dat="Vertical"
			)
			.example
				LineGlyph(
					trigram
					inline
					glyph="☵"
					size="x4l")
				LineGlyph(
					inline
					glyph="䷂"
					size="x4l")
				LineGlyph(
					trigram
					inline
					glyph="☳"
					size="x4l")
		.setting.half
			ToggleSwitch(
				label="Show hotkey hints"
				v-model:checked="navvy"
				tabindex="0"
				dis="No, thanks"
				dat="Yes, please"
			)
			transition.over(name="slide-fade")
				h5.example.pad.pads.y(v-if="navvy")
					| You can&nbsp;
					kbd tab
					|  among the switches.
		.setting.half
			ToggleSwitch(
				label="Default Order"
				dis="Octal"
				dat="King Wen"
				v-model:checked="wenny"
				tabindex="0"
				)
		.setting.half
			ToggleSwitch(
				label="Text Format"
				dis="Genderless"
				dat="Genderful"
				v-model:checked="gendy"
				tabindex="0"
				)
		.setting.half
			ToggleSwitch(
				label="Bagua Doors"
				dis="Open"
				dat="Closed"
				v-model:checked="baguy"
				tabindex="0"
				)
			ChangeNode.example
		.setting.half
			ToggleSwitch(
				label="Spin Dimensions"
				dis="One"
				dat="Three"
				v-model:checked="threedy"
				tabindex="0"
				)
			Spinnable.mrg.mrg2.t
				IconBase(viewBox="0 0 1000 1250" size="128" iconColor="var(--ink)")
					IconCauldron
		.setting.half.flex.col.mid
			h4.font.md.thicc Switch the Theme
			.flex
				ThemeSwitch(size="xl")
	//- AppLink.btn(to="https://ko-fi.com/kerrbear") Gift our baby some diapers 🐻
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { cfg, set } from '../store';
import Page from '../components/Page.vue';
import AppLink from '../components/AppLink.vue';
import ComingSoon from '../components/ComingSoon.vue';
import IconBase from '../icons/IconBase.vue';
import Spinnable from '../components/Spinnable.vue';
import IconCauldron from '../icons/IconCauldron.vue';
import ToggleSwitch from '../components/ToggleSwitch.vue';
import ThemeSwitch from '../components/ThemeSwitch.vue';
import ChangeNode from '../components/ChangeNode.vue';
import HanziChar from '../components/HanziChar.vue';
import LineGlyph from '../components/LineGlyph.vue';
import HexaCard from '../components/HexaCard.vue';

export default defineComponent({
	name: 'ConfigPage',
	components: {
		Page,
		AppLink,
		ComingSoon,
		ToggleSwitch,
		IconBase,
		Spinnable,
		IconCauldron,
		ThemeSwitch,
		ChangeNode,
		HanziChar,
		LineGlyph,
		HexaCard,
	},
	setup() {
		const rx = reactive({
			pinny: cfg.pinny,
			texty: cfg.texty,
			turny: cfg.turny,
			navvy: cfg.navvy,
			wenny: cfg.wenny,
			gendy: cfg.gendy,
			baguy: cfg.baguy,
			threedy: cfg.threedy,
		});

		watchEffect(() => {
			set('pinny', rx.pinny);
			set('texty', rx.texty);
			set('turny', rx.turny);
			set('navvy', rx.navvy);
			set('wenny', rx.wenny);
			set('gendy', rx.gendy);
			set('baguy', rx.baguy);
			set('threedy', rx.threedy);
		});

		return {
			...toRefs(rx),
		};
	},
});
</script>

<style lang="postcss" scoped>
.setting {
	margin: 1rem;
}

h3 {
	margin: 0.75rem 0 0.25rem;
	text-align: left;
}

input[type='radio'] + label,
label + label {
	margin-right: 0.5rem;
}

label + input {
	margin-left: 0.5rem;
}

.turner {
	display: inline-block;
}

.turned {
	transform: rotate(-90deg);
}

.example {
	margin-top: 1rem;
	position: relative !important;
}
</style>
<style lang="postcss">
.config .page {
	/* background-color: var(--pencil); */
	min-width: 24rem;
}
</style>
