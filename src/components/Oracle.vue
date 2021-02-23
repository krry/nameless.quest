<template lang="pug">
Page.query
	transition(name="slide-fade" appear mode="out-in")
		OracleCast(v-if="cached.step === 'cast'")
		OracleResponse(v-else-if="cached.step === 'response'" @clear="clearBoth")
		OracleQuery(v-else)
	Spinnable
		IconBase.mrgs.y(size="96" viewBox="0 0 100 125" iconColor="var(--glow)")
			IconThreeLegs
	OracleInfo(ref="help")
	button.btn.back.naked.abs.t.l(
		type="button"
		v-if="cached.toss"
		title="Start Over"
		@click="clearBoth"
		) ♽
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue'
import {set} from '../store'
import {cached, uncache} from '../store/cache'
import Page from './Page.vue'
import Spinnable from './Spinnable.vue'
import OracleInfo from './OracleInfo.vue'
import OracleCast from './OracleCast.vue'
import OracleQuery from './OracleQuery.vue'
import OracleResponse from './OracleResponse.vue'
import IconBase from '../icons/IconBase.vue'
import IconThreeLegs from '../icons/IconThreeLegs.vue'

export default defineComponent({
	name: 'Oracle',
	components: {
		Page,
		Spinnable,
		OracleInfo,
		OracleCast,
		OracleQuery,
		OracleResponse,
		IconBase,
		IconThreeLegs,
	},
	setup() {
		const help = ref()
		function clearBoth() {
			const clearAffirmed = confirm(
				"Are you sure you want to start over? This will clear today's question and answer.",
			)
			if (clearAffirmed) {
				uncache('query')
				uncache('toss')
				uncache('step')
			}
		}

		return {
			help,
			cached,
			clearBoth,
		}
	},
})
</script>
<style lang="postcss" scoped>
.page {
	padding: 0;
}
</style>
