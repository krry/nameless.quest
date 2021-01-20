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
import {defineComponent, ref, reactive, toRefs} from "vue";
import {parseTossToBinary, checkForFreshSavedData} from "../utils/tosses";
import {useRolls} from "../composables/rolls";
import OracleQuery from "./OracleQuery.vue";
import OracleToss from "./OracleToss.vue";
// import OracleResult from "./OracleResult.vue";

export default defineComponent({
  name: "OracleCard",
  components: {
    Query: OracleQuery,
    Toss: OracleToss,
    // Result: OracleResult,
  },
  emits: ["reopen", "close", "show"],
  setup() {
    const {setActiveRoll} = useRolls();
    const query = ref(checkForFreshSavedData("query"));
    const toss = ref(checkForFreshSavedData("toss"));
    const bins = ref([""]);
    const oracleData = reactive({
      query,
      toss,
      bins,
      setActiveRoll,
    });

    if (toss.value) setActiveRoll(toss.value);

    return {
      ...toRefs(oracleData),
    };
  },
  methods: {
    clearBoth() {
      confirm(
        "Are you sure you want to start over? This will clear today's question and answer."
      );
      this.saveQuery("");
      this.saveToss("");
      this.$emit("reopen");
    },
    saveQuery(query: string) {
      // console.log("saving query", query);
      this.query = query;
      localStorage.setItem("query", query);
      localStorage.setItem("querySaved", new Date().getTime().toString());
    },
    saveToss(toss: string) {
      // console.log("saving toss", toss);
      if (this.toss !== toss) {
        this.toss = toss;
        this.setActiveRoll(toss);
        localStorage.setItem("toss", toss);
        localStorage.setItem("tossSaved", new Date().getTime().toString());
        this.getNewLots(toss);
      }
    },
    getNewLots(toss: string) {
      const bins = parseTossToBinary(toss);
      if (this.bins !== bins) {
        this.bins = bins;
        localStorage.setItem("lots", JSON.stringify(bins));
        localStorage.setItem("lotsSaved", new Date().getTime().toString());
        this.showCards(bins);
      }
    },
    showCards(bins: string[]) {
      this.$emit("close");
      setTimeout(() => this.$emit("show", bins), 500);
    },
  },
});
</script>

<style lang="postcss">
.oracle.sleeve,
.oracle .card {
  min-height: 32em;
}
</style>
