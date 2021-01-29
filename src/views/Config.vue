<template lang="pug">
Page.config.col
  h1.font.x3l Config
  h2 Customize the Oracle
  h4.tagline Hone your ritual to suit your taste
  section.flex.wrap.btw.even
    .setting.half
      ToggleSwitch(
        label="Default Order"
        dis="King Wen"
        dat="Octal"
        v-model:checked="cfg.wenny"
        tabindex="10"
        )
    .setting.half
      ToggleSwitch(
        label="Pinyin begins"
        v-model:checked="cfg.pinny"
        tabindex="11"
        dis="Hidden"
        dat="Visible"
      )
      .flex.font.mid.string.text-center.pad.y
        HanziChar(
          char="易"
          pinyin="Yì"
          size="xl"
          )
        HanziChar(
          char="經"
          pinyin="Jīng"
          size="xl"
          )
    .setting.half
      ToggleSwitch(
        label="Cards begin showing"
        v-model:checked="cfg.texty"
        tabindex="12"
        dis="Glyphs"
        dat="Text"
      )
      transition.pads.y.under(name="slide-fade" mode="out-in" appear)
        .text.under(v-if="cfg.texty")
          h4 Preponderance of the Small
          HanziChar.pad.x(char="小" reveal size="md" pinyin="xiǎo")
          HanziChar.pad.x(char="過" reveal size="md" pinyin="guò")
        .glyphs.left(v-else)
          HexaGlyph(hex="䷽")
    .setting.half
      ToggleSwitch(
        label="Line orientation"
        v-model:checked="cfg.turny"
        tabindex="13"
        dis="Horizontal"
        dat="Vertical"
      )
      .example
        TriGlyph(tri="☵" inline)
        HexaGlyph(hex="䷂" inline)
        TriGlyph(tri="☳" inline)
    .setting.half
      ToggleSwitch(
        label="Show hotkey hints"
        v-model:checked="cfg.navvy"
        tabindex="14"
        dis="No, thanks"
        dat="Yes, please"
      )
      transition.under(name="slide-fade")
        h5.example.pads.y(v-if="cfg.navvy")
          | You can 
          kbd tab
          |  among the switches.
    .setting.half.flex.col.mid
      h3 Switch the Theme
      .flex
        ThemeSwitch(size="xl" tabindex="20")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg, set} from '../store/cfg'
import Page from '../components/Page.vue'
import ComingSoon from '../components/ComingSoon.vue'
import ToggleSwitch from '../components/ToggleSwitch.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'
import HanziChar from '../components/HanziChar.vue'
import HexaGlyph from '../components/HexaGlyph.vue'
import TriGlyph from '../components/TriGlyph.vue'

export default defineComponent({
  name: 'Config',
  components: {
    Page,
    ComingSoon,
    ToggleSwitch,
    ThemeSwitch,
    HanziChar,
    HexaGlyph,
    TriGlyph,
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
