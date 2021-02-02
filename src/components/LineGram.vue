<template lang="pug">
.gram(v-if="changingLines[content.position-1]")
  .line-side(v-if="changingLines[content.position-1] === '6'")
    IconBase
      Icon6
  .line-side(v-else-if="changingLines[content.position-1] === '9'")
    IconBase
      Icon9
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
    pre.meaning.font.md {{ content.meaning }}
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import {defHex, Gram} from '../schema'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon9 from '../icons/Icon9.vue'

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
		toss: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const changingLines = computed((): string[] => {
			return props.toss.split('').map((char) => {
				if (char === '6' || char === '9') return char
				else return ''
			})
		})

		return {
			changingLines,
		}
	},
})
</script>

<style lang="postcss" scoped>
.gram {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.line-side svg {
	height: 6em;
	width: 1.25em;
	color: var(--flair);
	margin-right: 1rem;
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
