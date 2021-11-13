<template lang="pug">
.face(
	v-autofocus
	@click.stop="tog('texty')"
	)
	router-link.moar.btn.naked.md.abs.t.r.no-underline.clickable(
		:to="'/changes/' + kingwen"
		)
		IconBase(
			size="32"
			viewBox="0 0 1000 1100"
			)
			IconScroll
		| More
	slot(name="top")
	hr.divider.abs-0
	slot(name="bottom")
	.close.abs.t.l(@click.stop="$emit('close')") ⓧ
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { tog } from '../store';
import IconBase from '../icons/IconBase.vue';
import IconScroll from '../icons/IconScroll.vue';

export default defineComponent({
	name: 'HexaFace',
	components: {
		IconBase,
		IconScroll,
	},
	props: {
		kingwen: {
			type: Number,
			default: 0,
		},
	},
	emits: ['close'],
	setup() {
		return { tog };
	},
});
</script>

<style lang="postcss" scoped>
.moar.btn.naked {
	margin: 0;
	padding: var(--frame) var(--bevel) var(--frame) var(--frame);
	border-style: dotted;
	border-radius: 0 0 0 var(--bevel);
	&:hover {
		outline: none;
		border-bottom-color: var(--flair);
		border-left-color: var(--flair);
	}
}
</style>

<style lang="postcss">
.close {
	font-size: 1.5rem;
	opacity: 0.5;
	padding: 0.125rem 0.45rem;
	position: absolute;
	cursor: pointer;
	z-index: 21;
}

.close:hover,
.close:focus {
	opacity: 1;
	color: var(--bad);
}
</style>
