<template lang="pug">
.char.reveal(
  v-if="reveal"
  @click.stop="pinny = !pinny"
  :class="size, direction"
  )
  .hanzi {{ char }}
  transition(name="slide-fade")
    .pinyin(
      v-show="pinny"
      :class="direction"
      ) {{ pinyin }}
  h4.translation(v-if="translation") {{ translation }}
.char(
  v-else
  :title="pinyin"
  :class="size, direction"
  )
  .hanzi {{ char }}
  .pinyin.over(
    v-show="cfg.pinny"
    :class="direction"
    ) {{ pinyin }}
  h4.translation(v-if="translation") {{ translation }}
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {cfg} from '../store/cfg'

export default defineComponent({
  name: 'HanziChar',
  props: {
    char: {
      type: String,
      default: '坤',
      required: true,
    },
    pinyin: {
      type: String,
      default: 'kūn',
    },
    translation: {
      type: String,
      default: '',
    },
    reveal: Boolean,
    size: {
      type: String,
      default: 'md',
    },
    direction: {
      type: String,
      default: 'over',
    },
  },
  setup(props) {
    if (props.reveal) {
      const pinny = ref(cfg.pinny)
      return {
        pinny,
        cfg,
      }
    }
    return {
      cfg,
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

.over .char {
  margin-top: var(--unit);
  --unit: 1rem;
}

.char.sm {
  --unit: 0.75rem;
}

.char.lg {
  --unit: 1.25rem;
}

.char.xl {
  --unit: 1.5rem;
}

.char.xxl {
  --unit: 2rem;
}

.char .hanzi {
  font-size: calc(var(--unit) * 2);
}

.char.md .hanzi {
  font-size: calc(var(--unit) * 1.5);
}

.char .pinyin {
  font-size: calc(var(--unit) * 0.8);
}

.char.over {
  margin: 1rem 0;
}

.char.side {
  margin: 0 1rem;
}

.char.none {
  margin: 0;
}

.char.reveal .hanzi:hover,
.char.reveal .hanzi:focus {
  color: var(--link);
  transition-duration: 100ms;
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
  position: absolute;
  font-size: 1rem;
  font-weight: 500;
  font-family: var(--font);
}

.pinyin.over {
  padding: 0 4px;
  top: calc(var(--unit) * -0.875);
  left: 0;
  right: 0;
  text-align: center;
}

.pinyin.side {
  right: 0;
  left: calc(var(--unit) * 0.75);
  top: 50%;
  text-align: left;
}

.pinyin.side,
.pinyin.side.slide-fade-enter-to,
.pinyin.side.slide-fade-leave-from {
  transform: translateX(calc(var(--unit) * 2)) translateY(-50%);
}

.pinyin.side.slide-fade-leave-to,
.pinyin.side.slide-fade-enter-from {
  transform: translateY(-50%);
}
</style>
