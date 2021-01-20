<template lang="pug">
.bagua
  transition-group(
    name="slip"
  )
    gua.above(
      v-if="baguad"
      :key="aboveKey"
      :gua="above"
      :above="true"
    )
    gua.below(
      v-if="baguad"
      :key="belowKey"
      :gua="below"
      :above="false"
    )
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from "vue";
import OneGua from "./OneGua.vue";

export default defineComponent({
  name: "BaguaDoors",
  components: {
    gua: OneGua,
  },
  props: {
    above: {
      type: Number,
      default: 0,
    },
    below: {
      type: Number,
      default: 0,
    },
    baguad: Boolean,
  },
  setup(props) {
    const BaguaData = reactive({
      aboveKey: Symbol(props.above),
      belowKey: Symbol(props.below),
    });
    return {
      ...toRefs(BaguaData),
    };
  },
});
</script>

<style lang="postcss">
.bagua {
  align-items: justify;
  bottom: 0;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  justify-content: space-evenly;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;
}

.bagua .gua {
  flex-direction: row;
  background: var(--flair);
  color: var(--paper);
  pointer-events: auto;
  display: flex;
}

.bagua .gua .trigram {
  transform: none;
}

.bagua .gua:first-child {
  align-items: flex-end;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--glow);
}

.bagua .gua:last-child {
  align-items: flex-start;
  padding-top: 0.5rem;
  border-top: 1px solid var(--glow);
}

.bagua .gua .col:first-child {
  text-align: center;
  flex: 1 0 40%;
}

.bagua .gua .col:last-child {
  text-align: right;
  padding-right: 1rem;
  flex: 1 0 60%;
}

.slip-enter-active,
.slip-leave-active {
  transition: 444ms ease-out;
  transform: translateY(0);
  opacity: 1;
}

.slip-leave-active {
  transition: 444ms ease-in;
}

.slip-enter-to,
.slip-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slip-enter-from,
.slip-leave-to {
  transform: translateY(max(13vh, 7.5rem));
  opacity: 0;
}

.slip-enter-from.above,
.slip-leave-to.above {
  transform: translateY(min(-13vh, -7.5rem));
}
</style>
