<template lang="pug">
.cross(:class="{horiz: !texty}")
  transition-group(name="swap-fade")
    .glyphs.bottom-feeder(
      v-if="!texty"
      :key="trigrams.above")
      gua(:gua="trigrams.above" :turned="!texty")
    .text.left-feeder(
      v-if="texty"
      :key="judgment.slice(10)"
      @click.stop="moar = !moar")
      .judgment {{ judgment }}
    .hexandbin.stack(:key="hexagram")
      .hexagram(:class="{turned: !texty}") {{ hexagram }}
      .binary(v-if="!texty") {{ binary.slice(2) }}
    .text.right-feeder(
      v-if="texty && !moar"
      :key="images.slice(10)"
      @click.stop="moar = !moar")
      .images {{ images }}
    .lines.text.right-feeder(
      v-if="texty && moar"
      :key="gram.meaning.slice(10)"
      v-for="(gram, index) in lines"
      @click.stop="moar = !moar")
      gram(:content="gram")
    .glyphs.bottom-feeder(
      v-if="!texty"
      :key="trigrams.below")
      gua(:gua="trigrams.below" :turned="!texty")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defaultHexagram as def } from "../schema";
import Gua from "./Gua.vue";
import Gram from "./Gram.vue";

export default defineComponent({
  name: "Card",
  components: {
    gua: Gua,
    gram: Gram,
  },
  props: {
    texty: Boolean,
    binary: {
      type: String,
      default: def.binary,
    },
    judgment: {
      type: String,
      default: def.judgment,
    },
    images: {
      type: String,
      default: def.images,
    },
    trigrams: {
      type: Object,
      default: def.trigramPair,
    },
    hexagram: {
      type: String,
      default: def.hexagram,
    },
    lines: {
      type: Array,
      default: def.lines,
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
.cross.horiz {
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
  color: hsl(27, 92%, 37%);
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
}

.swap-fade-enter-from,
.swap-fade-leave-to {
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
