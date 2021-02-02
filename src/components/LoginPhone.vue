<template lang="pug">
form.flex.space.spread.wrap(@submit.prevent="signInWithPhone")
  section
    transition.right(name="slide-fade" mode="out-in" appear)
      .field(v-if="!acceptingCode")
        input#phone.phone-input.large(
          type="tel"
          v-model="phone"
          placeholder="First the country code"
          pattern="[0-9]{10,14}"
          maxlength="14"
          )
        transition.under.msg(name="slide-fade" appear mode="out-in")
          label.between(v-if="msg.phone.success")
            | We've texted the secret code to your phone.
          label.between(v-else-if="msg.phone.error")
            | We couldn't send an SMS to this number. You could retry, reload the page, or use email.
          label.between(v-else-if="msg.confirm.error")
            | Oops, we need to send you a fresh code. Please try again.
          label.between(v-else for="email_login")
            | 💬 We'll text you a secure code 📲
        button.btn.lg.outline#phone_butt(
          type="submit"
          ref="phone-butt"
          @click.prevent="signInWithPhone"
          ) Sign in via Phone
      .field(v-else)
        input#phone_code(
          type="tel"
          name="phone"
          autocomplete="tel"
          ref="phone-code"
          v-model="confCode"
          pattern="[0-9]{0,6}"
          maxlength="6"
          placeholder="314159"
          )
        label.between(for="phone_code") ☝️ What's the secret code?
        button.btn.outline.md#confirm_butt(@click="acceptConfirmationCode") Confirm
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, onMounted} from 'vue'
import firebase from 'firebase/app'
import {auth} from '../firebase'
import {useRouter} from 'vue-router'
import {cache, uncache} from '../store/cache'

let confirmResult: firebase.auth.ConfirmationResult
let recaptchaVerifier: firebase.auth.RecaptchaVerifier

function prevalidatePhoneNumber(phone: string) {
	const numberized = phone.replace(/[^0-9]/g, '')
	const countrified =
		numberized.length <= 10 && numberized.substr(0, 1) !== '1' ? '1' + numberized : numberized
	const validPhone = countrified.substr(0, 1) === '+' ? countrified : '+' + countrified
	console.log('validPhone', validPhone)
	return validPhone
}

export default defineComponent({
	name: 'LoginPhone',
	setup() {
		const router = useRouter()
		const rx = reactive({
			msg: {
				phone: {
					success: false,
					error: false,
				},
				confirm: {
					error: false,
				},
			},
			phone: '',
			confCode: '',
			acceptingCode: false,
		})

		async function signInWithPhone(response?: Response) {
			console.log('response', response)
			// reCAPTCHA solved, allow signInWithPhoneNumber
			await auth
				.signInWithPhoneNumber(prevalidatePhoneNumber(rx.phone), recaptchaVerifier)
				.then((confirmationResult) => {
					rx.acceptingCode = true
					rx.msg.phone.success = true
					cache('phone', rx.phone)
					confirmResult = confirmationResult
				})
				.catch((error) => {
					console.error("didn't send SMS", error)
					rx.msg.phone.error = true
					recaptchaVerifier.clear()
					// recover from SMS fail by resetting recaptcha
					recaptchaVerifier.render().then((widgetId) => {
						console.log('widgetId', widgetId)
					})
					uncache('phone')
					rx.phone = ''
				})
		}

		function acceptConfirmationCode() {
			if (rx.acceptingCode) {
				confirmResult
					.confirm(rx.confCode)
					.then((result) => {
						const user = result.user
						if (user && user.phoneNumber && user.uid) {
							console.log('user is ', user.uid, 'with phone', user.phoneNumber)
							localStorage.setItem('phoneForSignIn', user.phoneNumber)
						}
						router.go(-1)
					})
					.catch((error) => {
						console.error('invalid confirmation code', error)
						rx.msg.confirm.error = true
						rx.confCode = ''
						rx.acceptingCode = false
					})
			} else throw new Error('not ready to accept a confirmation code')
		}

		onMounted(() => {
			recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone_butt', {
				size: 'invisible',
				callback: (response: Response) => {
					signInWithPhone(response)
				},
				'expired-callback': () => {
					recaptchaVerifier.clear()
					recaptchaVerifier.render()
				},
			})
		})

		return {
			signInWithPhone,
			acceptConfirmationCode,
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
	margin-top: 0;
}

.phone-input {
	width: 12em;
}
</style>
