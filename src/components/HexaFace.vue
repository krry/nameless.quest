<template lang="pug">
.face
  slot(name="top")
  hr.divider.abs-0(@click.stop="$emit('flip')")
  slot(name="bottom")
  .close.tr(@click.stop="$emit('close')") ⓧ
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'HexaFace',
  emits: ['close', 'flip'],
})
</script>

<style lang="postcss" scoped>
.close {
  font-size: 1.5rem;
  opacity: 0.5;
  padding: 0.5rem;
  position: absolute;
  cursor: pointer;
  z-index: 21;
}

.close.tr {
  top: 0;
  right: 0;
}

.close:hover,
.close:focus {
  opacity: 1;
  color: var(--bad);
}
</style>
