<template lang="pug">
HexaGrid(
  @show="showCards"
  @hide="hideCard"
  :lots="lots"
  )
ModalState(
  :open="modal"
  @close="$emit('modal', false)"
  )
  keep-alive
    OracleModal(
      :lots="lots"
      @show="showCards"
      @reopen="$emit('modal', true)"
      @close="$emit('modal', false)"
      )
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import HexaGrid from '../components/HexaGrid.vue'
import ModalState from '../components/ModalState.vue'
import OracleModal from '../components/OracleModal.vue'
import {useLots} from '../composables/lots'
import {checkForFreshSavedData} from '../utils/tosses'

export default defineComponent({
  name: 'Home',
  components: {
    HexaGrid,
    ModalState,
    OracleModal,
  },
  props: {
    modal: Boolean,
    hasNavved: Boolean,
  },
  emits: ['modal'],
  setup() {
    const {getLots, setLots, nixLot} = useLots()
    const lots = computed(() => getLots())
    return {
      lots,
      setLots,
      nixLot,
    }
  },
  mounted() {
    const lots = checkForFreshSavedData('lots')
    if (!lots) window.scrollTo(0, 1)
    // hack to hide the browser address bar on mobile browsers
    else {
      this.setLots(JSON.parse(lots))
      // same hack only avoids moving the grid out from under the shown cards
      window.scrollTo(window.innerWidth, 1)
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.showCards([''])
    })
  },
  unmounted() {
    window.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.showCards([''])
    })
  },
  methods: {
    showCards(bins: string[]) {
      this.setLots(bins)
    },
    hideCard(bin: string) {
      this.nixLot(bin)
    },
  },
})
</script>
