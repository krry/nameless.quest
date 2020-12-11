<template lang="pug">
.bagua(
  v-if="shown"
  transition="fade"
  enter-active-class="fade-enter-active"
  leave-active-class="fade-leave-active"
  v-on:click="shown = !shown"
  )
  gua(:gua="above")
  gua(:gua="below")
</template>

<script>
import Gua from './Gua'
export default {
  name: 'Bagua',
  components: {
    gua: Gua
  },
  props: {
    above: Number,
    below: Number,
    shown: Boolean
  },
}
</script>

<style lang="sass">
.bagua
  position: absolute
  height: 100%
  width: 100%
  top: 0
  right: 0
  bottom: 0
  left: 0
  color: white
  background: hsla(28, 20%, 20%, 0.9)
  display: flex
  flex-flow: column nowrap
  justify-content: space-evenly
  align-items: justify
  pointer-events: auto

.fade-enter,
.fade-leave-to
  opacity: 0

.fade-enter-active,
.fade-leave-active
  transition: opacity 444ms  </style>