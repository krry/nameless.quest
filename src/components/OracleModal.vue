<template lang="pug">
.sleeve.oracle
  .card
    transition(name="flip" appear)
      Query(
        v-if="!query"
        @query="saveQuery"
        )
      Toss(
        v-else
        :query="query"
        @back="clearBoth"
        @toss="saveToss"
        )
      //- Result(
      //-   v-else
      //-   :toss="toss"
      //-   :bins="bins"
      //-   @back="clearBoth"
      //-   @close="$emit('close')"
      //-   @show="showCards"
      //- )
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs} from 'vue'
import {parseTossToBinary, checkForFreshSavedData, saveNewDatum} from '../utils/tosses'
import OracleQuery from './OracleQuery.vue'
import OracleToss from './OracleToss.vue'
// import OracleResult from "./OracleResult.vue";

export default defineComponent({
  name: 'OracleCard',
  components: {
    Query: OracleQuery,
    Toss: OracleToss,
    // Result: OracleResult,
  },
  emits: ['reopen', 'close', 'show'],
  setup() {
    const query = ref(checkForFreshSavedData('query')[0])
    const toss = ref(checkForFreshSavedData('toss')[0])
    const bins = ref([''])
    const oracleData = reactive({
      query,
      toss,
      bins,
    })

    return {
      ...toRefs(oracleData),
    }
  },
  methods: {
    clearBoth() {
      confirm("Are you sure you want to start over? This will clear today's question and answer.")
      this.saveQuery('')
      this.saveToss('')
      this.$emit('reopen')
    },
    saveQuery(query: string) {
      // console.log("saving query", query);
      this.query = query
      saveNewDatum('query', [query])
    },
    saveToss(toss: string) {
      // console.log("saving toss", toss);
      if (this.toss !== toss) {
        this.toss = toss
        saveNewDatum('toss', [toss])
        this.castLots(toss)
      }
    },
    castLots(toss: string) {
      const bins = parseTossToBinary(toss)
      if (this.bins !== bins) {
        this.bins = bins
        saveNewDatum('lots', bins)
        this.showCards(bins)
        // TODO: save as enquiry objects to a real data store with the user record in context
      }
    },
    showCards(bins: string[]) {
      this.$emit('close')
      setTimeout(() => this.$emit('show', bins), 500)
    },
  },
})
</script>

<style lang="postcss">
.oracle.sleeve,
.oracle .card {
  max-width: 28rem;
}
</style>
