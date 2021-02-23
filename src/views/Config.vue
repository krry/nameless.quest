<template lang="pug">
Page.config.col
  h1.font.x3l Configure the Oracle
  p.text.lg Arrange the altar, hone the ritual
  section.flex.wrap.btw.even
    .setting.half
      ToggleSwitch(
        label="Pinyin begins"
        v-model:checked="cfg.pinny"
        tabindex="0"
        dis="Hidden"
        dat="Visible"
      )
      .flex.font.mid.string.font.center.pad.y
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
        v-model:checked="cfg.texty"
        tabindex="0"
        dis="Glyphs"
        dat="Text"
      )
      transition.pads.y(name="slide-fade" mode="out-in" appear)
        .right(v-if="cfg.texty")
          router-link(to="/changes/62")
            h4 Preponderance of the Small
          HanziChar.pad.x(char="小" reveal size="md" pinyin="xiǎo")
          HanziChar.pad.x(char="過" reveal size="md" pinyin="guò")
        .glyphs.right(v-else)
          LineGlyph(glyph="䷽" size="x4l")
    .setting.half
      ToggleSwitch(
        label="Line orientation"
        v-model:checked="cfg.turny"
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
        v-model:checked="cfg.navvy"
        tabindex="0"
        dis="No, thanks"
        dat="Yes, please"
      )
      transition.over(name="slide-fade")
        h5.example.pads.y(v-if="cfg.navvy")
          | You can 
          kbd tab
          |  among the switches.
    .setting.half
      ToggleSwitch(
        label="Default Order"
        dis="Octal"
        dat="King Wen"
        v-model:checked="cfg.wenny"
        tabindex="0"
        )
    .setting.half
      ToggleSwitch(
        label="Bagua Doors"
        dis="Open"
        dat="Closed"
        v-model:checked="cfg.baguy"
        tabindex="0"
        )
      ChangeNode.example
    .setting.half.flex.col.mid
      h4.font.md.thicc Switch the Theme
      .flex
        ThemeSwitch(size="xl")
  AppLink.btn(to="https://ko-fi.com/kerrbear") Gift our baby some diapers 🐻
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {cfg, set} from '../store'
import {defHex} from '../schema'
import Page from '../components/Page.vue'
import AppLink from '../components/AppLink.vue'
import ComingSoon from '../components/ComingSoon.vue'
import ToggleSwitch from '../components/ToggleSwitch.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'
import ChangeNode from '../components/ChangeNode.vue'
import HanziChar from '../components/HanziChar.vue'
import LineGlyph from '../components/LineGlyph.vue'
import HexaCard from '../components/HexaCard.vue'

export default defineComponent({
	name: 'Config',
	components: {
		Page,
		AppLink,
		ComingSoon,
		ToggleSwitch,
		ThemeSwitch,
		ChangeNode,
		HanziChar,
		LineGlyph,
		HexaCard,
	},
	setup() {
		return {
			cfg,
			set,
			defHex,
		}
	},
})
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
