<template lang="pug">
.turner.clickable(
	:class="{turned: cfg.turny && !ortho}, {unturned: !cfg.turny && ortho}"
	@click.stop="tog('turny')"
	)
	slot
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { cfg, tog } from '../store';

export default defineComponent({
	name: 'TurnableComponent',
	props: {
		ortho: Boolean,
	},
	setup() {
		return {
			cfg,
			tog,
		};
	},
});
</script>

<style lang="postcss" scoped>
.turner {
	transition: transform var(--beat) var(--ease-out-circ);
	transform-origin: center;
}

.turned {
	transform: rotate(-90deg);
}

.unturned {
	transform: rotate(90deg);
}
</style>
