<template lang="pug">
.interps
  popper(
    :trigger="trigger"
    :options={placement: 'auto-auto'}
    transition="fade"
    enter-active-class="fade-enter-active"
    leave-active-class="fade-leave-active"
    )
    .more.popper( @click.stop="textShown=!textShown" )
      .names
        .pinyin(v-if="pinyin") {{ pinyin }}  
        hanzi(
          v-for="char in arrayedHanzi"
          :key="hanzi.id"
          :char="char"
          :pinyin="pinyin"
          )
        h3 {{ english }}
        .orders(@click.stop="reorder")
          .kingwen(v-if="wenny") King Wen Sequence \#{{ kingwen }}
          .octal( v-if="!wenny" ) Octal Sequence \#{{ octal }}
      .cross(:class="{horiz: !textShown}")
        .glyphs(v-if="!textShown")
          gua(:gua="trigrams.above")
        .text(v-if="textShown")
          .judgement {{ judgement }}
        .hexalines(:class="{turned: !textShown}") {{ lines }}
        .binary(v-if="!textShown") {{ binary.slice(2) }}
        .text(v-if="textShown")
          .images {{ images }}
        .glyphs(v-if="!textShown")
          gua(:gua="trigrams.below")
    .mandarin(slot="reference" :title="pinyin")
      hanzi(
        v-for="char in arrayedHanzi"
        :key="hanzi.id"
        :char="char"
      )
      h4 {{ english }}
</template>

<script>
import Hanzi from './Hanzi'
import Gua from './Gua'
import Popper from 'vue-popperjs'
import { EventBus } from '../event-bus'

export default {
  name: 'Interps',
  components: {
    hanzi: Hanzi,
    popper: Popper,
    gua: Gua,
  },
  props: {
    hanzi: String,
    pinyin: String,
    english: String,
    binary: String,
    judgement: String,
    images: String,
    trigrams: Object,
    lines: String,
    kingwen: Number,
    octal: String,
  },
  data () { return {
    moreShown: false,
    textShown: true,
    wenny: false,
    trigger: "clickToOpen",
  }},
  methods: {
    reorder: function () {
      this.wenny = !this.wenny
      EventBus.$emit('reorder', this.wenny)
    },
  },
  computed: {
    arrayedHanzi: function () {
      return this.hanzi.split("")
    },
  },
}
</script>

<style lang="sass">
$flair: hsla(28, 20%, 20%, 0.9)
.more
  position: absolute
  z-index: 4
  width: 100%
  max-width: 36ch
  max-height: 100vh
  overflow-y: auto
  font-size: 16px
  font-family: Garamond, serif
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center
  text-align: left
  padding: 2rem
  background: hsla(208, 10%, 97%, 0.95)
  border: 2px solid transparent
  border-color: $flair
  color: $flair
  
.divider
  width: 80%
  color: $flair
  margin: 1em auto
  
.mandarin
  cursor: pointer

.fade-enter-active,
.fade-leave-active
  transition: opacity 500ms

.fade-enter,
.fade-leave-to
  opacity: 0
  
h3
  margin-top: 0

h4
  margin: 0

.glyphs
  height: 100%
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-around
  text-align: center
      
.names
  text-align: center
  
.glyphs .names
  display: flex
  flex-direction: column
  justify-content: flex-end

.glyphs .gua
  flex-direction: column

  .trigram
    transform: rotateZ(-90deg)

.cross
  display: flex
  flex-direction: column
  text-align: center

  &.horiz
    width: 100%
    justify-content: space-between
    flex-direction: row

.names,
.guas
  flex: 1

.binary
  position: absolute
  bottom: 2rem
  left: 0
  right: 0
  margin: auto
 
.text
  text-align: justify

.hexalines
  margin: 0 auto
  font-size: 4em
  cursor: pointer
  transition: 444ms 444ms
  transform-origin: center center

  &.turned
    height: 1em
    width: 1em
    transform: rotateZ(-90deg)

.orders
  cursor: pointer
  margin: 0.5rem

.pinyin
  font-weight: bold
  padding: 0 4px</style>
