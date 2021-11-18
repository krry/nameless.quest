<template lang="pug">
a.link(
	v-if="isExternalLink"
	v-bind="$attrs"
	:href="to"
	target="_blank"
	)
	slot
router-link(
	v-else
	v-bind="$props"
	custom
	v-slot="{ isActive, href, navigate }"
	)
	a.link(
		v-bind="$attrs"
		:href="href"
		@click="navigate"
		:class="isActive ? 'active' : 'inactive'"
		)
		slot
</template>
<script lang="ts">
import { computed } from 'vue';
import { RouterLink, useLink } from 'vue-router';

export default {
	name: 'AppLink',

	props: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		...RouterLink.props,
		inactiveClass: {
			type: String,
			default: '',
		},
	},

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	setup(props) {
		// `props` contains `to` and any other prop that can be passed to <router-link>
		const { href, navigate, isActive /*, route, isExactActive*/ } =
			useLink(props);

		const isExternalLink = computed(
			() => typeof props.to === 'string' && props.to.startsWith('http')
		);

		return {
			to: props.to,
			href,
			navigate,
			isActive,
			isExternalLink,
		};
	},
};
</script>
<style lang="postcss" scoped>
._blank::after {
	content: '🔗';
	display: inline-block;
	text-decoration: none;
	margin-left: 0.25rem;
	font-size: 0.75rem;
	vertical-align: middle;
}
</style>
