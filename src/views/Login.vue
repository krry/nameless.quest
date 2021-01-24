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
              v-show="choseEmail"
              :required="choseEmail"
              tabindex="0"
              maxlength="50"
              placeholder="joy.lake@bmail.com"
              )
          button.btn.lg.outline#email_butt(
            type="submit"
            @click.prevent="showOrSubmit"
            ) Login via Email
          label.between(for="email_login") 🪄 We'll send {{email}} a magic link 🔗
      .half(:class="{muted: isProd}")
        transition.over(name="slide-fade" mode="out-in" appear)
          .field(v-if="!acceptingCode")
            transition.under(name="slide-fade")
              input#phone.large(
                type="tel"
                v-model="phone"
                v-show="chosePhone"
                :required="chosePhone"
                placeholder="First the country code"
                pattern="[0-9]{10,14}"
                maxlength="14"
                )
            button.btn.lg.outline#phone_butt(
              type="submit"
              ref="phone-butt"
              @click.prevent="showOrSubmit"
              ) Login via Phone
            label.between(for="email_login") 💬 We'll text {{phone}} a secure code 📲
          .field(v-else)
            input#phone_code(
              type="tel"
              ref="phone-code"
              v-model="confcode"
              pattern="[0-9]{0,6}"
              maxlength="6"
              placeholder="314159"
              )
            button.btn.outline.md(@click="confirmCode") Confirm
            label(for="phone_code") The code we texted you
    transition.under.msg(name="slide-fade" appear)
      h3(v-if="phoneSuccessMsg")
        | We've texted the secret code to your phone. You may close this window.
    transition.under.msg(name="slide-fade" appear)
      h3(v-if="phoneErrorMsg")
        | We couldn't send an SMS to this number. You could retry, reload the page, or use email.
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

let recaptchaVerifier: firebase.auth.RecaptchaVerifier
let confirmResult: firebase.auth.ConfirmationResult

export default defineComponent({
  name: 'Login',
  components: {
    Page,
    LogoBrand,
  },
  data() {
    return {
      email: 'you',
      phone: 'you',
      confCode: '',
      recaptchaId: '',
      choseEmail: false,
      chosePhone: false,
      acceptingCode: false,
      emailSuccessMsg: false,
      phoneErrorMsg: false,
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
      callback: (response: Response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('response', response)
      },
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
    async signInWithPhone() {
      const appVerifier = recaptchaVerifier
      const confCode = this.confCode
      await firebase
        .auth()
        .signInWithPhoneNumber(this.phone, appVerifier)
        .then((confirmationResult) => {
          this.acceptingCode = true
          this.phoneSuccessMsg = true
          confirmResult = confirmationResult
        })
        .catch((error) => {
          console.error("didn't send SMS", error)
          this.phoneErrorMsg = true
          // recover from SMS fail by resetting recaptcha
          // window.recaptchaVerifier.render().then(function (widgetId) {
          // grecaptcha.reset(widgetId)
          // })
        })
      if (this.acceptingCode) {
        confirmResult
          .confirm(confCode)
          .then((result) => {
            const user = result.user
            if (user && user.phoneNumber && user.uid) {
              console.log('user is ', user.uid, 'with phone', user.phoneNumber)
              localStorage.setItem('phoneForSignIn', user.phoneNumber)
            }
          })
          .catch((error) => {
            console.error('bad verification code', error)
          })
      }
    },
    showOrSubmit(e: MouseEvent) {
      const id = (e.target as HTMLElement).id
      if (!id) {
        throw new Error('tantrum')
      }
      console.log('id is', id)
      console.log('this.choseEmail is', this.choseEmail)
      console.log('this.chosePhone is', this.chosePhone)
      if (id === 'email_butt') {
        if (!this.choseEmail) {
          this.choseEmail = !this.chosePhone
          this.email = ''
          this.phone = ''
        } else this.emailLinkSend()
      } else if (id === 'phone_butt') {
        if (!this.chosePhone) {
          this.chosePhone = !this.choseEmail
          this.email = ''
          this.phone = ''
        } else this.signInWithPhone()
      }
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
