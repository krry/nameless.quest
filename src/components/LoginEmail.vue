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
					| We've sent the magic link to your email.
				label.left.between(for="email_login" v-else)
					| 🪄 We'll send you a magic link 🔗
			button.btn.lg.outline#email_butt(
				type="submit"
				v-if="!emailSuccessMsg"
				@click.prevent="emailLinkSend"
				) Sign in via Email
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {auth} from '../firebase'
import {cache, uncache} from '../store/cache'
import Waiter from './Waiter.vue'

export default defineComponent({
	name: 'LoginEmail',
	components: {Waiter},
	setup() {
		const rx = reactive({
			email: '',
			emailSuccessMsg: false,
			awaiting: false,
		})

		async function emailLinkSend() {
			const actionCodeSettings = {
				// TODO: detect the path from which the user arrived here in order to redirect them appropriately
				url: window.location.origin + '/journal', // where to send user back to
				handleCodeInApp: true, // must be true?
			}
			rx.awaiting = true
			// console.log('actionCode url', actionCodeSettings.url)
			await auth
				.sendSignInLinkToEmail(rx.email, actionCodeSettings)
				.then(() => {
					// The link was successfully sent. Inform the user.
					rx.awaiting = false
					rx.emailSuccessMsg = true
					// Save the email locally so you don't need to ask the user for it again if they open the link on the same device
					cache('email', rx.email)
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					rx.awaiting = false
					console.error("couldn't send sign in link", errorCode, errorMessage)
					uncache('email')
					rx.email = ''
				})
		}

		return {
			emailLinkSend,
			...toRefs(rx),
		}
	},
})
</script>

<style lang="postcss">
label.between {
	margin: 0.75rem 0 0.25rem;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
}

.login .field {
	flex-direction: column-reverse;
}

.login section {
	margin: 0.5rem;
}

.email-input {
	width: 18rem;
}

.field input[type='email']:valid.sent {
	border-color: var(--flair);
}
</style>
