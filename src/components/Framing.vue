<template lang="pug">
article.framing-node
  hexagram(
    :lines="node.hexagram"
    :binary="node.binary"
    :octal="node.octal"
    :trigrams="node.trigramPair"
    :kingwen="node.kingwen"
  )
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hexagram from './Hexagram'

export default defineComponent({
  name: 'Framing',
  components: {
    hexagram: Hexagram,
  },
  props: {
    node: Object,
  },
})
</script>

<style scoped lang="sass">
.framing-node
  position: relative
  padding: 1em
  border: 1px solid hsla(28, 50%, 20%, 0.2)
  background-color: transparent
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  transition: 555ms
.lines
  font-size: 2em</style>
