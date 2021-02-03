<template lang="pug">
Page.query
	transition(name="slide-fade" appear mode="out-in")
		OracleCast.left(v-if="cached.step === 'cast'")
		OracleResponse.right(v-else-if="cached.step === 'response'" @clear="clearBoth")
		OracleQuery.above(v-else)
	IconBase.mrgs.y(size="96" viewBox="0 0 100 125" iconColor="var(--glow")
		IconThreeLegs
	OracleInfo
	button.btn.back.naked.abs.t.l(
		type="button"
		v-if="cached.toss"
		title="Start Over"
		@click="clearBoth"
		) ♽
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {set} from '../store'
import {cached, uncache} from '../store/cache'
import Page from './Page.vue'
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
		OracleInfo,
		OracleCast,
		OracleQuery,
		OracleResponse,
		IconBase,
		IconThreeLegs,
	},
	setup() {
		function clearBoth() {
			confirm("Are you sure you want to start over? This will clear today's question and answer.")
			uncache('query')
			uncache('toss')
			uncache('step')
		}

		return {
			cached,
			clearBoth,
		}
	},
	mounted() {
		set('consulted', true)
	},
})
</script>
<style lang="postcss" scoped>
.scope {
}
</style>
