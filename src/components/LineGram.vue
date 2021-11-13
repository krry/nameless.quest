<template lang="pug">
.gram(v-if="changingLines[content.position-1]")
  .line-side(v-if="changingLines[content.position-1] === '6'")
    IconBase
      IconSix
  .line-side(v-else-if="changingLines[content.position-1] === '9'")
    IconBase
      IconNine
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
    pre.meaning.font.sm.fine {{ content.meaning }}
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { defHex, Gram } from '../schema';
import IconBase from '../icons/IconBase.vue';
import IconSix from '../icons/IconSix.vue';
import IconNine from '../icons/IconNine.vue';

export default defineComponent({
	name: 'LineGram',
	components: {
		IconBase,
		IconSix,
		IconNine,
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
			return props.toss.split('').map(char => {
				if (char === '6' || char === '9') return char;
				else return '';
			});
		});

		return {
			changingLines,
		};
	},
});
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

.gram:not(:last-child) {
	border-bottom: 1px solid var(--glow);
}

pre.meaning {
	font-family: var(--text);
	line-height: var(--leading);
}
</style>
