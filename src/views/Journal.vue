<template lang="pug">
transition(name="fade")
	Waiter(v-if="cfg.loading")
transition(name="fade")
	Page.journal
		Spinnable.mrg.mrg2.t
			IconBase(viewBox="0 0 1000 1250" size="128" iconColor="var(--ink)")
				IconSpellBook
		h1.head.xxl
			| The Journal of 
			contenteditable.username(
				tag="span"
				v-model="userProfile.name"
				:noNL="true"
				@blur="saveName(userProfile.name)"
			) {{ userProfile.name }}
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
import { Roll } from '../schema';
import { cfg, set } from '../store';
import { activeRolls, getRolls, deleteRoll, updateRoll } from '../store/rolls';
import { userProfile, hasUserProfile, setUserName } from '../store/userProfile';
import { parseTossToBinary } from '../utils/tosses';
import { useHexagrams } from '../composables/hexagrams';
import Page from '../components/Page.vue';
import NamePromptModal from '../components/NamePromptModal.vue';
import Waiter from '../components/Waiter.vue';
import AppLink from '../components/AppLink.vue';
import Spinnable from '../components/Spinnable.vue';
import ComingSoon from '../components/ComingSoon.vue';
import Contenteditable from 'vue-contenteditable';
import IconBase from '../icons/IconBase.vue';
import IconSix from '../icons/IconSix.vue';
import IconSeven from '../icons/IconSeven.vue';
import IconEight from '../icons/IconEight.vue';
import IconNine from '../icons/IconNine.vue';
import IconSpellBook from '../icons/IconSpellBook.vue';
import { symbolize, lineIconByNumber } from '../utils';

const laterDatesFirst = (a: Roll, b: Roll): number => {
	const dateA = new Date(a.moment).getTime();
	const dateB = new Date(b.moment).getTime();
	return dateB - dateA;
};

const rollMomentToDate = (roll: Roll): string => {
	const date = new Date(roll.moment);
	return date.toDateString();
};

export default defineComponent({
	name: 'JournalPage',
	components: {
		IconBase,
		IconSpellBook,
		NamePromptModal,
		Spinnable,
		IconSix,
		IconSeven,
		IconEight,
		IconNine,
		Page,
		Waiter,
		AppLink,
		ComingSoon,
		Contenteditable,
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
		const showNamePrompt = ref(!hasUserProfile());

		// Load rolls when journal page shows
		watchEffect(() => {
			console.log('userProfile:', userProfile);
			getRolls();
			set('journaled', true);
		});

		watchEffect(() => (rolls.value = [...new Set(activeRolls.value.sort(laterDatesFirst))]));

		function handleNameSubmitted(name: string) {
			console.log('Name submitted:', name);
			showNamePrompt.value = false;
		}

		function handleModalClosed() {
			// Modal closed, name is already saved via the store
		}

		function saveName(name: string) {
			if (name && name.trim()) {
				setUserName(name);
			}
		}

		function doubleCheckBeforeDeleteRoll(id: string | undefined): void {
			const deleteConfirmed = confirm('Are you sure you want to delete this journal entry?');
			if (id && deleteConfirmed) {
				deleteRoll(id);
				removeDeletedRoll(id);
			}
		}

		function removeDeletedRoll(id: string): void {
			// remove the deleted roll from the array of rolls
			if (rolls.value) {
				rolls.value = rolls.value.filter(roll => roll.id !== id);
			}
		}

		return {
			cfg,
			rolls,
			userProfile,
			showNamePrompt,
			symbolize,
			updateRoll,
			doubleCheckBeforeDeleteRoll,
			handleNameSubmitted,
			handleModalClosed,
			saveName,
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
