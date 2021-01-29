<template lang="pug">
Page.login(
  ref="el"
  )
  .flex.mid
    LogoBrand(direction="right" size="large")
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
    LoginEmail.left(v-if="method === 'email'" :from="fromPath")
    LoginPhone.right(v-else-if="method === 'phone'" :from="fromPath")
  transition(name="slide-fade" mode="out-in" appear)
    h3.text-center.right(v-if="explained")
      | Frankly 
      a(href="https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb") passwords are obsolete
      | .
      br
      | Signing in passwordlessly is easier and more secure.
    h3.text-center.left(v-else @click="explained = !explained")
      a It's passwordless!?
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import LogoBrand from '../components/LogoBrand.vue'
import LoginEmail from '../components/LoginEmail.vue'
import LoginPhone from '../components/LoginPhone.vue'

let fromPath: string

export default defineComponent({
  name: 'Login',
  components: {
    Page,
    LogoBrand,
    LoginEmail,
    LoginPhone,
  },
  beforeRouteEnter(_to, from) {
    console.log('before entering route login', from.path)
    fromPath = from.path
  },
  emits: ['drawer'],
  data() {
    return {
      method: '',
      explained: false,
      fromPath,
    }
  },
})
</script>

<style lang="postcss">
.grecaptcha-badge,
.grecaptcha-logo {
  /* display: none !important; */
  visibility: hidden !important;
  opacity: 0 !important;
  /* text-indent: -99999px !important; */
  /* pointer-events: none !important; */
  transform: scale(0) !important;
}
</style>
<style lang="postcss" scoped>
.login h1 {
  margin: 1rem 0 0;
}

.radios,
.login h3 {
  margin: 0.5rem 0;
}
</style>
