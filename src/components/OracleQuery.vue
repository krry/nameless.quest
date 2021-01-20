<template lang="pug">
.face.face--front
  LogoBrand(direction="bottom" size="small")
  .field
    textarea#query(
      v-model="query"
      placeholder="…the burning question?"
      autofocus
      @keyup.enter="askTheOracle"
      )
    label.field-label(for="query") Now·here, my heart wonders…
    label.validator(name="question" :class="{shown: validator==='question'}") Is that a question?
    button.btn(type="button" @click="askTheOracle") Ask the Oracle
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
import {defineComponent} from "vue";
import LogoBrand from "./LogoBrand.vue";
import IconBase from "./icons/IconBase.vue";
import Icon6 from "./icons/Icon6.vue";
import Icon7 from "./icons/Icon7.vue";
import Icon8 from "./icons/Icon8.vue";
import Icon9 from "./icons/Icon9.vue";
import IconCrystalBall from "./icons/IconCrystalBall.vue";
import IconMiracle from "./icons/IconMiracle.vue";

export default defineComponent({
  name: "OracleQuery",
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
  emits: ["query"],
  data() {
    return {
      query: "",
      validator: "",
    };
  },
  methods: {
    askTheOracle() {
      if (this.query.length > 0 && this.query.substr(-2).includes("?")) {
        this.validator = "";
        this.$emit("query", this.query);
      } else {
        this.validator = "question";
        console.warn("Non-question detected!");
      }
    },
  },
});
</script>

<style lang="postcss" scoped>
.validator {
  color: var(--bad);
  order: 3;
  transition: var(--beat) var(--ease-out-sine);
  margin: -0.75em 0 0.75em;
  transform: translateY(2rem);
  opacity: 0;
}

.validator.shown {
  transform: translateY(0);
  opacity: 1;
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
}

.help h3 {
  margin-top: 1em;
}
</style>
