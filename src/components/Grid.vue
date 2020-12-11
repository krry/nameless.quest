<template lang="pug">
main.grids.fixedfull
  transition-group(
    name="scoot-list"
    tag="section"
    class="hexagrid lower fixedfull"
  )
    framing(
      v-for="hexagram in sortedHexagrams"
      v-bind:key="hexagram.octal"
      :node="hexagram"
    )
  transition-group(
    name="scoot-list"
    tag="section"
    class="hexagrid upper fixedfull"
  )
    meaning(
      v-for="hexagram in sortedHexagrams"
      :key="hexagram.kingwen"
      :node="hexagram"
    )
</template>

<script>
import Meaning from './Meaning'
import Framing from './Framing'
import HexaData from '../data/hexagrams.json'
import { EventBus } from '../event-bus'

export default {
  name: 'Grid',
  components: {
    framing: Framing,
    meaning: Meaning,
  },
  data () { return {
    hexagrams: HexaData,
    wenny: false,
  } },
  methods: {
    onReorder: function (wenny) {
      this.wenny = wenny
    }
  },
  mounted: function () {
    const switchWenny = wenny => { this.wenny = wenny }
    EventBus.$on("reorder", switchWenny)
  },
  computed: {
    sortedHexagrams: function () {
      const order = this.wenny ? "kingwen": "octal"
      return this.hexagrams.slice(0).sort((a, b) => {
        return a[order] - b[order]
      })
    }
  }
}
</script>
<style lang="sass">
.on-top
  position: fixed
  font-size: 5em
  z-index: 10
.fixedfull
  position: fixed
  width: 100%
  height: 100%
  top: 0
  right: 0
  bottom: 0
  left: 0
.hexagrid
  display: grid
  font-size: calc(9px + 0.3vw)
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
.upper
  z-index: 3
.lower
  z-index: 2  </style>
