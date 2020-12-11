<template lang="pug">
span.char
  div.hanzi {{ char }}
</template>

<script>
export default {
  name: 'Hanzi',
  props: {
    char: String,
    pinyin: String
  },
}
</script>

<style lang="sass">
.hanzi
  font-size: 2em
.char
  display: inline-block</style>
