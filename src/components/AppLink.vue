<template lang="pug">
a(v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank")
	slot
router-link(
	v-else
	v-bind="$props"
	custom
	v-slot="{ isActive, href, navigate }"
)
	a(
		v-bind="$attrs"
		:href="to"
		@click="navigate"
		:class="isActive ? activeClass : inactiveClass"
	)
		slot
</template>
<script lang="ts">
import {computed} from 'vue'
import {RouterLink, useLink} from 'vue-router'

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

	setup(props) {
		// `props` contains `to` and any other prop that can be passed to <router-link>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const {href, route, navigate, isActive, isExactActive} = useLink(props)

		const isExternalLink = computed(
			() => typeof props.to === 'string' && props.to.startsWith('http'),
		)

		return {
			href,
			route,
			navigate,
			isActive,
			isExactActive,
			isExternalLink,
		}
	},
}
</script>
