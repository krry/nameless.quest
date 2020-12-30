<template lang="pug">
.mandarin(
  :title="names.pinyin"
  )
  hanzi(
    v-for="(char, index) in names.chinese"
    :key="index"
    :char="char"
  )
  h4 {{ names.english }}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defHex, Hexaname } from "../schema";
import Hanzi from "./Hanzi.vue";

export default defineComponent({
  name: "Tile",
  components: {
    hanzi: Hanzi,
  },
  props: {
    names: {
      type: Object as PropType<Hexaname>,
      default: defHex.names,
    },
  },
  computed: {
    arrayedHanzi(): string[] {
      const hanzi = this.names.chinese;
      if (!hanzi) {
        return [];
      }
      return hanzi.split("");
    },
  },
});
</script>

<style lang="postcss">
@import "../assets/styles/variables";

.mandarin {
  cursor: pointer;
  font-family: $book;
}

.mandarin:hover,
.mandarin:focus {
  color: $blaze;
}

h4 {
  margin: 0;
}
</style>
