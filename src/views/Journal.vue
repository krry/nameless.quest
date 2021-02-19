<template lang="pug">
Page.journal
	h1 Journal
	p Your conversations with the Oracle
	.flex.row.wrap(v-if="rolls.length > 0")
		section.roll(
			v-for="roll in rolls"
			:key="$symbolize(roll.moment)"
			)
			time.moment(
				:datetime="roll.moment"
				) {{ formattedDate(roll.moment) }}
			blockquote.query
				h2 {{ roll.query }}
			.flex.wrap.mid.string
				router-link.btn.naked(
					v-for="bin in roll.bins"
					:key="$symbolize(bin)"
					:to="'/change/' + getWenByBin(bin)"
					) {{ getWenByBin(bin) + '. ' + getEnglishNameByBin(bin) }}
			.field
				textarea(
					v-autoresize
					rows="1"
					v-model="roll.notes"
					@change="saveRoll(roll)"
					)
	.section(v-else-if="rolls.length < 3")
		router-link.btn.lg.outline(:to="{name: 'oracle'}") Start a new entry
	ComingSoon
	h3.head.lg Want to fuel development? 
	AppLink.outline.btn(to="https://ko-fi.com/kerrbear") Feed the Bears 🍕
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import AppLink from '../components/AppLink.vue'
import ComingSoon from '../components/ComingSoon.vue'
import {useHexagrams} from '../composables/hexagrams'
import {set} from '../store'
import {activeRolls, saveRoll} from '../store/rolls'

export default defineComponent({
	name: 'Journal',
	components: {
		Page,
		AppLink,
		ComingSoon,
	},
	setup() {
		const {getHexagramByOctal, getWenByBin, getEnglishNameByBin} = useHexagrams()

		return {
			saveRoll,
			rolls: [],
			activeRolls,
			getWenByBin,
			getHexagramByOctal,
			getEnglishNameByBin,
		}
	},
	mounted() {
		set('journaled', true)
	},
	methods: {
		formattedDate(ms: number): string {
			const dt = new Date(ms)
			return [
				dt.getHours() + ':' + dt.getMinutes() + ' on',
				dt.getDate(),
				dt.toLocaleString('default', {month: 'short'}),
				dt.getFullYear(),
			].join(' ')
		},
	},
})
</script>

<style lang="postcss" scoped>
.page.journal {
	background-color: var(--silk);
}
</style>
