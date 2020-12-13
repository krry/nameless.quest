<template lang="pug">
span.char
  div.hanzi {{ char }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hanzi',
  props: {
    char: String,
    pinyin: String
  },
})
</script>

<style scoped lang="sass">
.hanzi
  font-size: 2em
.char
  display: inline-block</style>
