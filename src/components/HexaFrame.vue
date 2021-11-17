<template lang="pug">
.counting
  .hexagram(
    @click.stop="baguad=!baguad"
  ) {{ hex.hexagram }}
  .binary(hidden) {{ hex.binary }}
  .order(@click.stop="reorder")
    .octal(
      v-if="!cfg.wenny"
      :title="`Octal No. ${hex.octal}`"
    ) {{ hex.octal }}
    .kingwen(
      v-if="cfg.wenny"
      :title="`King Wen No. ${hex.kingwen}`"
    ) {{ hex.kingwen }}
  BaguaDoors(
    @click.stop="baguad = !baguad"
    :baguad="baguad"
    :pair="hex.trigramPair"
  )
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue';
import { defHex, Hexagram } from '../schema';
import { cfg } from '../store';
import BaguaDoors from './BaguaDoors.vue';
import { useReorderer } from '../composables/reorderer';

export default defineComponent({
	name: 'HexaFrame',
	components: {
		BaguaDoors,
	},
	props: {
		hex: {
			type: Object as PropType<Hexagram>,
			default: defHex,
		},
	},
	setup() {
		const baguad = ref(false);
		const reorder = useReorderer();
		// console.log('reorder func', reorder);
		watchEffect(() => (baguad.value = cfg.baguy));

		return {
			reorder,
			baguad,
			cfg,
		};
	},
});
</script>

<style scoped lang="postcss">
.hexagram {
	position: absolute;
	top: 0;
	left: 0;
	font-size: 2em;
	line-height: 1;
	cursor: pointer;
	pointer-events: auto;
	z-index: 2;
}

.order:hover,
.order:focus,
.hexagram:hover,
.hexagram:focus {
	color: var(--silk);
	background: var(--glow);
}

.order {
	position: absolute;
	top: var(--frame);
	right: var(--frame);
	cursor: pointer;
	padding: 0.25em;
	margin: -0.25em;
	z-index: 2;
}
</style>
