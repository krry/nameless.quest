<template lang="pug">
Page.config.col
  h1.font.x3l Config
  h2 Customize the Oracle
  h4.tagline Hone your ritual to suit your taste
  section.flex.wrap.btw.even
    .setting.half
      ToggleSwitch(
        label="Pinyin begins"
        v-model:checked="cfg.pinny"
        tabindex="0"
        dis="Hidden"
        dat="Visible"
      )
      .flex.font.mid.string.text-center.pad.y
        HanziChar(
          char="易"
          pinyin="Yì"
          size="lg"
          )
        HanziChar(
          char="經"
          pinyin="Jīng"
          size="lg"
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
          router-link(to="/change/62")
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
          size="x3l")
        LineGlyph(
          inline
          glyph="䷂"
          size="x4l")
        LineGlyph(
          trigram
          inline
          glyph="☳"
          size="x3l")
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
        dis="King Wen"
        dat="Octal"
        v-model:checked="cfg.wenny"
        tabindex="0"
        )
    .setting.half.flex.col.mid
      h4.font.md.thicc Switch the Theme
      .flex
        ThemeSwitch(size="xl")
  AppLink.btn(to="https://ko-fi.com/kerrbear") Gift our baby some diapers 🐻
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {cfg, set} from '../store'
import Page from '../components/Page.vue'
import AppLink from '../components/AppLink.vue'
import ComingSoon from '../components/ComingSoon.vue'
import ToggleSwitch from '../components/ToggleSwitch.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'
import HanziChar from '../components/HanziChar.vue'
import LineGlyph from '../components/LineGlyph.vue'

export default defineComponent({
	name: 'Config',
	components: {
		Page,
		AppLink,
		ComingSoon,
		ToggleSwitch,
		ThemeSwitch,
		HanziChar,
		LineGlyph,
	},
	setup() {
		return {
			cfg,
			set,
		}
	},
})
</script>

<style lang="postcss" scoped>
.config .page {
	background: var(--dust);
}

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

.turned {
	display: inline-block;
	transform: rotate(-90deg);
}

.example {
	margin-top: 1rem;
}
</style>
