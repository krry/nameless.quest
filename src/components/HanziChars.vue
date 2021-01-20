<template lang="pug">
.char(
  v-if="reveal"
  @click.stop="pinny = !pinny"
  :class="size"
  )
  .hanzi {{ char }}
  transition(name="slide-fade")
    .pinyin.over(v-show="pinny") {{ pinyin }}
.char(v-else :title="pinyin" :class="size")
  .hanzi {{ char }}
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'HanziChars',
  props: {
    char: {
      type: String,
      default: '坤',
    },
    pinyin: {
      type: String,
      default: 'kūn',
    },
    reveal: Boolean,
    size: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pinny: false,
    }
  },
})
</script>

<style scoped lang="postcss">
.char {
  display: inline-block;
  position: relative;
}

.char:nth-of-type(2) {
  margin-left: 0.5rem;
}

.hanzi {
  font-size: 1em;
  color: var(--flair);
  cursor: pointer;
}

.char.md {
  margin-top: 1rem;
}

.char.lg {
  margin-top: 1.25rem;
}

.char.xl {
  margin-top: 1.5rem;
}

.char.xxl {
  margin-top: 2rem;
}

.char.md .hanzi {
  font-size: 1.5rem;
}

.char.lg .hanzi {
  font-size: 2rem;
}

.char.xl .hanzi {
  font-size: 3rem;
}

.char.xxl .hanzi {
  font-size: 4rem;
}

.char.md .pinyin {
  font-size: 0.75rem;
}

.char.lg .pinyin {
  font-size: 1rem;
}

.char.xl .pinyin {
  font-size: 1.125rem;
}

.char.xxl .pinyin {
  font-size: 1.5rem;
}

.hanzi:hover,
.hanzi:focus {
  color: var(--link);
}

.glyphs .hanzi {
  font-size: 2em;
  padding: 0 0.125em;
}

.tile .hanzi {
  font-size: 2em;
  padding: 0 0.125em;
}

.pinyin {
  font-weight: 500;
  padding: 0 4px;
  position: absolute;
  top: -1.25em;
  left: 0;
  right: 0;
  font-size: 1rem;
  font-family: var(--font);
}
</style>
