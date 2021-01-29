<template lang="pug">
ImportedComponent.scope(:key="key")
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import store from '../store'
import ImportedComponent from '../components/ImportedComponent.vue'

export default defineComponent({
  name: 'ComponentName',
  components: {
    ImportedComponent,
  },
  setup() {
    const rx = reactive({
      key: store.get('key'),
    })
    return {
      ...toRefs(rx),
    }
  },
})
</script>

<style lang="postcss" scoped>
.scope {
  border: 1px solid yellow;
}
</style>
