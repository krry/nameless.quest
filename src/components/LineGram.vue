<template lang="pug">
.gram(v-if="changingLines[content.position-1]")
  .the-rest
    .pos-num
      span Line {{ content.position }}: 
      span(v-if="changingLines[content.position-1] === '6'")
        b yin 
        span ⤐ 
        b yang
      span(v-else-if="changingLines[content.position-1] === '9'")
        b yang 
        span ⤐ 
        b yin
    pre.meaning {{ content.meaning }}
  .line-side(v-if="changingLines[content.position-1] === '6'")
    IconBase
      Icon6
  .line-side(v-else-if="changingLines[content.position-1] === '9'")
    IconBase
      Icon9
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {defHex, Gram, Roll, defRoll} from '../schema'
import IconBase from '../components/icons/IconBase.vue'
import Icon6 from '../components/icons/Icon6.vue'
import Icon9 from '../components/icons/Icon9.vue'

export default defineComponent({
  name: 'LineGram',
  components: {
    IconBase,
    Icon6,
    Icon9,
  },
  props: {
    content: {
      type: Object as PropType<Gram>,
      default: defHex.lines[0],
    },
    roll: {
      type: Object as PropType<Roll>,
      default: defRoll,
    },
  },
  setup(props) {
    console.log('roll in lines', props.roll)
    const changingLines = computed((): string[] => {
      return props.roll.toss.split('').map((char) => {
        if (char === '6' || char === '9') return char
        else return ''
      })
    })
    console.log('changing lines', changingLines.value)

    return {
      changingLines,
    }
  },
})
</script>

<style lang="postcss" scoped>
.gram {
  transition: color var(--beat);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.gram:hover {
  color: var(--flair);
}

.line-side svg {
  height: 6em;
  width: 1.25em;
  color: var(--flair);
  margin: 0 0 0 0.5em;
}

.the-rest {
  flex: 1 0 auto;
}

.gram:not(:last-child) {
  border-bottom: 1px solid var(--glow);
}

pre.meaning {
  font-family: var(--text);
  line-height: var(--leading);
}
</style>
