<template lang="pug">
HexaGrid
router-view(v-slot="{Component}")
  ModalState
    component(:is="Component")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import HexaGrid from '../components/HexaGrid.vue'
import ModalState from '../components/ModalState.vue'
import {clearLots} from '../store/lots'

export default defineComponent({
  name: 'Home',
  components: {
    HexaGrid,
    ModalState,
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') clearLots()
    })
  },
  unmounted() {
    window.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') clearLots()
    })
  },
})
</script>
