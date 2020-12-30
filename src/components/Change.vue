<template lang="pug">
.change
  transition(name="deal" mode="out-in")
    card(
      v-show="detailsShown"
      @click.stop="texty=!texty"
      :quadrant="quadrant"
      :texty="texty"
      :hex="hex"
    )
  tile(
    @click="showDetails"
    :names="hex.names"
  )
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defaultHexagram, Hexagram } from "../schema";
import Card from "./Card.vue";
import Tile from "./Tile.vue";

export default defineComponent({
  name: "Change",
  components: {
    card: Card,
    tile: Tile,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default: defaultHexagram,
    },
  },
  data() {
    return {
      detailsShown: false,
      texty: true,
    };
  },
  computed: {
    quadrant(): number {
      const position = 1;

      // find the center of the viewport
      // const vertCenterOfViewport = document.body.offsetHeight / 2;
      // const horizCenterOfViewport = document.body.offsetWidth / 2;
      // console.log("viewport center x y", horizCenterOfViewport, vertCenterOfViewport);
      // find the center of this card
      // const vertCenterOfChange =
      //   (this.$refs.getBoundingClientRect().top -
      //     this.$refs.getBoundingClientRect().bottom) /
      //   2;
      // const horizCenterOfChange = this.el.offsetWidth;

      // console.log("change center x y", horizCenterOfViewport, vertCenterOfViewport);

      /*
      start by positioning the card centered under the tile
      if the edge of the box is within 16px of an edge of the viewport,
      move
      */
      // const detailsOffsetWidth = this.$el.offsetWidth;
      // const detailsOffsetHeight = this.$el.offsetHeight;
      // const tilePosition = window.offsetHeight - this.$el.scrollTop
      return position;
    },
  },
  mounted() {
    this.$bus.on("close_details", () => {
      this.detailsShown = false;
    });
  },
  methods: {
    showDetails() {
      const open = this.detailsShown;
      this.closeDetails();
      this.detailsShown = !open;
    },
    closeDetails() {
      this.$bus.emit("close_details");
    },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

$position: translate3d(-50%, 0, 0);

.change {
  position: relative;
}

.cross {
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
}

.cross.horiz {
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.binary {
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  margin: auto;
}

.text {
  text-align: justify;
}

.pinyin {
  font-family: $sans;
  font-weight: bold;
  padding: 0 4px;
}

.deal-enter-active {
  animation: deal-in 555ms ease-in;
}

.deal-leave-active {
  animation: deal-out 555ms ease-out;
}

@keyframes deal-in {
  0% {
    opacity: 0;
    transform: translate3d(225%, 225%, 0);
  }

  100% {
    opacity: 1;
    transform: $position;
  }
}

@keyframes deal-out {
  0% {
    opacity: 1;
    transform: $position;
  }

  100% {
    opacity: 0;
    transform: translate3d(225%, 225%, 0);
  }
}
</style>
