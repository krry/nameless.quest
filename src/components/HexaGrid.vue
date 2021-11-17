<template lang="pug">
transition-group(
  class="hexagrid"
  tag="main"
  :style="{backgroundImage: backdrop}"
  @click.stop="clearLots"
  )
  ChangeNode(
    v-for="[identifier, change] in hexagrams.entries()"
    :key="identifier"
    :hex="change"
    :hexId="change.binary"
    )
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue';

import ChangeNode from './ChangeNode.vue';
import { useHexagrams } from '../composables/hexagrams';
import { activeTheme } from '../store/theme';
import { cfg } from '../store';
import { getRandTo } from '../utils';
import { sizeBg } from '../utils/bkgds';
import { clearLots } from '../store/lots';

export default defineComponent({
	name: 'HexaGrid',
	components: {
		ChangeNode,
	},
	setup() {
		let refreshBg = 1;
		const theme = activeTheme;
		const { getHexagrams } = useHexagrams();

		const rx = reactive({
			hexagrams: computed(() => getHexagrams(cfg.wenny)),
			backdrop: computed(
				() =>
					(refreshBg && 'url(/bg/' + sizeBg() + '/' + theme.value + getRandTo(5) + '.jpg)') || ''
			),
		});

		return {
			clearLots,
			...toRefs(rx),
		};
	},
	mounted() {
		document.addEventListener('keyup', this.onArrows);
	},
	unmounted() {
		document.removeEventListener('keyup', this.onArrows);
	},
	methods: {
		onArrows(e: KeyboardEvent) {
			const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
			if (!e.key || arrows.indexOf(e.key) === -1) return;
			if (e.key === 'ArrowLeft') {
				console.log('hit arrow', e.key, e.target);
			}
			if (e.key === 'ArrowRight') {
				console.log('hit arrow', e.key, e.target);
			}
			if (e.key === 'ArrowUp') {
				console.log('hit arrow', e.key, e.target);
			}
			if (e.key === 'ArrowDown') {
				console.log('hit arrow', e.key, e.target);
			}
		},
	},
});
</script>

<style scoped lang="postcss">
.hexagrid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	transition: var(--beat);
	border: var(--frame) solid var(--glow);
	overflow-y: clip;
	justify-items: center;

	@media (min-width: 36rem) and (min-height: 36rem) {
		border: var(--bevel) solid var(--shade);
	}

	@media (min-width: 48rem) and (min-height: 48rem) {
		width: 100vw;
	}
}
</style>
