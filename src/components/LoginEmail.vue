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
      transition.over.msg.between(name="slide-fade" mode="out-in" appear)
        label.between(for="email_login" v-if="emailSuccessMsg")
          | We've sent the magic link to your email.
        label.between(for="email_login" v-else)
          | 🪄 We'll send you a magic link 🔗
      button.btn.lg.outline#email_butt(
        type="submit"
        @click.prevent="emailLinkSend"
        ) Login via Email
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import {setu, clearu} from '../store/user'

export default defineComponent({
  name: 'LoginEmail',
  props: {
    from: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const rx = reactive({
      email: '',
      emailSuccessMsg: false,
    })

    async function emailLinkSend() {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:3000/' : import.meta.env.BASE_URL
      // console.log('baseUrl', baseUrl)
      // console.log('import.meta.env.DEV', import.meta.env.DEV)
      // console.log('baseUrl + this.$route.path.slice(1)', baseUrl + this.$route.path.slice(1))
      const actionCodeSettings = {
        url: baseUrl + props.from, // where to send user back to
        handleCodeInApp: true, // must be true?
      }
      // console.log('actionCode url', actionCodeSettings.url)
      await firebase
        .auth()
        .sendSignInLinkToEmail(rx.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          rx.emailSuccessMsg = true
          // Save the email locally so you don't need to ask the user for it again if they open the link on the same device
          setu('email', rx.email)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error("couldn't send sign in link", errorCode, errorMessage)
          clearu('email')
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
  font-weight: 600;
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
