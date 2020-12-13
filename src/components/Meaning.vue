<template lang="pug">
article.meaning-node
  interps(
    :hanzi="node.name.chinese"
    :pinyin="node.name.pinyin"
    :english="node.name.english"
    :judgement="node.judgement"
    :images="node.images"
    :trigrams="node.trigramPair"
    :lines="node.hexagram"
    :binary="node.binary"
    :octal="node.octal"
    :kingwen="node.kingwen"
  )
</template>

<script>
import Interps from './Interps'

export default {
  name: 'Meaning',
  components: {
    interps: Interps,
  },
  props: {
    node: Object,
  },
}
</script>

<style lang="sass">
.meaning-node
  padding: 1em
  border: 1px solid transparent
  background-color: transparent
  text-align: center
  display: flex
  flex-direction: column
  justify-content: center
  transition: 555ms
.lines
  font-size: 2em</style>
