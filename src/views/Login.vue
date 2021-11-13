<template lang="pug">
Page.login(
  ref="el"
  )
  .flex.mid
    LogoBrand(direction="horiz" size="large")
  h1
    | Sign in
  .radios.flex.wrap.mid.spread
    label with
    input#checkEmail(
      type="radio"
      v-model="method"
      value="email"
      )
    label(for="checkEmail") Email
    label or
    input#checkPhone(
      type="radio"
      v-model="method"
      value="phone"
      )
    label(for="checkPhone") Phone
  transition(name="slide-fade" mode="out-in" appear)
    LoginEmail.left(v-if="method === 'email'")
    LoginPhone.right(v-else-if="method === 'phone'")
  transition(name="slide-fade" mode="out-in" appear)
    h3.font.alcenter.right(v-if="explained")
      | Frankly!{' '}
      AppLink(to="https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb") passwords are obsolete
      | .
      br
      | Signing in passwordlessly is easier and more secure.
    h3.font.alcenter.left(v-else @click="explained = !explained")
      a It's passwordless!?
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from '../components/Page.vue';
import AppLink from '../components/AppLink.vue';
import LogoBrand from '../components/LogoBrand.vue';
import LoginEmail from '../components/LoginEmail.vue';
import LoginPhone from '../components/LoginPhone.vue';

export default defineComponent({
	name: 'LoginPage',
	components: {
		Page,
		AppLink,
		LogoBrand,
		LoginEmail,
		LoginPhone,
	},
	data() {
		return {
			method: '',
			explained: false,
		};
	},
});
</script>

<style lang="postcss" scoped>
.login h1 {
	margin: 1rem 0 0;
}

.radios,
.login h3 {
	margin: 0.5rem 0;
}
</style>
