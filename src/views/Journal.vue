<template lang="pug">
Page.journal
  h1 Journal
  h2 Record your Ritual
  p A journal of your questions and answers will tell a story of challenges faced and insights gained.
  ComingSoon

</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import ComingSoon from '../components/ComingSoon.vue'

export default defineComponent({
  name: 'Journal',
  components: {
    Page,
    ComingSoon,
  },
  props: {
    modal: Boolean,
  },
  data() {
    return {
      title: 'Thanks and Credits',
    }
  },
})
</script>

<style lang="postcss" scoped>
.page.journal {
  background-color: var(--silk);
}
</style>
