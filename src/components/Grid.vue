<template lang="pug">
main.grids.fixedfull
  transition-group(
    name="fade"
    tag="section"
    class="hexagrid lower fixedfull"
  )
    framing(
      v-for="hexagram in sortedHexagrams"
      :key="hexagram.octal"
      :node="hexagram"
    )
  transition-group(
    name="scoot"
    tag="section"
    class="hexagrid upper fixedfull"
  )
    meaning(
      v-for="hexagram in sortedHexagrams"
      :key="hexagram.kingwen"
      :node="hexagram"
    )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sanity from "../sanity";
import Meaning from './Meaning'
import Framing from './Framing'
import HexaData from '../data/hexagrams.json'
import { EventBus } from '../event-bus'

const query = `*[_type == "hexagram"]`

export default defineComponent({
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
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        hexagrams => {
          this.loading = false;
          this.hexagrams = hexagrams;
        },
        error => {
          this.error = error;
        }
      );
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
  },
})
</script>

<style scoped lang="sass">
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
