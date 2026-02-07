<template lang="pug">
Page.login(
  ref="el"
  )
  .flex.mid
    LogoBrand(direction="horiz" size="large")
  h1
    | Sign in
  transition(name="slide-fade" mode="out-in" appear)
    LoginEmail.left
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

export default defineComponent({
	name: 'LoginPage',
	components: {
		Page,
		AppLink,
		LogoBrand,
		LoginEmail,
	},
	data() {
		return {
			explained: false,
		};
	},
});
</script>

<style lang="postcss" scoped>
.login h1 {
	margin: 1rem 0 0;
}

.login h3 {
	margin: 0.5rem 0;
}
</style>
