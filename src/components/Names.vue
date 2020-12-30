<template lang="pug">
.names
  .glyphs
    hanzi(
      v-for="(char, index) in names.chinese"
      :key="index"
      :char="char"
      :pinyin="names.pinyin"
      @click.stop="showPinyin = !showPinyin"
      )
    transition(name="slide-fade")
      .pinyin(v-show="showPinyin") {{ names.pinyin }}  
  h3 {{ names.english }}
  .orders(@click.stop="reorderTiles")
    .kingwen(v-if="wenny") King Wen Sequence \#{{ kingwen }}
    .octal(v-if="!wenny") Octal Sequence \#{{ octal }}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defHex, Hexaname } from "../schema";
import Hanzi from "./Hanzi.vue";

export default defineComponent({
  name: "Card",
  components: {
    hanzi: Hanzi,
  },
  props: {
    names: {
      type: Object as PropType<Hexaname>,
      default: defHex.names,
    },
    kingwen: {
      type: Number,
      default: defHex.kingwen,
    },
    octal: {
      type: String,
      default: defHex.octal,
    },
  },
  data() {
    return {
      wenny: false,
      showPinyin: false,
    };
  },
  computed: {
    arrayedHanzi(): string[] {
      if (!this.names.chinese) {
        return [];
      }
      return this.names.chinese.split("");
    },
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

.glyphs {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.glyphs:hover,
.glyphs:focus {
  color: $blaze;
}

.pinyin {
  position: absolute;
  top: -1em;
}

.names {
  display: flex;
  font-family: $book;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1;
}

@media (--md) {
  .names {
    justify-content: flex-end;
  }
}

h3 {
  margin-top: 0;
  margin-bottom: 0.5em;
}

.orders {
  cursor: pointer;
  margin: 0.5rem;
}

.orders:hover,
.orders:focus {
  color: $blaze;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(1em);
  opacity: 0;
}
</style>
