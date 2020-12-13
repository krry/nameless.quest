<template lang="pug">
#app
  grid
  modal
</template>

<script>
import Grid from './components/Grid'
import Modal from './components/Modal'

export default {
  name: 'App',
  components: {
    grid: Grid,
    modal: Modal,
  },
}
</script>

<style lang="sass">
body
  margin: 0
  padding: 0
  color: hsla(28, 50%, 20%, 1)

#app
  font-family: Garamond, system-ui, serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  display: flex
  flex-flow: column nowrap
  justify-content: center
  align-items: center

@media (orientation: portrait)
  #app
    flex-direction: column

@media (orientation: landscape)
  #app
    flex-direction: row

</style>
