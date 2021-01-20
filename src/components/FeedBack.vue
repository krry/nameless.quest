<template lang="pug">
FeedbackFish(projectId="projectId")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {FeedbackFish} from '@feedback-fish/vue'

export default defineComponent({
  name: 'FeedBack',
  components: {
    FeedbackFish,
  },
  data() {
    return {
      projectId: import.meta.env.FEEDBACK_FISH_ID,
    }
  },
})
</script>
