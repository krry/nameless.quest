<template lang="pug">
.char(
	@click.passive="showPinny"
	:class="size, place, {ib: inline}, {reveal: reveal}"
	:title="pinyin"
	)
	.hanzi {{ char }}
	transition(name="slide-fade")
		.pinyin(
			v-show="pinny || !reveal"
			:class="place"
			) {{ pinyin }}
	h4.translation.rel(v-if="translation") {{ translation }}
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { cfg } from '../store';

export default defineComponent({
	name: 'HanziChar',
	props: {
		char: {
			type: String,
			default: '坤',
			required: true,
		},
		pinyin: {
			type: String,
			default: 'kūn',
		},
		translation: {
			type: String,
			default: '',
		},
		reveal: Boolean,
		size: {
			type: String,
			default: 'md',
		},
		place: {
			type: String,
			default: '',
		},
		inline: Boolean,
	},
	setup(props) {
		const pinny = ref(cfg.pinny);

		function showPinny(ev: MouseEvent) {
			if (props.reveal) {
				ev.stopPropagation();
				pinny.value = !pinny.value;
			}
		}

		watchEffect(() => (pinny.value = cfg.pinny));

		return {
			pinny,
			cfg,
			showPinny,
		};
	},
});
</script>

<style scoped lang="postcss">
.char {
	display: inline-block;
	position: relative;
	text-align: center;
}

.char:nth-of-type(2) {
	margin-left: 0.5rem;
}

.hanzi {
	font-size: 1em;
	color: var(--flair);
	cursor: pointer;
}

.over .char {
	margin-top: var(--unit);
}

.char.ib .hanzi {
	display: inline;
}

.under .char {
	margin-bottom: var(--unit);
}

.char .hanzi {
	font-size: calc(var(--unit) * 2);
}

.char.md .hanzi {
	font-size: calc(var(--unit) * 1.5);
}

.char.sm .hanzi {
	font-size: calc(var(--unit) * 1.25);
}

.char .pinyin,
.translation {
	font-size: calc(var(--unit) * 0.8);
}

.translation {
	bottom: -70%;
	margin-bottom: 0;
	text-overflow: ellipsis;
	word-break: normal;
	font-size: calc(var(--unit) * 0.6);
}

.char.over {
	margin: 1rem 0 0.25rem;
}

.char.under {
	margin: 0.25rem 0 1rem;
}

.char.side {
	margin: 0 1rem;
	display: block;
	min-width: 4em;
	padding-right: 0.25em;
}

.char.side.ib {
	display: inline;
	font-size: inherit;
	margin: 0 0 0 0.25em;
}

.char.side.ib .hanzi {
	font-size: inherit;
	/* font-size: 125%; */
}

.char.side.ib .pinyin.side {
	font-size: var(--unit);
	padding: 0;
	right: unset;
	font-size: inherit;
	line-height: calc(var(--unit) * 1.5);
	display: inline-block;
	position: relative;
	transform: none;
}

.char.none {
	margin: 0;
	/* line-height: 0; */
}

.char.none .pinyin {
	display: none;
}

.char.reveal .hanzi:hover,
.char.reveal .hanzi:focus {
	color: var(--link);
	transition-duration: 100ms;
}

.glyphs .hanzi {
	font-size: calc(var(--unit) * 2);
	padding: 0 0.125em;
}

.tile .hanzi {
	font-size: 2em;
	padding: 0 0.125em;
}

.pinyin {
	position: absolute;
	font-family: var(--font);
	font-size: 1rem;
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 555;
}

.pinyin.over {
	padding: 0 4px;
	top: calc(var(--unit) * -0.75);
	left: 0;
	right: 0;
	text-align: center;
}

.pinyin.side {
	top: 50%;
	left: 0;
	right: -1rem;
	text-align: left;
	pointer-events: none;
}

.pinyin.under {
	bottom: calc(var(--unit) * -0.875);
	left: 0;
	right: 0;
	text-align: center;
}

.pinyin.side,
.pinyin.side.slide-fade-enter-to,
.pinyin.side.slide-fade-leave-from {
	transform: translateX(calc(var(--unit) * 2.25)) translateY(-50%);
}
.char.xl .pinyin {
	&.side,
	&.side.slide-fade-enter-to,
	&.side.slide-fade-leave-from {
		transform: translateX(calc(var(--unit) * 3.5)) translateY(-50%);
	}
	&.side.slide-fade-enter-from,
	&.side.slide-fade-leave-to {
		transform: translateX(calc(var(--unit) * 0)) translateY(-50%);
	}
}
.char.lg .pinyin {
	&.side,
	&.side.slide-fade-enter-to,
	&.side.slide-fade-leave-from {
		transform: translateX(calc(var(--unit) * 3.75)) translateY(-50%);
	}
	&.side.slide-fade-enter-from,
	&.side.slide-fade-leave-to {
		transform: translateX(calc(var(--unit) * 0)) translateY(-50%);
	}
}
.char.md .pinyin {
	&.side,
	&.side.slide-fade-enter-to,
	&.side.slide-fade-leave-from {
		transform: translateX(calc(var(--unit) * 2.618)) translateY(-40%);
	}
	&.side.slide-fade-enter-from,
	&.side.slide-fade-leave-to {
		transform: translateX(calc(var(--unit) * 0)) translateY(-40%);
	}
}
.char.md:not(.ib) .pinyin.side {
	padding: 0 0 calc(var(--unit) * 1.75);
}

.char.sm .pinyin {
	&.side,
	&.side.slide-fade-enter-to,
	&.side.slide-fade-leave-from {
		transform: translateX(calc(var(--unit) * 1.375)) translateY(-50%);
	}
}
.char.sm:not(.ib) .pinyin.side {
	padding: 0 0 calc(var(--unit) * 1.375);
}

.pinyin.side.slide-fade-leave-to,
.pinyin.side.slide-fade-enter-from {
	transform: translateX(50%) translateY(-50%);
}

.char.ib .pinyin.side.slide-fade-leave-to,
.char.ib .pinyin.side.slide-fade-enter-from {
	transform: translateX(0%) translateY(-50%);
}

.pinyin.side.slide-fade-leave-to,
.pinyin.side.slide-fade-enter-from {
	transform: translateX(50%) translateY(-50%);
}
</style>
<style lang="postcss">
.change-node:focus-within .tile .hanzi {
	color: var(--ground);
	transition-duration: 100ms;
}
</style>
