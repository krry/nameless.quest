<template lang="pug">
.gua
  .col
    .trigram {{ $options.trigrams[gua].trigram }}
  .col
    span.mand-name {{ $options.trigrams[gua].name.zh }}
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
  mounted() {
    if (this.turned) {
      setTimeout(() => {
        this.$el.classList.add("turned");
      }, 444);
    }
  },
});
</script>

<style scoped lang="postcss">
.gua {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex: 1;
  align-items: center;
}

.trigram {
  font-size: 3em;
}

.turned .trigram {
  transition: transform 444ms ease-in-out;
  transform: rotateZ(-90deg);
}
</style>
