<template lang="pug">
form.flex.space.spread.wrap(@submit.prevent="emailLinkSend")
	section#email_login.rel
		transition(name="fade")
			Waiter.abs.abs-0.z12(v-if="awaiting")
		.field
			input#email.email-input.large(
				type="email"
				name="email"
				v-model="email"
				autocomplete="email"
				:class="{sent: emailSuccessMsg}"
				tabindex="0"
				maxlength="50"
				placeholder="your@email.com"
				)
			transition.msg.between(name="slide-fade" mode="out-in" appear)
				label.right.between.font.alert(for="email_login" v-if="emailSuccessMsg")
					| We've emailed you a magic link.
					br
					| You can close this window.
				label.left.between(for="email_login" v-else)
					| 🪄 We'll send you a&nbsp;magic&nbsp;link&nbsp;🔗
			button.btn.lg.outline#email_butt(
				type="submit"
				v-if="!emailSuccessMsg"
				@click.prevent="emailLinkSend"
				) Sign in via Email
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { supabase } from '../firebase';
import { cache, uncache } from '../store/cache';
import Waiter from './Waiter.vue';

export default defineComponent({
	name: 'LoginEmail',
	components: { Waiter },
	setup() {
		const rx = reactive({
			email: '',
			emailSuccessMsg: false,
			awaiting: false,
		});

		async function emailLinkSend() {
			rx.awaiting = true;
			const { error } = await supabase.auth.signInWithOtp({
				email: rx.email,
				options: {
					emailRedirectTo: window.location.origin + '/journal',
					shouldCreateUser: true,
				},
			});

			if (error) {
				rx.awaiting = false;
				console.error("couldn't send magic link", error.message);
				uncache('email');
			} else {
				// The link was successfully sent. Inform the user.
				rx.awaiting = false;
				rx.emailSuccessMsg = true;
				// Save the email locally so you don't need to ask the user for it again
				cache('email', rx.email);
			}
		}

		return {
			emailLinkSend,
			...toRefs(rx),
		};
	},
});
</script>

<style lang="postcss">
label.between {
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 555;
	margin: 0.75rem 0 0.25rem;
}

.login .field {
	flex-direction: column-reverse;
}

.login section {
	margin: 0.5rem;
}

.email-input {
	width: 16em;
}

.field input[type='email']:valid.sent {
	border-color: var(--flair);
}
</style>
