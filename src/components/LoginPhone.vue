<template lang="pug">
form.flex.space.spread.wrap(@submit.prevent="acceptingCode ? acceptConfirmationCode : signInWithPhone")
	section#phone_login.rel
		transition(name="fade")
			Waiter.abs.abs-0.z12(v-if="awaiting")
		transition.right(name="slide-fade" mode="out-in" appear)
			.field(
				v-if="!acceptingCode"
				:class="{inert: awaiting}"
				)
				input#phone.phone-input.large(
					type="tel"
					v-model="phone"
					autocomplete="tel"
					name="mobile phone number"
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
			.field(v-else)
				input#phone_code(
					v-autofocus
					type="tel"
					name="phone"
					autocomplete="tel"
					v-model="confCode"
					pattern="[0-9]{0,6}"
					maxlength="6"
					placeholder="314159"
					)
				label.between(for="phone_code") ☝️ What's the secret code we texted you?
		button.btn.lg.outline#phone_butt(
			type="submit"
			@click.prevent="signInOrConfirm"
			:class="{inert: awaiting}"
			)
			span(v-if="acceptingCode") Confirm
			span(v-else) Sign in via Phone
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { signInWithPhoneNumber, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'vue-router';
import { cache, uncache } from '../store/cache';
import Waiter from './Waiter.vue';

let confirmResult: ConfirmationResult;
let recaptchaVerifier: RecaptchaVerifier;
let recaptchaResponse: Response;

function prevalidatePhoneNumber(phone: string) {
	const numberized = phone.replace(/[^0-9]/g, '');
	const countrified =
		numberized.length <= 10 && numberized.substr(0, 1) !== '1' ? '1' + numberized : numberized;
	const validPhone = countrified.substr(0, 1) === '+' ? countrified : '+' + countrified;
	console.log('validPhone', validPhone);
	return validPhone;
}

export default defineComponent({
	name: 'LoginPhone',
	components: { Waiter },
	setup() {
		const router = useRouter();
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
			awaiting: false,
		});

		async function signInWithPhone(response?: Response) {
			console.log('response', response);
			// reCAPTCHA solved, allow signInWithPhoneNumber
			const validatedPhone = prevalidatePhoneNumber(rx.phone);
			// show spinner and ghost the input and button
			rx.awaiting = true;
			await signInWithPhoneNumber(auth, validatedPhone, recaptchaVerifier)
				.then(confirmationResult => {
					rx.awaiting = false;
					// hide spinner and unghost
					rx.acceptingCode = true;
					rx.msg.phone.success = true;
					cache('phone', validatedPhone);
					confirmResult = confirmationResult;
					return response;
				})
				.catch(error => {
					rx.awaiting = false;
					console.error("didn't send SMS", error);
					rx.msg.phone.error = true;
					recaptchaVerifier.clear();
					// recover from SMS fail by resetting recaptcha
					recaptchaVerifier.render().then(widgetId => {
						console.log('widgetId', widgetId);
					});
					uncache('phone');
					rx.phone = '';
				});
		}

		async function acceptConfirmationCode() {
			if (rx.acceptingCode) {
				rx.awaiting = true;
				await confirmResult
					.confirm(rx.confCode)
					.then(result => {
						rx.awaiting = false;
						const user = result.user;
						console.log('user is ', user?.uid, 'with phone', user?.phoneNumber);
						cache('uid', user?.uid);
						cache('phone', user?.phoneNumber);
						router.push('/journal');
					})
					.catch(error => {
						rx.awaiting = false;
						console.error('invalid confirmation code', error);
						rx.msg.confirm.error = true;
						rx.confCode = '';
						rx.acceptingCode = false;
					});
			} else throw new Error('not ready to accept a confirmation code');
		}

		function signInOrConfirm() {
			if (rx.acceptingCode) acceptConfirmationCode();
			else {
				signInWithPhone(recaptchaResponse);
			}
		}

		onMounted(() => {
			recaptchaVerifier = new RecaptchaVerifier(
				'phone_butt',
				{
					size: 'invisible',
					callback: (response: Response) => {
						console.log('recaptcha callback called with response', response);
						recaptchaResponse = response;
						signInWithPhone(response);
					},
					'expired-callback': () => {
						console.log('recaptcha callback expired');
						recaptchaVerifier.clear();
						recaptchaVerifier.render();
					},
				},
				auth
			);
		});

		return {
			signInWithPhone,
			signInOrConfirm,
			acceptConfirmationCode,
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
	margin-top: 0;
}

.phone-input {
	width: 12em;
}
</style>
