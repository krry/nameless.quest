<template lang="pug">
.sleeve.oracle
  .card
    router-view
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {activeRoll} from '../store/rolls'
import {user, setu} from '../store/user'

function checkFreshness(dt: Date): boolean {
  const now = new Date().getTime()
  return now - dt.getTime() < 1000 * 60 * 60 * 24
}

export default defineComponent({
  name: 'OracleCard',
  setup() {
    const rotd = activeRoll.value // roll of the day
    // if there is no new roll and a stored roll from less than yesterday, deconstruct and use its values
    if (rotd && checkFreshness(rotd.moment)) {
      if (!user.query) setu('query', rotd.query)
      if (!user.toss) setu('toss', rotd.toss)
      if (!user.moment) setu('moment', rotd.moment.getTime().toString())
      if (!user.toss) setu('toss', rotd.toss)
    }
  },
})
</script>

<style lang="postcss">
.oracle.sleeve,
.oracle .card {
  max-width: 28rem;
}
</style>
