<template lang="pug">
main.desk.flex.string(
  :style="{backgroundImage: backdrop}"
  )
  .page.rel.flex.mid.col(
		:class="{inactive: cfg.drawer}"
	)
    slot
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from 'vue';
import { activeTheme } from '../store/theme';
import { cfg } from '../store';
import { getRandTo } from '../utils';
import { sizeBg } from '../utils/bkgds';
import * as drawer from '../utils/drawer';

export default defineComponent({
	name: 'HexaGrid',
	setup() {
		const backdrop = ref('');

		watchEffect(() => {
			backdrop.value = 'url(/bg/' + sizeBg() + '/' + activeTheme.value + getRandTo(5) + '.jpg)';
		});

		onMounted(() => drawer.close());

		return {
			cfg,
			backdrop,
		};
	},
});
</script>

<style lang="postcss">
main {
	position: relative;
	z-index: 10;
	background-color: var(--paper);
	background-repeat: no-repeat;
	background-position: right center;
	background-attachment: fixed;
	background-size: cover;
	font-size: var(--font-clamp);
	pointer-events: auto;
	margin-left: var(--drawer-buffer);
	box-shadow: 0 0 0.5rem var(--glow);
	scroll-snap-align: start;
	min-width: calc(100vw - var(--drawer-dim));
	min-height: calc(100vh + 1px);

	@media (min-width: 27rem) {
		margin-left: var(--drawer-dim);
	}
	@media (min-width: 36rem) and (min-height: 36rem) {
		min-height: 100vh;
	}
}

.desk {
	width: 100vw;
	max-width: 100vw;
	--matting: 0.5rem;
	padding-left: var(--matting);
	padding-right: var(--matting);

	@media (min-width: 27rem) {
		--matting: 1rem;
	}

	@media (min-width: 36rem) and (min-height: 36rem) {
		--matting: 2rem;
	}

	@media (min-width: 48rem) and (min-height: 48rem) {
		--matting: 3rem;
	}

	@media (min-width: 64rem) and (min-height: 48rem) {
		--matting: 4rem;
	}
}

.page {
	font-size: 125%;
	flex: 1 0 auto;
	overflow-y: auto;
	margin: auto;
	background-color: var(--silk);
	padding: 1rem;
	width: calc(100vw - 4em);
	max-width: 48rem;
	box-shadow: var(--inglow);
	transition: box-shadow var(--beat-1);
	transition-timing-function: var(--ease-out-quart);
	border-radius: var(--bevels);

	&.inactive {
		box-shadow: var(--sha-glow);
	}

	@media (min-height: 36rem) {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}

	@media (min-height: 48rem) {
		padding-top: 3rem;
		padding-bottom: 3rem;
	}

	@media (min-width: 36rem) and (min-height: 36rem) {
		box-shadow: var(--focus-glow);
		border: 1px inset var(--paper);
		border-radius: var(--bevels) var(--bevels) 33vw 33vw;
	}

	@media (min-width: 48rem) {
		padding-left: 2rem;
		padding-right: 2rem;
		max-width: min(64ch, 92vw);
	}

	@media (min-width: 64rem) {
		padding-left: 3rem;
		padding-right: 3rem;
		max-width: min(72ch, 92vw);
	}
}

@media (min-width: 36rem) and (min-height: 36rem) {
	.login .page {
		border-radius: 100%;
		section {
			border-radius: var(--bevels);
			padding: 2em 4em;
		}
	}
}

.page h1:first-of-type,
.page h1:first-child,
.page h2:first-child {
	--font-casual: 1;
	--font-mono: 0;
	--font-weight: 888;
}

.page h2,
.page h3,
.page blockquote,
.page p {
	max-width: 48rem;
	margin-left: auto;
	margin-right: auto;
}

.page p {
	line-height: var(--pleading);
	margin: 1em 0;
}

.callout {
	margin: 1.5em 0;
	padding: 1.5em;
	color: var(--ink);
	background-color: var(--ground);
	box-shadow: inset 0 0 0.25rem 0 var(--ink);
	border-radius: var(--bevel);
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 444;
}

.callout strong {
	color: var(--flair);
}

.callout p {
	text-align: left;
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 444;
}

.callout h4 {
	text-align: center;
	font-variant: small-caps;
}

.page .toc {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	list-style: none;
}

.page .toc li {
	position: relative;
	font-size: 1.125em;
	font-variant: small-caps;
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 666;

	@media (min-width: 48rem) {
		padding: 0 0.5rem;
		flex-basis: 50%;
	}

	@media (min-width: 64rem) {
		padding: 0 1rem;
		flex-basis: 33%;
	}
}

.toc a.btn {
	font-family: var(--font);
	color: var(--flair);
	padding: 0.75rem;
	text-align: center;
}

.page section {
	border: 1px var(--border-style) var(--glow);
	border-radius: var(--bevel);
	margin: 2rem 0;
	padding: 1rem;
	@media (min-width: 36rem) {
		padding: 2rem;
	}
}

section {
	text-align: center;
}

section p,
section li {
	text-align: left;
}

.page h1,
.page h2 {
	text-align: center;
}

.page section h2 {
	text-align: center;
}
</style>
