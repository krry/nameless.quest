<template lang="pug">
main.grids.fixedfull
  transition-group(
    name="fade"
    tag="section"
    class="hexagrid lower fixedfull"
  )
    framing(
      v-for="(hexagram, index) in sortedHexagrams"
      :key="index"
      :hex="hexagram"
    )
  transition-group(
    name="fade"
    tag="section"
    class="hexagrid upper fixedfull"
  )
    meaning(
      v-for="(hexagram, index) in sortedHexagrams"
      :key="index"
      :hex="hexagram"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HexaData from "../data/hexagrams.json";
import Meaning from "./Meaning.vue";
import Framing from "./Framing.vue";
import { Hexagram } from "../schema";

// const query = `*[_type == "hexagram"]`;
type Hexagrams = Hexagram[];

export default defineComponent({
  name: "Grid",
  components: {
    framing: Framing,
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
  beforeUpdate() {
    this.hexaRefs = [];
  },
  updated() {
    console.log("ref updated", this.hexaRefs);
  },
  methods: {
    onReorder: function (wenny: boolean) {
      this.wenny = wenny;
    },
    setHexaRefs: function (el: never) {
      this.hexaRefs.push(el);
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
.fixedfull {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.hexagrid {
  display: grid;
  font-size: calc(9px + 0.3vw);
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

.upper {
  z-index: 3;
}

.lower {
  z-index: 2;
}
</style>
