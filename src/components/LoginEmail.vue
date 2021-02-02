<template lang="pug">
form.flex.space.spread.wrap(@submit.prevent="emailLinkSend")
  section
    .field
      input#email.email-input.large(
        type="email"
        v-model="email"
        tabindex="0"
        maxlength="50"
        placeholder="make.believe@email.com"
        )
      transition.left.msg.between(name="slide-fade" mode="out-in" appear)
        label.between(for="email_login" v-if="emailSuccessMsg")
          | We've sent the magic link to your email.
        label.between(for="email_login" v-else)
          | 🪄 We'll send you a magic link 🔗
      button.btn.lg.outline#email_butt(
        type="submit"
        @click.prevent="emailLinkSend"
        ) Sign in via Email
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {auth} from '../firebase'
import {cache, uncache} from '../store/cache'

export default defineComponent({
	name: 'LoginEmail',
	setup() {
		const rx = reactive({
			email: '',
			emailSuccessMsg: false,
		})

		async function emailLinkSend() {
			const actionCodeSettings = {
				url: window.location.origin + '/journal', // where to send user back to
				handleCodeInApp: true, // must be true?
			}
			// console.log('actionCode url', actionCodeSettings.url)
			await auth
				.sendSignInLinkToEmail(rx.email, actionCodeSettings)
				.then(() => {
					// The link was successfully sent. Inform the user.
					rx.emailSuccessMsg = true
					// Save the email locally so you don't need to ask the user for it again if they open the link on the same device
					cache('email', rx.email)
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
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
</style>
