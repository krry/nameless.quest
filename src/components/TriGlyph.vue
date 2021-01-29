<template lang="pug">
.triglyph.clickable(
  ref="el"
  :class="{turned: cfg.turny && !spinnable, ib: inline}" 
  @click.stop="tog('turny')"
  ) {{ tri }}

</template>
<script lang="ts">
import {defineComponent, onMounted, watchEffect, ref} from 'vue'
import {cfg, tog} from '../store/cfg'
import {useSpinnable} from '../composables/spinnable'
export default defineComponent({
  name: 'TriGlyph',
  props: {
    tri: {
      type: String,
      default: '',
    },
    inline: Boolean,
    spinnable: Boolean,
  },
  setup(props) {
    const el = ref<HTMLElement>()
    const isSpinning = ref(false)

    onMounted(() => {
      if (el.value && props.spinnable) {
        const {getSpinning, setSpinning} = useSpinnable(el.value)

        isSpinning.value = getSpinning()

        watchEffect(() => {
          setSpinning(isSpinning.value)
        })
      }
    })

    return {
      el,
      isSpinning,
      cfg,
      tog,
    }
  },
})
</script>
<style lang="postcss" scoped>
.triglyph {
  margin: 0 auto;
  font-size: 4em;
  line-height: 1;
  transition: var(--beat) var(--ease-out-quad);
  transform-origin: center 60%;
}

.triglyph.turned {
  transform: rotate(-90deg);
}
</style>
