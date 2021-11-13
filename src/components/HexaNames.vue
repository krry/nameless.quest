<template lang="pug">
.names
  .glyphs
    HanziChar(
      v-for="(char, index) in [...names.chinese]"
      :key="symbolize(char)"
      :char="char"
      :pinyin="pinyin[index]"
      size="x2l"
			place="over"
      reveal
      )
  h3.yingyu.head.x2l {{ names.english }}
  .orders(@click.stop="reorder")
    .kingwen(v-if="cfg.wenny") King Wen \#{{ kingwen }}
    .octal(v-if="!cfg.wenny") Octal \#{{ octal }}
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, computed, inject } from 'vue';
import { defHex, Hexaname } from '../schema';
import { cfg } from '../store';
import HanziChar from './HanziChar.vue';
import { reorderKey } from './HexaGrid.vue';
import { setQuadrantKey } from './ChangeNode.vue';
import { symbolize } from '../plugins/utils';

export default defineComponent({
	name: 'HexaNames',
	components: {
		HanziChar,
	},
	props: {
		names: {
			type: Object as PropType<Hexaname>,
			default: defHex.names,
		},
		kingwen: {
			type: Number,
			default: defHex.kingwen,
		},
		octal: {
			type: String,
			default: defHex.octal,
		},
	},

	emits: ['flip'],

	setup(props) {
		const setQuadrant = inject(setQuadrantKey);
		const reorderTiles = inject(reorderKey);
		const rx = reactive({
			pinyin: computed(() => props.names.pinyin.split(' ')),
			arrayedHanzi: computed((): string[] => {
				if (!props.names.chinese) return [];
				return props.names.chinese.split('');
			}),
		});

		function reorder() {
			if (!reorderTiles || !setQuadrant) throw new Error('fwuck');
			reorderTiles();
			setQuadrant();
		}

		return {
			reorder,
			cfg,
			symbolize,
			...toRefs(rx),
		};
	},
});
</script>

<style lang="postcss" scoped>
.glyphs {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	text-align: center;
	cursor: pointer;
	position: relative;
	transition: color var(--bea2) var(--ease-in-out-circ);
}

.glyphs .char {
	margin-bottom: 0;
}

.glyphs:hover,
.glyphs:focus {
	color: var(--link);
}

.binary {
	position: absolute;
	bottom: 3rem;
	left: 0;
	right: 0;
	margin: auto;
}

.text {
	text-align: left;
}

.names {
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	flex: 1 0 auto;
}

@media (min-width: 48rem) {
	.names {
		justify-content: center;
	}
}

@media (min-width: 36rem) and (min-height: 36rem) {
	.names {
		font-size: 125%;
	}
}

.yingyu {
	margin-top: 0;
	margin-bottom: 0.5em;
	color: var(--flair);
	font-size: 1.5em;
}

.orders {
	cursor: pointer;
	margin: 0.5rem;
	color: var(--link);
}

.orders:hover,
.orders:focus {
	color: var(--link);
}
</style>
