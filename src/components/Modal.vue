<template lang="pug">
.modal.fixedfull(v-if="modalOpen")
 dialog
</template>

<script>
// TODO: introduce the app with a dialog

export default {
  name: 'Modal',
  components: { },
  props: {},
  data () { return {
    modalOpen: false
  } },
  methods: { },
  computed: { }
}
</script>
<style lang="sass">
.modal
  z-index: 5
  display: flex
  justify-content: center
  align-items: center  </style>
