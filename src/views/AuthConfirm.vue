<template lang="pug">
Page.auth-confirm
	transition(name="fade" mode="out-in" appear)
		.flex.mid.col(v-if="state === 'verifying'")
			Waiter
			h2.font Verifying your magic link...
		.flex.mid.col(v-else-if="state === 'success'")
			h2.font ✨ Authenticated!
			p.font Redirecting to your journal...
		.flex.mid.col(v-else-if="state === 'error'")
			h2.font.alert ⚠️ Link Expired or Invalid
			p.font {{ errorMsg }}
			router-link.btn.lg.outline(:to="{name: 'login'}") Back to Sign In
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../firebase';
import { cacheUser, cached } from '../store/cache';
import Page from '../components/Page.vue';
import Waiter from '../components/Waiter.vue';

export default defineComponent({
	name: 'AuthConfirm',
	components: { Page, Waiter },
	setup() {
		const router = useRouter();
		const route = useRoute();

		const rx = reactive({
			state: 'verifying' as 'verifying' | 'success' | 'error',
			errorMsg: '',
		});

		async function verifyMagicLink() {
			try {
				// Get the token_hash and type from URL params
				const token_hash = route.query.token_hash as string;
				const type = route.query.type as string;

				if (!token_hash || !type) {
					throw new Error('Invalid magic link: missing token_hash or type');
				}

				if (type !== 'email') {
					throw new Error(`Unsupported auth type: ${type}`);
				}

				// Get the email from cache (saved when user submitted the form in LoginEmail)
				const userEmail = cached.email as string;
				if (!userEmail) {
					throw new Error('Email not found in session. Please try signing in again.');
				}

				// DEBUG: Log all params before verification
				console.log(`DEBUG AuthConfirm - token_hash: ${token_hash}`);
				console.log(`DEBUG AuthConfirm - email: ${userEmail}`);
				console.log(`DEBUG AuthConfirm - type: email`);

				// Prepare the verification request
				const verifyRequest = {
					email: userEmail,
					token: token_hash,
					type: 'email',
				};
				console.log('Calling verifyOtp with:', verifyRequest);

				// Verify the OTP token with Supabase
				const { data, error } = await supabase.auth.verifyOtp(verifyRequest);

				if (error) {
					console.error('Auth verification failed:', error);
					rx.state = 'error';
					rx.errorMsg =
						error.message || 'Failed to verify your magic link. Please try signing in again.';
					// Redirect to login after 3 seconds
					setTimeout(() => {
						router.replace({ name: 'login' });
					}, 3000);
					return;
				}

				if (data?.user) {
					console.log('User authenticated:', data.user.id);
					cacheUser(data.user);
					rx.state = 'success';

					// Redirect to journal after a brief delay for UX
					setTimeout(() => {
						router.replace({ name: 'journal' });
					}, 500);
				} else {
					throw new Error('No user returned from verification');
				}
			} catch (err) {
				const error = err as Error;
				console.error('Auth confirmation error:', error.message);
				rx.state = 'error';
				rx.errorMsg = error.message || 'Something went wrong. Please try signing in again.';

				// Redirect to login after 3 seconds
				setTimeout(() => {
					router.replace({ name: 'login' });
				}, 3000);
			}
		}

		onMounted(() => {
			verifyMagicLink();
		});

		return {
			...toRefs(rx),
		};
	},
});
</script>

<style lang="postcss" scoped>
.auth-confirm {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}

.flex.mid.col {
	flex-direction: column;
	gap: 1rem;
	text-align: center;
}

.auth-confirm h2 {
	margin: 1rem 0;
	font-size: 1.5rem;
}

.auth-confirm p {
	margin: 0.5rem 0;
}

.auth-confirm .btn {
	margin-top: 1rem;
}
</style>
