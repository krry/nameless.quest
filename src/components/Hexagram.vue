<template lang="pug">
.hexagram
  .lines(
    @click="baguaShown=!baguaShown"
  ) {{ lines }}
  .binary(hidden) {{ binary }}
  .order(:click="$emit('reorder')")
    .octal(
      v-if="!wenny"
      :title="`Octal No. ${octal}`"
    ) {{ octal }}
    .kingwen(
      v-if="wenny"
      :title="`King Wen No. ${kingwen}`"
    ) {{ kingwen }}
  bagua(
    :shown="baguaShown"
    :above="trigrams.above"
    :below="trigrams.below"
  )
</template>

<script>
import Bagua from './Bagua'
import { EventBus } from '../event-bus'

export default {
  name: 'Hexagram',
  components: {
    bagua: Bagua,
  },
  props: {
    lines: String,
    binary: String,
    trigrams: Object,
    kingwen: Number,
    octal: String,
  },
  data () { return {
    wenny: false,
    baguaShown: false
  }},
  mounted: function () {
    const switchWenny = wenny => { this.wenny = wenny }
    EventBus.$on('reorder', switchWenny)
  }
}
</script>
<style lang="sass">
$pad: 0.25vw
.lines
  position: absolute
  top: 0
  left: 0
  cursor: pointer
  pointer-events: auto

.order
  position: absolute
  top: $pad
  right: $pad</style>
