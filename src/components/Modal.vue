<template lang="pug">
.modal.fixedfull(v-if="modalOpen")
 dialog
</template>

<script lang="ts">
// TODO: introduce the app with a dialog
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  components: { },
  props: {},
  data () { return {
    modalOpen: false
  } },
  methods: { },
  computed: { }
})
</script>
<style scoped lang="sass">
.modal
  z-index: 5
  display: flex
  justify-content: center
  align-items: center  </style>
