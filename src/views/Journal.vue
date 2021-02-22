<template lang="pug">
Page.journal
	h1 Journal
	p Your conversations with the Oracle
	.section(v-if="rolls.length < 3")
		router-link.btn.lg.outline(:to="{name: 'oracle'}") Start a new entry
	.flex.row.wrap.mid.string(v-if="rolls.length > 0")
		section.roll(
			v-for="roll in rolls"
			:key="$symbolize(roll.moment)"
			)
			time.moment.mono.thicc.right(
				:datetime="roll.moment"
				) {{ roll.moment.toDate().toDateString() }}
			blockquote.query.mrg0
				h2 {{ roll.query }}
				h3.x2l.font {{ roll.toss }}
				.lines.whole.font.center.font.mrg.t
					IconBase.line(
						v-for="char in roll.toss"
						:key="$symbolize(char)"
						height="36"
						width="20"
						size="48"
						)
						component( :is="`Icon${char}`" )
				.flex.wrap.mid.string
					router-link.btn.naked.mrg.x.y.skinny.block(
						v-for="bin in parseTossToBinary(roll.toss)"
						:key="$symbolize(bin)"
						:to="'/change/' + getWenByBin(bin)"
						) {{ getWenByBin(bin) + '. ' + getEnglishNameByBin(bin) }}
	h3.head.lg Want to fuel development?
	AppLink.outline.btn(to="https://ko-fi.com/kerrbear") Feed the Bears 🍕
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue'
import {cached} from '../store/cache'
import {set} from '../store'
import {Roll} from '../schema'
import {activeRolls, getRolls} from '../store/rolls'
import {parseTossToBinary} from '../utils/tosses'
import {useHexagrams} from '../composables/hexagrams'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import Page from '../components/Page.vue'
import AppLink from '../components/AppLink.vue'
import ComingSoon from '../components/ComingSoon.vue'

export default defineComponent({
	name: 'Journal',
	components: {
		IconBase,
		Icon6,
		Icon7,
		Icon8,
		Icon9,
		Page,
		AppLink,
		ComingSoon,
	},
	setup() {
		const {getHexagramByOctal, getWenByBin, getEnglishNameByBin} = useHexagrams()
		const rolls = ref<Roll[]>()
		// when journal page loads, check if there is a logged in user, which should be true because the router handles this
		if (cached.uid) {
			// call getRolls to update the activeRolls
			getRolls()
		}

		watchEffect(() => {
			console.log('hydrating with rolls from firebase', activeRolls.value)
			rolls.value = activeRolls.value
		})

		return {
			// then return activeRolls to the template as rolls
			rolls,
			getWenByBin,
			getHexagramByOctal,
			parseTossToBinary,
			getEnglishNameByBin,
		}
	},
	mounted() {
		set('journaled', true)
	},
})
</script>

<style lang="postcss" scoped>
.page.journal {
	background-color: var(--silk);
}
</style>
