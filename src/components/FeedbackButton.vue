<template lang="pug">
button.btn.feedback-fish(
  :class="size, shape"
  @click.stop
  data-feedback-fish
  :data-feedback-fish-userid="user.id"
  ) Feedback?
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User, defUser } from "../schema"

export default defineComponent({
  name: "FeedbackButton",
  props: {
    user: {
      type: Object as PropType<User>,
      default: defUser
    },
    size: {
      type: String,
      default: "small"
    },
    shape: {
      type: String,
      default: "outline"
    },
  },

})
</script>

<style lang="postcss" scoped>
.btn.feedback-fish {
  pointer-events: auto;
}

.btn.secondary {
  background-color: var(--flair);
  border-color: var(--flair);
}
</style>
