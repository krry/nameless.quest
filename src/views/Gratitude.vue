<template lang="pug">
Page.gratitude
  h1 Gratitude
  h3
    | Bottomless thanks to all those
    br
    | who have made Nameless possible
  section
    h3 Thanks to these wonderful photographers…
    dl.photos
      dt
        router-link(to="https://unsplash.com/@philipgraves97") Philip Graves
      dd
        img.thumb(src="/bg-sm/sea1.jpg")
      dd
        img.thumb(src="/bg-sm/sea2.jpg")
      dd
        img.thumb(src="/bg-sm/sea3.jpg")
      dt
        router-link(to="https://unsplash.com/@allain_sidd21") Allain Siddiqui
      dd
        img.thumb(src="/bg-sm/land1.jpg")
      dt
        router-link(to="https://unsplash.com/@mjliao") Michael L
      dd
        img.thumb(src="/bg-sm/land2.jpg")
      dt
        router-link(to="https://unsplash.com/@veeterzy") Veeterzy
      dd
        img.thumb(src="/bg-sm/land3.jpg")
      dt
        router-link(to="https://unsplash.com/@eli_from_prague") Eliška Motisová
      dd
        img.thumb(src="/bg-sm/day2.jpg")
      dt
        router-link(to="https://unsplash.com/@johnwestrock") Dave Hoefler
      dd
        img.thumb(src="/bg-sm/day1.jpg")
      dt
        router-link(to="https://unsplash.com/@dbmartin00") David Brooke Martin
      dd
        img.thumb(src="/bg-sm/day3.jpg")
      dt
        router-link(to="https://unsplash.com/@felix_mittermeier") Felix Mittermeier
      dd
        img.thumb(src="/bg-sm/night1.jpg")
      dt
        router-link(to="https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText") Jeremy Thomas
      dd
        img.thumb(src="/bg-sm/night2.jpg")
      dt
        router-link(to="https://unsplash.com/@luca42?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText") Luca Baggio
      dd
        img.thumb(src="/bg-sm/night3.jpg")
    h3
      | And thanks to 
      router-link(to="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText") Unsplash
      |  for declaring open season on stock photography.
  section.pads.y
    h3 Thanks to the I Ching scholars, enthusiasts, and custodians throughout the ages, especially…
    p.text-left
      | Hilary Barrett, whose 
      router-link(to="https://www.onlineclarity.co.uk/") Online Clarity
      |  I've only just discovered, and from whom I shall learn multitudes about the ways of 
      strong Yì
      | .
    p.text-left
      | Zelda Hessler (@Velfi) who provides 
      router-link(to="https://github.com/Velfi/i-ching") the I Ching as a Rust library
      | , which entertained my daily practice in the early days. It was then that I first wished for cards and tiles and what you see here.
    p.text-left
      | Steve VanDevender who has 
      router-link(to="http://hexadecimal.uoregon.edu/ching/src.html") sourced the Wilhelm-Baynes translation/interpretation of the I Ching
      |  and provided it to the WWW.
  section
    h3 Thanks to the vector artists who made these rad icons…
    dl
      dt
        router-link(to="https://thenounproject.com/andydoane/") Andy Doane
        |  for 
        router-link(to="https://thenounproject.com/andydoane/collection/miracle/") Miracle
      dd.flex.string.mid.pads.y
        IconBase(viewBox="0 0 100 125" height="84" width="84")
          IconMiracle
      dt
        router-link(to="https://thenounproject.com/LSEdesigns/") LSE Designs
        |  for 
        router-link(to="https://thenounproject.com/LSEdesigns/collection/a-wizards-world/") A Wizard's World
      dd.flex.string.mid.pads.y.wrap
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconCauldron
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconCandles
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconCrystalBall
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconOpenBook
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconSpellBook
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconScroll
        IconBase(viewBox="0 0 1000 1250" height="84" width="84")
          IconWizardsHat
          //- IconCrystals
          //- IconCrescentMoon
          //- IconMagicStaff
          //- IconMagicWand
          //- IconWizardsHat
    p.text-left
      | And thanks to 
      router-link(to="https://thenounproject.com/") the Noun Project
      |  for helping us share scalable, dynamic drawings of objects.
  section.flex
    h3.pad.x And last but most of all, thanks to Elysa and 🍕🐻
    p.pad.x.text-left Your compassion, patience, and support make my dreams come true every day.
  section
    h3
      | Thanks to 
      a(href="https://atmanautica.com") Kerrbear
      |  for making this
    button.btn I don't even notice when $5 goes missing
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import IconBase from '../icons/IconBase.vue'
import IconCauldron from '../icons/IconCauldron.vue'
import IconMiracle from '../icons/IconMiracle.vue'
import IconCandles from '../icons/IconCandles.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'
import IconOpenBook from '../icons/IconOpenBook.vue'
import IconSpellBook from '../icons/IconSpellBook.vue'
import IconWizardsHat from '../icons/IconWizardsHat.vue'
import IconScroll from '../icons/IconScroll.vue'

export default defineComponent({
  name: 'Gratitude',
  components: {
    Page,
    IconBase,
    IconCauldron,
    IconMiracle,
    IconCandles,
    IconCrystalBall,
    IconOpenBook,
    IconSpellBook,
    IconScroll,
    IconWizardsHat,
  },
  data() {
    return {
      title: 'Thanks and Credits',
    }
  },
})
</script>

<style lang="postcss" scoped>
.page.about {
  background-color: var(--silk);
}

dd {
  margin-left: 0;
}

.photos dt {
  text-align: center;
  margin: 2.5rem 0 0.5rem;
  font-weight: 500;
  font-size: 1.25em;
}

.thumb {
  max-width: 100%;
  width: 600px;
  margin-bottom: 2rem;
}
</style>
