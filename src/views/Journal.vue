<template lang="pug">
Page.journal
  h1 Journal
  h2 Record the Ritual
  p A log of your questions and the oracle's answers. Challenges faced, insights gained.
  .table.flex.align-start
    .col.flex.string
      h3.colh Questions
      .cell(v-for="q in queryList") {{ q.stored[0] }}
    .col.flex.string
      h3.colh Answers
      .cell(
        v-for="item in lotList"
        :key="$getSymbol(item.timestamp)"
        )
        router-link.octalink(
          v-for="bin in item.data"
          :key="$getSymbol(bin)"
          :to="'/change/' + getWenByBin(bin)"
          ) {{ getWenByBin(bin) + '. ' + getEnglishNameByBin(bin) }}
    .col.flex.string
      h3.colh Moments
      time.cell(
        v-for="item in lotList"
        :key="$getSymbol(item.timestamp)"
        :datetime="item.timestamp"
        ) {{ formattedDate(item.timestamp) }}
    .col.flex.string
      h3.colh Notes
      textarea(v-autoresize rows="1" v-for="item in lotList" :key="$getSymbol(item)")
  ComingSoon
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, computed} from 'vue'
import Page from '../components/Page.vue'
import ComingSoon from '../components/ComingSoon.vue'
import {checkForSavedData} from '../utils/tosses'
import {useHexagrams} from '../composables/hexagrams'
const {getHexagramByOctal} = useHexagrams()

export default defineComponent({
  name: 'Journal',
  components: {
    Page,
    ComingSoon,
  },
  props: {
    modal: Boolean,
  },
  setup() {
    const rx = reactive({
      queryList: computed(() => checkForSavedData('query')),
      lotList: computed(() => checkForSavedData('lots')),
    })
    return {
      ...toRefs(rx),
      getHexagramByOctal,
    }
  },
  methods: {
    binaryToOctal(bin: string): string {
      // takes a binary string like 0b010110
      // converts it to a decimal number with parseInt
      // then converts this into an octal string with toString(8)
      return parseInt(bin.slice(2), 2).toString(8)
    },
    formattedDate(ms: number): string {
      const dt = new Date(ms)
      return [
        dt.getHours() + ':' + dt.getMinutes() + ' on',
        dt.getDate(),
        dt.toLocaleString('default', {month: 'short'}),
        dt.getFullYear(),
      ].join(' ')
    },
    getEnglishNameByBin(bin: string): string {
      return this.getHexagramByOctal(this.binaryToOctal(bin))?.names.english || ''
    },
    getWenByBin(bin: string): string {
      return this.getHexagramByOctal(this.binaryToOctal(bin))?.kingwen.toString() || '0'
    },
  },
})
</script>

<style lang="postcss" scoped>
.page.journal {
  background-color: var(--silk);
}

.octalink {
  display: block;
}

.col {
  margin-right: 2rem;
}

.colh {
  border-bottom: 1px solid var(--glow);
}

.col:last-child {
  margin-right: 0;
}

.cell {
  height: 5rem;
  padding: 0.25rem 0.5rem;
}

.table {
  padding: 1rem;
  border: 1px var(--border-style) var(--glow);
  border-radius: var(--bevel);
}
</style>
