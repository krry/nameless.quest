<template lang="pug">
main.grid
  transition-group(
    name="slide"
    tag="section"
    class="hexagrid"
  )
    meaning(
      v-for="hexagram in sortedHexagrams"
      :key="hexagram.binary"
      :hex="hexagram"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HexaData from "../data/hexagrams.json";
import Meaning from "./Meaning.vue";
import { Hexagram } from "../schema";

// const query = `*[_type == "hexagram"]`;
type Hexagrams = Hexagram[];

export default defineComponent({
  name: "Grid",
  components: {
    meaning: Meaning,
  },
  data() {
    return {
      hexagrams: HexaData,
      wenny: false,
      hexaRefs: [],
    };
  },
  computed: {
    sortedHexagrams: function (): Hexagrams {
      const order = this.wenny ? "kingwen" : "octal";
      return this.hexagrams.slice(0).sort((a: Hexagram, b: Hexagram) => {
        return Number(a[order]) - Number(b[order]);
      });
    },
  },
  mounted: function () {
    this.$bus.on("reorder_tiles", (wenny) => {
      this.wenny = wenny;
    });
  },
  methods: {
    onReorder: function (wenny: boolean) {
      this.wenny = wenny;
    },
    // fetchData() {
    //   this.error = this.post = null;
    //   this.loading = true;
    //   sanity.fetch(query).then(
    //     (hexagrams) => {
    //       this.loading = false;
    //       this.hexagrams = hexagrams;
    //     },
    //     (error) => {
    //       this.error = error;
    //     }
    //   );
    // },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

.grid {
  width: 100vw;
  height: 100vh;
  overflow: auto;

  @media (--lg) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.hexagrid {
  display: grid;
  font-size: clamp(9px, 9px + 0.5vw, 24px);
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  min-height: 100vh;
}
</style>
