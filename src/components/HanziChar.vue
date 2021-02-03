<template lang="pug">
.char.reveal(
  v-if="reveal"
  @click.stop="pinny = !pinny"
  :class="size, place, {ib: inline}"
  )
  .hanzi {{ char }}
  transition(name="slide-fade")
    .pinyin(
      v-show="pinny"
      :class="place"
      ) {{ pinyin }}
  h4.translation(v-if="translation") {{ translation }}
.char(
  v-else
  :title="pinyin"
  :class="size, place, {ib: inline}"
  )
  .hanzi {{ char }}
  .pinyin.over(
    v-show="cfg.pinny"
    :class="place"
    ) {{ pinyin }}
  h4.translation(v-if="translation") {{ translation }}
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {cfg} from '../store'

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
		place: {
			type: String,
			default: '',
		},
		inline: Boolean,
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
}

.char.ib .hanzi {
	display: inline;
}

.under .char {
	margin-bottom: var(--unit);
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
	margin: 1rem 0 0.25rem;
}

.char.under {
	margin: 0.25rem 0 1rem;
}

.char.side {
	margin: 0 1rem;
	display: block;
}

.char.side.ib {
	display: inline;
	font-size: inherit;
	margin: 0 0 0 0.25em;
}

.char.side.ib .hanzi {
	font-size: inherit;
	/* font-size: 125%; */
}

.char.side.ib .pinyin {
	font-size: var(--unit);
	padding: 0;
	font-size: inherit;
}

.char.none {
	margin: 0;
	/* line-height: 0; */
}

.char.reveal .hanzi:hover,
.char.reveal .hanzi:focus {
	color: var(--link);
	transition-duration: 100ms;
}

.glyphs .hanzi {
	font-size: calc(var(--unit) * 2);
	padding: 0 0.125em;
}

.tile .hanzi {
	font-size: 2em;
	padding: 0 0.125em;
}

.pinyin {
	position: absolute;
	font-family: var(--font);
	font-size: 1rem;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
}

.pinyin.over {
	padding: 0 4px;
	top: calc(var(--unit) * -0.75);
	left: 0;
	right: 0;
	text-align: center;
}

.pinyin.side {
	top: 50%;
	left: 0;
	right: -1rem;
	pointer-events: none;
}

.pinyin.under {
	bottom: calc(var(--unit) * -0.875);
	left: 0;
	right: 0;
	text-align: center;
}

.pinyin.side,
.pinyin.side.slide-fade-enter-to,
.pinyin.side.slide-fade-leave-from {
	transform: translateX(calc(var(--unit) * 2)) translateY(-50%);
}

.ib .pinyin.side,
.ib .pinyin.side.slide-fade-enter-to,
.ib .pinyin.side.slide-fade-leave-from {
	transform: translateX(calc(var(--unit) * 1.5)) translateY(-50%);
}

.pinyin.side.slide-fade-leave-to,
.pinyin.side.slide-fade-enter-from {
	transform: translateY(-50%);
}
</style>
<style lang="postcss">
.change-node:focus-within .tile .hanzi {
	color: var(--ground);
	transition-duration: 100ms;
}
</style>
