<template lang="pug">
.face.face--back
  LogoBrand(direction="bottom").smaller
  h2 Your Toss
  .glyphs
  IconBase.line(
      v-for="char in toss"
      :key="char"
    :icon-name="char")
      component(:is="`Icon${char}`")
  aside.help ☯
  h2 Your Hexagram#{plural}
  a.first-hex(@click="showCards(bins)") {{bins[0]}}
  a.second-hex(@click="showCards(bins)") {{bins[1]}}
  button.back(
    type="button"
    :title="'Start Over'"
    @click="$emit('back')"
    ) ♽
</template>

<script lang="ts">
import {defineComponent, computed, PropType} from 'vue'
import IconBase from './icons/IconBase.vue'
import Icon6 from './icons/Icon6.vue'
import Icon7 from './icons/Icon7.vue'
import Icon8 from './icons/Icon8.vue'
import Icon9 from './icons/Icon9.vue'
import LogoBrand from './LogoBrand.vue'

export default defineComponent({
  name: 'OracleToss',
  components: {
    IconBase,
    Icon6,
    Icon7,
    Icon8,
    Icon9,
    LogoBrand,
  },
  props: {
    toss: {
      type: String,
      default: '',
    },
    bins: {
      type: Array as PropType<string[]>,
      default: () => [''],
    },
  },
  emits: ['show', 'back'],
  setup(props) {
    const plural = computed((): string => {
      return props.toss.includes('6') || props.toss.includes('9') ? 's' : ''
    })

    return {
      plural,
    }
  },
  methods: {
    showCards(bins: string[]) {
      this.$emit('show', bins)
    },
  },
})
</script>

<style lang="postcss" scoped>
h2 {
  margin: 1em 0 0.25em;
}

.fields {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.field.half {
  flex: 1 0 auto;
  flex-basis: 50%;
}

.btn.go {
  font-size: 1.125em;
  font-weight: 700;
  padding: 0.25em 0.5em;
  margin: 0 0 0 1rem;
}

aside.help {
  font-size: 2em;
  margin: 0.5em auto;
}

@media (min-width: 48rem) {
  .coins {
    font-size: 0.875em;
    margin-top: 0.5em;
    order: 2;
  }
}

button.back {
  appearance: none;
  cursor: pointer;
  font-size: 1.5em;
  position: absolute;
  color: inherit;
  top: 0;
  left: 0;
  border: 0;
  padding: 0.5rem;
  width: 3rem;
  background: transparent;
}

.back:hover,
.back:focus {
  opacity: 1;
}

.line {
  height: 3em;
  width: 1em;
  margin: 0 0.125em;
}

.line.valid {
  color: var(--good);
}
</style>
