<template lang="pug">
.names(
  :title="names.pinyin"
  )
  HanziChar(
    v-for="(char, index) in names.chinese"
    :key="index"
    :char="char"
    :pinyin="pinyin[index]"
    place="none"
    size="lg"
  )
  h4.yingyu {{ names.english }}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { defHex, Hexaname } from '../schema';
import HanziChar from './HanziChar.vue';

export default defineComponent({
	name: 'HexaTile',
	components: {
		HanziChar,
	},
	props: {
		names: {
			type: Object as PropType<Hexaname>,
			default: defHex.names,
		},
	},
	computed: {
		arrayedHanzi(): string[] {
			const hanzi = this.names.chinese;
			if (!hanzi) {
				return [];
			}
			return hanzi.split('');
		},
		pinyin(): string[] {
			return this.names.pinyin.split(' ');
		},
	},
});
</script>

<style lang="postcss" scoped>
.names {
	cursor: pointer;
	opacity: 0.75;
	color: var(--flair);
}

.names:hover,
.names:focus {
	color: var(--link);
	opacity: 1;
	outline: none;
}

.yingyu {
	padding-top: 0.25em;
	color: var(--ink);
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 666;
}
</style>
<style lang="postcss">
.change-node:hover .tile h4.yingyu,
.change-node.active .tile .yingyu,
.change-node.active .tile .hanzi,
.change-node:hover .tile .hanzi {
	color: var(--ground);
}

.face:hover .hanzi {
	color: var(--flair);
}

.face .yingyu,
.face:hover .yingyu {
	color: var(--ink);
}
</style>
