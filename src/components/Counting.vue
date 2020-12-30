<template lang="pug">
.counting
  .hexagram(
    @click="baguad=!baguad"
  ) {{ hex.hexagram }}
  .binary(hidden) {{ hex.binary }}
  .order(@click.stop="reorderTiles")
    .octal(
      v-if="!wenny"
      :title="`Octal No. ${hex.octal}`"
    ) {{ hex.octal }}
    .kingwen(
      v-if="wenny"
      :title="`King Wen No. ${hex.kingwen}`"
    ) {{ hex.kingwen }}
  bagua(
    v-show="baguad"
    @click="baguad = !baguad"
    :above="hex.trigramPair.above"
    :below="hex.trigramPair.below"
  )
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defHex, Hexagram } from "../schema";
import Bagua from "./Bagua.vue";

export default defineComponent({
  name: "Counting",
  components: {
    bagua: Bagua,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default: defHex,
    },
  },
  data() {
    return {
      wenny: false,
      baguad: false,
    };
  },
  mounted() {
    this.$bus.on("reorder_tiles", (wenny) => {
      this.wenny = wenny;
    });
  },
  methods: {
    reorderTiles() {
      const wenny = !this.wenny;

      this.$bus.emit("reorder_tiles", wenny);
    },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

.hexagram {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 2em;
  cursor: pointer;
  pointer-events: auto;
}

.hexagram:hover,
.hexagram:focus,
.hexagram:active {
  color: $blaze;
}

.order {
  position: absolute;
  top: $pad;
  right: $pad;
  cursor: pointer;
}
</style>
