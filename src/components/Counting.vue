<template lang="pug">
.counting
  .hexagram(
    @click="baguaShown=!baguaShown"
  ) {{ hexagram }}
  .binary(hidden) {{ binary }}
  .order(@click="reorderTiles")
    .octal(
      v-if="!wenny"
      :title="`Octal No. ${octal}`"
    ) {{ octal }}
    .kingwen(
      v-if="wenny"
      :title="`King Wen No. ${kingwen}`"
    ) {{ kingwen }}
  bagua(
    :shown="baguaShown"
    :above="trigrams.above"
    :below="trigrams.below"
  )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defaultHexagram as def } from "../schema";
import Bagua from "./Bagua.vue";

export default defineComponent({
  name: "Counting",
  components: {
    bagua: Bagua,
  },
  props: {
    hexagram: {
      type: String,
      default: def.hexagram,
    },
    binary: {
      type: String,
      default: def.binary,
    },
    trigrams: {
      type: Object,
      default: def.trigramPair,
    },
    kingwen: {
      type: Number,
      default: def.kingwen,
    },
    octal: {
      type: String,
      default: def.octal,
    },
  },
  data() {
    return {
      wenny: false,
      baguaShown: false,
    };
  },
  mounted() {
    this.$bus.on("reorder_tiles", (wenny) => {
      this.wenny = wenny;
    });
  },
  methods: {
    reorderTiles() {
      this.$bus.emit("reorder_tiles", this.wenny);
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
.hexagram:focus {
  color: hsl(27, 92%, 37%);
}

.order {
  position: absolute;
  top: $pad;
  right: $pad;
}
</style>
