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
					placeholder="+1 618 033 9887"
					pattern="[0-9]{10,14}"
					maxlength="14"
					)
				transition.under.msg(name="slide-fade" appear mode="out-in")
					label.between(v-if="msg.phone.success")
						| We've texted the secret code to your phone.
					label.between(v-else-if="msg.phone.error")
						| We couldn't send an SMS to this number.
						br
						| You could retry, reload the page, or use email.
					label.between(v-else-if="msg.confirm.error")
						| Oops, we need to send you a fresh code. Please try again.
					label.between(v-else for="email_login")
						| 💬 We'll text you a&nbsp;secure&nbsp;code&nbsp;📲
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
import { defineComponent, reactive, toRefs } from 'vue';
import { supabase } from '../firebase';
import { useRouter } from 'vue-router';
import { cache, uncache, cacheUser } from '../store/cache';
import Waiter from './Waiter.vue';

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

		async function signInWithPhone() {
			const validatedPhone = prevalidatePhoneNumber(rx.phone);
			rx.awaiting = true;
			const { error } = await supabase.auth.signInWithOtp({
				phone: validatedPhone,
				options: {
					shouldCreateUser: true,
				},
			});

			if (error) {
				rx.awaiting = false;
				console.error("didn't send SMS", error.message);
				rx.msg.phone.error = true;
				uncache('phone');
				rx.phone = '';
			} else {
				rx.awaiting = false;
				rx.acceptingCode = true;
				rx.msg.phone.success = true;
				cache('phone', validatedPhone);
			}
		}

		async function acceptConfirmationCode() {
			if (rx.acceptingCode) {
				const validatedPhone = prevalidatePhoneNumber(rx.phone);
				rx.awaiting = true;
				const { data, error } = await supabase.auth.verifyOtp({
					phone: validatedPhone,
					token: rx.confCode,
					type: 'sms',
				});

				if (error) {
					rx.awaiting = false;
					console.error('invalid confirmation code', error.message);
					rx.msg.confirm.error = true;
					rx.confCode = '';
					rx.acceptingCode = false;
				} else if (data.user) {
					rx.awaiting = false;
					console.log('user is logged in:', data.user.id);
					cacheUser(data.user);
					router.push('/journal');
				}
			} else {
				throw new Error('not ready to accept a confirmation code');
			}
		}

		function signInOrConfirm() {
			if (rx.acceptingCode) acceptConfirmationCode();
			else {
				signInWithPhone();
			}
		}

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
