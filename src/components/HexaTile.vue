<template lang="pug">
.names(
  :title="names.pinyin"
  )
  hanzi(
    v-for="(char, index) in names.chinese"
    :key="index"
    :char="char"
    :pinyin="pinyin[index]"
  )
  h4.yingyu {{ names.english }}
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {defHex, Hexaname} from "../schema";
import HanziChars from "./HanziChars.vue";

export default defineComponent({
  name: "Tile",
  components: {
    hanzi: HanziChars,
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
    pinyin(): string[] {
      return this.names.pinyin.split(" ");
    },
  },
});
</script>

<style lang="postcss" scoped>
.names {
  cursor: pointer;
  opacity: 0.75;
  color: var(--flair);
}

.names:hover,
.names:focus {
  color: var(--link);
  opacity: 1;
}

.yingyu {
  margin: 0;
  color: var(--ink);
}
</style>
<style lang="postcss">
.active .tile.names,
.active .tile.names:focus,
.active .tile .yingyu {
  color: var(--ground);
}
</style>
