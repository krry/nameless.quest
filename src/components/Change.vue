<template lang="pug">
.change
  transition(name="deal" mode="out-in")
    card(
      v-show="cardShown"
      @click.stop="texty=!texty"
      :quadrant="quadrant"
      :texty="texty"
      :hex="hex"
    )
  tile(
    @click="showCard"
    :names="hex.names"
  )
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defHex, Hexagram } from "../schema";
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
      default: defHex,
    },
  },
  data() {
    return {
      cardShown: false,
      texty: true,
      quadrant: 1,
    };
  },
  mounted() {
    this.$bus.on("close_cards", () => {
      this.cardShown = false;
    });
  },
  methods: {
    showCard() {
      const open = this.cardShown;
      this.closeCard();
      this.quadrant = this.determineQuadrant();
      this.cardShown = !open;
    },
    closeCard() {
      this.$bus.emit("close_cards");
    },
    determineQuadrant() {
      console.log("this.$el.offsetHeight", this.$el.offsetHeight);
      return 2;
    },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

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
  animation: deal-in 555ms ease-out;
}

.deal-leave-active {
  animation: deal-out 555ms ease-out;
}

@keyframes deal-in {
  0% {
    opacity: 0;
    transform: translateY(200%);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes deal-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-200%);
  }
}

@media (--md) {
  @keyframes deal-in {
    0% {
      opacity: 0;
      transform: translate3d(-50%, 200%, 0);
    }

    100% {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }
  }

  @keyframes deal-out {
    0% {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }

    100% {
      opacity: 0;
      transform: translate3d(-50%, -200%, 0);
    }
  }
}
</style>
