<template lang="pug">
Page.login
  .flex.mid
    LogoBrand(direction="right" size="large")
  h1
    | Passwordless Login 
    sup
      a(@click="explainPasswordless = !explainPasswordless") ???
  transition.over(name="slide-fade" appear)
    p(v-if="explainPasswordless")
      | Frankly 
      router-link(to="https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb") passwords are obsolete
      |  as a security measure. Passwordless login is easier and more secure.

  section
    transition.under.msg(name="slide-fade" appear)
      h3(v-show="msg.phone") {{ msg.phone }}
    transition.over.msg(name="slide-fade" appear)
      h3(v-if="msg.email") {{ msg.email }}
    form.flex.space.spread(@submit.prevent="showOrSubmit")
      .half
        .field
          transition.under(name="slide-fade")
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
                placeholder="+2.718.281.8284"
                pattern="[0-9]{7,14}"
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
  h2.tagline Abandon all belief ye who enter here.
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import LogoBrand from '../components/LogoBrand.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default defineComponent({
  name: 'Login',
  components: {
    Page,
    LogoBrand,
  },
  data() {
    return {
      choseEmail: false,
      chosePhone: false,
      acceptingCode: false,
      phone: 'you',
      email: 'you',
      recaptchaId: '',
      explainPasswordless: false,
      msg: {
        email: '',
        phone: '',
      },
    }
  },
  computed: {
    isProd(): boolean {
      // console.log('env', process.env.NODE_ENV)
      return process.env.NODE_ENV === 'development'
    },
  },
  mounted() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone_butt', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('response', response)
      },
    })
    this.recaptchaId = window.recaptchaVerifier.v.a
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
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          this.msg.email = 'Sent! Click the magic link in your email to sign in passwordlessly.'
          window.localStorage.setItem('emailForSignIn', this.email)
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error("couldn't send sign in link", errorCode, errorMessage)
        })
    },
    async signInWithPhone() {
      const appVerifier = window.recaptchaVerifier

      await firebase
        .auth()
        .signInWithPhoneNumber(this.phone, appVerifier)
        .then((confirmationResult) => {
          this.acceptingCode = true
          this.msg.phone = 'Check your texts for a 6-digit code from 44398'
          window.confirmationResult = confirmationResult
        })
        .catch((error) => {
          console.error("didn't send SMS", error)
          // recover from SMS fail by resetting recaptcha
          // window.recaptchaVerifier.render().then(function (widgetId) {
          // grecaptcha.reset(widgetId)
          // })
        })
      window.confirmationResult
        .confirm(this.confcode)
        .then((result) => {
          const user = result.user
          console.log('user is ', user)
        })
        .catch((error) => {
          console.error('bad verification code', error)
        })
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

<style lang="postcss">
.grecaptcha-badge {
  visibility: hidden;
  opacity: 0;
  text-indent: -99999px;
  pointer-events: none;
  transform: scale(0);
}

label,
.between,
.btn,
input {
  margin: 0.25rem 0 !important;
}

.field {
  flex-direction: column-reverse;
}
</style>
