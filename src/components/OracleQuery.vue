<template lang="pug">
.face.face--front(tabindex="-1")
  LogoBrand(direction="bottom" size="sm")
  .field
    textarea#query(
      v-autoresize
      v-model="user.query"
      placeholder="…the burning question?"
      autofocus
      rows="1"
      pattern="\?$"
      @keydown.ctrl.enter="askTheOracle"
      )
    label.field-label(for="query") Now·here, my heart wonders…
    label.validation(:class="{shown: invalidQuery}") Is that a question?
    button.btn.lg(type="button" @click="askTheOracle") Ask the Oracle
    label.message
      kbd(title="ctrl+enter") ⌃⏎
      span  to send
  aside.help
    IconBase(width="36" height="36" viewBox="0 0 1000 1000")
      IconCrystalBall
    IconBase(width="36" height="36" viewBox="0 0 100 125")
      IconMiracle
    h3 How to Query the Oracle
    ul.ls
      li 
        IconBase(iconColor="var(--good)")
          Icon7
        span Open questions resolve readily
        IconBase(iconColor="var(--good)")
          Icon7
      li
        IconBase(iconColor="var(--good)")
          Icon9
        span "How might we …?"
        IconBase(iconColor="var(--good)")
          Icon9
      li 
        IconBase(iconColor="var(--bad)")
          Icon8
        span Binary judgments stay opaque
        IconBase(iconColor="var(--bad)")
          Icon8
      li
        IconBase(iconColor="var(--bad)")
          Icon6
        span "Should I …?"
        IconBase(iconColor="var(--bad)")
          Icon6
</template>

<script lang="ts">
import {useRouter} from 'vue-router'
import {defineComponent, ref} from 'vue'
import {user, setu} from '../store/user'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import LogoBrand from './LogoBrand.vue'
import IconBase from '../icons/IconBase.vue'
import IconMiracle from '../icons/IconMiracle.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'

export default defineComponent({
  name: 'OracleQuery',
  components: {
    LogoBrand,
    IconBase,
    Icon6,
    Icon7,
    Icon8,
    Icon9,
    IconCrystalBall,
    IconMiracle,
  },
  setup() {
    const router = useRouter()
    const invalidQuery = ref(false)

    function askTheOracle() {
      if (user.query.length > 0 && user.query.substr(-2).includes('?')) {
        setu('query', user.query)
        router.push({path: 'toss'})
      } else {
        invalidQuery.value = true
        console.warn('Non-question detected!')
      }
    }

    return {
      user,
      setu,
      askTheOracle,
      invalidQuery,
    }
  },
})
</script>

<style lang="postcss" scoped>
.validation {
  order: 3;
  color: var(--bad);
  margin: -0.75em 0 0.75em;
  transform: translateY(2rem);
  opacity: 0;
}

.validation.shown {
  opacity: 1;
  transform: translateY(0);
}

.message {
  order: 5;
}

.field .btn {
  order: 4;
}

.brand,
.field,
.help {
  flex: 1 0 auto;
}

.help {
  margin: 1rem auto;
  padding-bottom: 4rem;
  padding-top: 1rem;
}

.ls .icon {
  vertical-align: middle;
}

.help h3,
.ls li {
  margin: 1em 0;
}
</style>
