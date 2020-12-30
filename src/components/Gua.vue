<template lang="pug">
.gua
  .col
    .trigram {{ $options.trigrams[gua].trigram }}
  .col
    span.mand-name {{ $options.trigrams[gua].name.zh + " "}}
    span.pnyn-name  {{ $options.trigrams[gua].name.pn }}
    .eng-name {{ $options.trigrams[gua].name.en }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import trigramData from "../data/trigrams.json";

export default defineComponent({
  name: "Gua",
  props: {
    gua: {
      type: Number,
      default: 0,
    },
    turned: Boolean,
  },
  trigrams: trigramData,
  watch: {
    turned: "turnTrigram",
  },
  methods: {
    turnTrigram() {
      setTimeout(() => {
        this.$el.classList.toggle("turned");
      }, 555);
    },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

.gua {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
}

.trigram {
  font-size: 3em;
  transition: transform 444ms ease-in-out;
}

.turned .trigram {
  transform: rotateZ(-90deg);
}
</style>
