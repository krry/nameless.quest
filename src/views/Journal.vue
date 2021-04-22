<template lang="pug">
Page.journal
	Spinnable.mrg.mrg2.t
		IconBase(viewBox="0 0 1000 1250" size="128" iconColor="var(--ink)")
			IconSpellBook
	.test
		button.btn(@click="getRolls") get rolls
	h1.head.xxl
		| The Journal of{{' '}}
		contenteditable(
			tag="span"
			v-model="cached.name"
			:noNL="true"
			@blur="saveName(cached.name)"
			@focus="clearName"
			) {{ cached.name }}
	h2 Conversations with the Oracle
	.section(v-if="rolls.length < 10")
		router-link.btn.lg.outline(:to="{name: 'oracle', params: {reset: 'true'}}") Start a new entry
	.flex.row.wrap.mid.string(v-if="rolls.length > 0")
		section.roll.rel(
			v-for="roll in rolls"
			:key="roll.id"
			)
			time.moment.mono.thicc.alright(
				:datetime="roll.moment"
				) {{ roll.moment.toDate().toDateString() }}
			blockquote.query.mrg0
				h2 {{ roll.query }}
				h3.x2l.font {{ roll.toss }}
				.lines.whole.font.alcenter.mrg.mrgs.y
					IconBase.line(
						v-for="char in roll.toss"
						:key="$symbolize(char)"
						height="36"
						width="20"
						size="48"
						)
						component( :is="`Icon${char}`" )
				.flex.wrap.mid.string(v-if="roll.toss")
					router-link.btn.naked.mrg.mrg1.x.y.skinny.block(
						v-for="bin in parseTossToBinary(roll.toss)"
						:key="$symbolize(bin)"
						:to="'/changes/' + getWenByBin(bin)"
						) {{ getWenByBin(bin) + '. ' + getEnglishNameByBin(bin) }}
			.field
				label.font.lg(for="notes") Context/Notes/Insight
				textarea#notes(
					autoresize
					v-model.lazy="roll.notes"
					@blur="updateRoll(roll)"
				)
			.close.tr(@click.stop="doubleCheckBeforeDeleteRoll(roll.id)") ⓧ
	hr.dinkus.fleur.xxl
	h3.head.lg Want to fuel development?
	AppLink.outline.btn(to="https://ko-fi.com/kerrbear") Feed the Bears 🍕
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue'
import contenteditable from 'vue-contenteditable'
import {auth} from '../firebase'
import {set} from '../store'
import {cache, cached} from '../store/cache'
import {Roll} from '../schema'
import {activeRolls, getRolls, deleteRoll, updateRoll} from '../store/rolls'
import {parseTossToBinary} from '../utils/tosses'
import {useHexagrams} from '../composables/hexagrams'
import Page from '../components/Page.vue'
import IconBase from '../icons/IconBase.vue'
import IconSpellBook from '../icons/IconSpellBook.vue'
import Spinnable from '../components/Spinnable.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import AppLink from '../components/AppLink.vue'
import ComingSoon from '../components/ComingSoon.vue'

const laterDatesFirst = (a, b) => b.moment.seconds - a.moment.seconds

export default defineComponent({
	name: 'Journal',
	components: {
		IconBase,
		IconSpellBook,
		contenteditable,
		Spinnable,
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
			set('journaled', true)
		}

		if (!cached.name) {
			cache('name', 'Your Name')
		}

		watchEffect(() => {
			console.log('hydrating with rolls from firebase', activeRolls.value)
			// rolls.value = activeRolls.value.sort((a: Roll, b: Roll) => {
			// 	return Number(a.moment) - Number(b.moment)
			// })
			rolls.value = [...new Set(activeRolls.value.sort(laterDatesFirst))]
			// console.log('rolls.value', rolls.value)
		})

		function saveName(llamo: string) {
			cache('name', llamo)
			auth.currentUser?.updateProfile({
				displayName: llamo,
			})
			// console.log('auth.currentUser now has name', auth.currentUser, llamo)
		}

		function clearName(event: Event) {
			const target = event.target as HTMLInputElement
			if (!cached.name || cached.name === 'Your Name') {
				target.value = ''
			}
		}

		function doubleCheckBeforeDeleteRoll(id: string): void {
			const deleteConfirmed = confirm('Are you sure you want to delete this journal entry?')
			if (deleteConfirmed) {
				deleteRoll(id)
				removeDeletedRoll(id)
			}
		}

		function removeDeletedRoll(id: string): void {
			// remove the deleted roll from the array of rolls
			console.log('deleting id', id)
			const deletedRollIndex = rolls.value.map((roll) => roll.id).indexOf(id)
			console.log('deletedRollIndex', deletedRollIndex)
			rolls.value = rolls.value.splice(deletedRollIndex, 1)
			console.log('rolls.value after delete', rolls.value)
		}

		return {
			// then return activeRolls to the template as rolls
			rolls,
			cached,
			getRolls,
			saveName,
			clearName,
			updateRoll,
			doubleCheckBeforeDeleteRoll,
			getWenByBin,
			getHexagramByOctal,
			parseTossToBinary,
			getEnglishNameByBin,
		}
	},
})
</script>

<style lang="postcss" scoped>
.page.journal {
	background-color: var(--silk);
}
</style>
