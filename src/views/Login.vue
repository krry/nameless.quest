<template lang="pug">
Page.login(ref="el")
  .flex.mid
    LogoBrand(direction="right" size="large")
  h1
    | Sign in
  h3.text-center
    a(@click="explainPasswordless = !explainPasswordless") It's passwordless!?
  transition.over(name="slide-fade" appear)
    p(v-if="explainPasswordless")
      | Frankly 
      router-link(to="https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb") passwords are obsolete
      |  as a security measure.
      br
      | Signing in passwordlessly is easier and more secure.
  section
    h4.text-center.tagline Abandon the random, ye who enter here.
    form.flex.space.spread.wrap(@submit.prevent="showOrSubmit")
      .half
        .field
          transition.left(name="slide-fade")
            input#email.large(
              type="email"
              v-model="email"
              tabindex="0"
              maxlength="50"
              placeholder="joy.lake@bmail.com"
              )
          button.btn.lg.outline#email_butt(
            type="submit"
            @click="emailLinkSend"
            ) Login via Email
          label.between(for="email_login") 🪄 We'll send {{email}} a magic link 🔗
      .half(:class="{muted: isProd}")
        transition.over(name="slide-fade" mode="out-in" appear)
          .field(v-if="!acceptingCode")
            transition.under(name="slide-fade")
              input#phone.large(
                type="tel"
                v-model="phone"
                placeholder="First the country code"
                pattern="[0-9]{10,14}"
                maxlength="14"
                )
            button.btn.lg.outline#phone_butt(
              type="submit"
              ref="phone-butt"
              @click="signInWithPhone"
              ) Login via Phone
            label.between(for="email_login") 💬 We'll text {{phone}} a secure code 📲
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
            button.btn.outline.md#confirm_butt(@click="acceptConfirmationCode") Confirm
            label(for="phone_code") The code we texted you
    transition.under.msg(name="slide-fade" appear)
      h3(v-if="phoneSuccessMsg")
        | We've texted the secret code to your phone. Please enter it above.
    transition.under.msg(name="slide-fade" appear)
      h3(v-if="phoneErrorMsg")
        | We couldn't send an SMS to this number. You could retry, reload the page, or use email.
    transition.under.msg(name="slide-fade" appear)
      h3(v-if="confirmErrorMsg")
        | Oops, we need to send you a fresh code. Please tap the Login via Phone button above.
    transition.over.msg(name="slide-fade" appear)
      h3(v-if="emailSuccessMsg")
        | We've sent the magic link to your email. You may close this window.
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import LogoBrand from '../components/LogoBrand.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

let confirmResult: firebase.auth.ConfirmationResult
let recaptchaVerifier: firebase.auth.RecaptchaVerifier

function prevalidatePhoneNumber(phone: string) {
  return phone.substr(0, 1) === '+' ? phone : '+' + phone
}

export default defineComponent({
  name: 'Login',
  components: {
    Page,
    LogoBrand,
  },
  data() {
    return {
      email: '',
      phone: '',
      confCode: '',
      recaptchaId: '',
      acceptingCode: false,
      emailSuccessMsg: false,
      phoneErrorMsg: false,
      confirmErrorMsg: false,
      phoneSuccessMsg: false,
      explainPasswordless: false,
    }
  },
  computed: {
    isProd(): boolean {
      // console.log('env', process.env.NODE_ENV)
      return process.env.NODE_ENV === 'development'
    },
  },
  mounted() {
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone_butt', {
      size: 'invisible',
      callback: (response: Response) => this.signInWithPhone(response),
      'expired-callback': () => recaptchaVerifier.clear(),
    })
  },
  methods: {
    async emailLinkSend() {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:3000/' : import.meta.env.BASE_URL
      console.log('baseUrl', baseUrl)
      console.log('import.meta.env.DEV', import.meta.env.DEV)
      console.log('baseUrl + this.$route.path.slice(1)', baseUrl + this.$route.path.slice(1))
      const actionCodeSettings = {
        url: baseUrl + 'journal', // where to send user back to
        handleCodeInApp: true, // must be true?
      }
      console.log('actionCode url', actionCodeSettings.url)
      await firebase
        .auth()
        .sendSignInLinkToEmail(this.email, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          this.emailSuccessMsg = true
          // Save the email locally so you don't need to ask the user for it again if they open the link on the same device
          localStorage.setItem('emailForSignIn', this.email)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error("couldn't send sign in link", errorCode, errorMessage)
        })
    },
    async signInWithPhone(response: Response) {
      console.log('response', response)
      // reCAPTCHA solved, allow signInWithPhoneNumber
      await firebase
        .auth()
        .signInWithPhoneNumber(prevalidatePhoneNumber(this.phone), recaptchaVerifier)
        .then((confirmationResult) => {
          this.acceptingCode = true
          this.phoneSuccessMsg = true
          confirmResult = confirmationResult
        })
        .catch((error) => {
          console.error("didn't send SMS", error)
          this.phoneErrorMsg = true
          recaptchaVerifier.clear()
          // recover from SMS fail by resetting recaptcha
          recaptchaVerifier.render().then((widgetId) => {
            console.log('widgetId', widgetId)
          })
        })
    },
    acceptConfirmationCode() {
      if (this.acceptingCode) {
        confirmResult
          .confirm(this.confCode)
          .then((result) => {
            const user = result.user
            if (user && user.phoneNumber && user.uid) {
              console.log('user is ', user.uid, 'with phone', user.phoneNumber)
              localStorage.setItem('phoneForSignIn', user.phoneNumber)
            }
            this.$router.go(-1)
          })
          .catch((error) => {
            console.error('bad verification code', error)
            this.confirmErrorMsg = true
            this.confCode = ''
            this.acceptingCode = false
          })
      } else throw new Error('not ready to accept confirmation code')
    },
  },
})
</script>

<style lang="postcss" scoped>
.grecaptcha-badge,
.grecaptcha-logo {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  text-indent: -99999px !important;
  pointer-events: none !important;
  transform: scale(0) !important;
}

label,
.between,
.btn,
input {
  margin: 0.25rem 0 !important;
}

.field {
  flex-direction: column-reverse;
  margin: 1rem 2rem;
}
</style>
