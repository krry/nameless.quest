<template lang="pug">
.gua
  .col
    .trigram {{ $options.trigrams[gua].trigram }}
  .col
    span.mand-name {{ $options.trigrams[gua].name.zh }}
    span.pnyn-name  {{ $options.trigrams[gua].name.pn }}
    .eng-name {{ $options.trigrams[gua].name.en }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import trigramData from '../data/trigrams.json'
export default defineComponent({
  name: 'Gua',
  props: {
    gua: Number
  },
  trigrams: trigramData,
})
</script>

<style scoped lang="sass">
.gua
  display: flex
  flex: 1
  justify-content: space-evenly
  align-items: center
.trigram
  font-size: 3em</style>
