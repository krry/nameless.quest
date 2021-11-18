<template lang="pug">
transition(name="fade")
	Waiter(v-if="cfg.loading")
transition(name="fade")
	Login(
		v-if="!cached.uid"
	)
	Page.journal(v-else)
		Spinnable.mrg.mrg2.t
			IconBase(viewBox="0 0 1000 1250" size="128" iconColor="var(--ink)")
				IconSpellBook
		h1.head.xxl
			| The Journal of{{' '}}
			contenteditable(
				tag="span"
				v-model="cached.name"
				:noNL="true"
				class="username"
				@blur="saveName(cached.name)"
				@focus="clearName"
				) {{ cached.name }}
		h2 Conversations with the Oracle
		.section(v-if="rolls && rolls.length < 10")
			router-link.btn.lg.outline(:to="{name: 'oracle', params: {reset: 'true'}}") Start a new entry
		.flex.row.wrap.mid.string(v-if="rolls && rolls.length > 0")
			section.roll.rel(
				v-for="roll in rolls"
				:key="roll.id"
				)
				time.moment.mono.thicc.alright(
					:datetime="rollMomentToDate(roll)"
					) {{ rollMomentToDate(roll) }}
				blockquote.query.mrg0
					h2 {{ roll.query }}
					h3.x2l.font {{ roll.toss }}
					.lines.whole.font.alcenter.mrg.mrgs.y
						IconBase.line(
							v-for="char in [...roll.toss]"
							:key="symbolize(char).toString()"
							height="36"
							width="20"
							size="48"
							)
							component( :is="lineIconByNumber(char)" )
					.flex.wrap.mid.string(v-if="roll.toss")
						router-link.btn.naked.mrg.mrg1.x.y.skinny.block(
							v-for="bin in parseTossToBinary(roll.toss)"
							:key="symbolize(bin)"
							:to="'/changes/' + getWenByBin(bin)"
							) {{ getWenByBin(bin) + '. ' + getEnglishNameByBin(bin) }}
				.field
					label.font.lg(for="notes") Context/Notes/Insight
					textarea#notes(
						v-autoresize
						v-model.lazy="roll.notes"
						@blur="updateRoll(roll)"
					)
				.close.abs.t.r(@click.stop="doubleCheckBeforeDeleteRoll(roll.id)") ⓧ
		hr.dinkus.fleur.xxl
		h3.head.lg Want to fuel development?
		AppLink.outline.btn(to="https://ko-fi.com/kerrbear") 🍕 Feed the Devs 🐻
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import contenteditable from 'vue-contenteditable';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Roll } from '../schema';
import { cfg, set } from '../store';
import { cache, cached } from '../store/cache';
import { activeRolls, getRolls, deleteRoll, updateRoll } from '../store/rolls';
import { parseTossToBinary } from '../utils/tosses';
import { useHexagrams } from '../composables/hexagrams';
import Page from '../components/Page.vue';
import Login from './Login.vue';
import Waiter from '../components/Waiter.vue';
import AppLink from '../components/AppLink.vue';
import Spinnable from '../components/Spinnable.vue';
import ComingSoon from '../components/ComingSoon.vue';
import IconBase from '../icons/IconBase.vue';
import IconSix from '../icons/IconSix.vue';
import IconSeven from '../icons/IconSeven.vue';
import IconEight from '../icons/IconEight.vue';
import IconNine from '../icons/IconNine.vue';
import IconSpellBook from '../icons/IconSpellBook.vue';
import { symbolize, lineIconByNumber } from '../utils';

const laterDatesFirst = (a: Roll, b: Roll): number => {
	return b.moment.seconds - a.moment.seconds;
};

function toDateTime(secs = 0): Date {
	var t = new Date(1970, 0, 1); // Epoch
	t.setSeconds(secs);
	return t;
}

const rollMomentToDate = (roll: Roll): string => {
	const date = toDateTime(roll.moment?.seconds);
	return date.toDateString();
};

export default defineComponent({
	name: 'JournalPage',
	components: {
		IconBase,
		IconSpellBook,
		contenteditable,
		Spinnable,
		IconSix,
		IconSeven,
		IconEight,
		IconNine,
		Page,
		Login,
		Waiter,
		AppLink,
		ComingSoon,
	},
	props: {
		loading: {
			type: Boolean,
			default: true,
		},
	},
	setup() {
		const {
			// getHexagramByOctal,
			getWenByBin,
			getEnglishNameByBin,
		} = useHexagrams();
		const rolls = ref<Roll[]>();

		// when journal page loads, check if there is a logged in user, which should be true because the router handles this
		if (!cached.name) {
			cache('name', 'Your Name');
		}

		// TODO: when Journal view shows, make sure to run getRolls again
		watchEffect(() => {
			console.log('cached.uid', cached.uid);
			getRolls();
			set('journaled', true);
		});

		watchEffect(
			() =>
				(rolls.value = [...new Set(activeRolls.value.sort(laterDatesFirst))])
			// console.log('hydrating with rolls from firebase', activeRolls.value)
			// rolls.value = activeRolls.value.sort((a: Roll, b: Roll) => {
			// 	return Number(a.moment) - Number(b.moment)
			// })
			// console.log('rolls.value', rolls.value)
		);

		function saveName(llamo: string) {
			cache('name', llamo);
			const user = auth.currentUser;
			user &&
				updateProfile(user, {
					displayName: llamo,
				});
			// console.log('auth.currentUser now has name', auth.currentUser, llamo)
		}

		function clearName(event: Event) {
			const target = event.target as HTMLInputElement;
			if (!cached.name || cached.name === 'Your Name') {
				target.value = '';
			}
		}

		function doubleCheckBeforeDeleteRoll(id: string | undefined): void {
			const deleteConfirmed = confirm(
				'Are you sure you want to delete this journal entry?'
			);
			if (id && deleteConfirmed) {
				deleteRoll(id);
				removeDeletedRoll(id);
			}
		}

		function removeDeletedRoll(id: string): void {
			// remove the deleted roll from the array of rolls
			if (rolls.value) {
				// console.log('deleting id', id)
				const deletedRollIndex = rolls.value.map(roll => roll.id).indexOf(id);
				// console.log('deletedRollIndex', deletedRollIndex)
				rolls.value = rolls.value.splice(deletedRollIndex, 1);
				// console.log('rolls.value after delete', rolls.value)
			}
		}

		return {
			cfg,
			rolls,
			cached,
			saveName,
			clearName,
			symbolize,
			updateRoll,
			doubleCheckBeforeDeleteRoll,
			getWenByBin,
			lineIconByNumber,
			rollMomentToDate,
			parseTossToBinary,
			getEnglishNameByBin,
		};
	},
});
</script>

<style lang="postcss" scoped>
.page.journal {
	background-color: var(--silk);
}

.username {
	--font-mono: 0.5;
	--font-casual: 0.75;
	--font-weight: 367;
	margin-left: 0.25ch;
}
</style>
