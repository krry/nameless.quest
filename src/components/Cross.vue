<template lang="pug">
.cross(:class="{horiz: !texty}")
  transition-group(name="swap-fade")
    .glyphs.bottom-feeder(
      v-show="!texty"
      :key="hex.trigramPair.above"
    )
      gua(
        :gua="hex.trigramPair.above"
        :turned="!texty"
      )
    .text.left-feeder(
      v-show="texty"
      :key="hex.judgment.slice(10)"
      @click.stop="moar = !moar"
    )
      pre.judgment {{ hex.judgment }}
    .hexandbin.stack(
      :key="hex.hexagram"
    )
      .hexagram(
        :class="{turned: !texty}"
      ) {{ hex.hexagram }}
      .binary(
        v-show="!texty"
      ) {{ hex.binary.slice(2) }}
    .text.right-feeder(
      v-show="texty && !moar"
      :key="hex.images.slice(10)"
      @click.stop="moar = !moar"
    )
      pre.images {{ hex.images }}
    .lines.text.right-feeder(
      v-show="texty && moar"
      v-for="(gram, index) in hex.lines"
      :key="gram.meaning.slice(10)"
      @click.stop="moar = !moar"
    )
      gram(
        :content="gram"
        :changing="roll.changing"
      )
    .glyphs.bottom-feeder(
      v-show="!texty"
      :key="hex.trigramPair.below"
    )
      gua(
        :gua="hex.trigramPair.below"
        :turned="!texty"
      )
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Roll, defRoll, Hexagram, defHex } from "../schema";
import Gua from "./Gua.vue";
import Gram from "./Gram.vue";

export default defineComponent({
  name: "Card",
  components: {
    gua: Gua,
    gram: Gram,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default: defHex,
    },
    texty: Boolean,
    roll: {
      type: Object as PropType<Roll>,
      default: defRoll,
    },
  },
  data() {
    return {
      wenny: false,
      moar: false,
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

.cross {
  padding-bottom: 2rem;
}

.cross.horiz {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  min-width: 16em;
}

.stack {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.glyphs {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
}

.hexagram {
  /* border: 1px solid red; */
  margin: 0 auto;
  font-size: 4em;
  cursor: pointer;
  transition: transform 444ms 444ms ease-in-out;
  transform-origin: center center;
}

.hexagram:hover,
.hexagram:focus {
  color: $blaze;
}

.hexagram.turned {
  height: 1em;
  width: 1em;
  transform: rotateZ(-90deg);
}

.swap-fade-enter-active,
.swap-fade-leave-active {
  transition: all 444ms ease;
}

.swap-fade-leave-active {
  /* position: absolute; */
}

.swap-fade-enter-from,
.swap-fade-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-20em);
}

.swap-fade-leave-to.bottom-feeder,
.swap-fade-enter-from.bottom-feeder {
  transform: translateY(20em);
}

.swap-fade-leave-to.right-feeder,
.swap-fade-enter-from.right-feeder {
  transform: translateX(20em);
}
</style>
