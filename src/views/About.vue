<template lang="pug">
Page.about
  h1.page-title
    LogoBrand
  blockquote.poem
    pre.text-left
      | May the Nameless encourage
      | trust in our intuition.
      br
      br
      | We summon the future
      | just as the past
      | so many echoes into now.
      br
      br
      | May we dance what feels good,
      | each step with more love.
  ul(ref="toc").toc.ls.pad.y
    li.flex.col.mid
      a.btn.naked.xl(@click.prevent="cruiseTo(divine)")
        IconBase(viewBox="0 0 1000 1250" size="48" iconColor="var(--link)")
          IconCrystalBall
        br
        | How to Consult the Oracle
    li.flex.col.mid
      a.btn.naked.xl(@click.prevent="cruiseTo(define)")
        IconBase(viewBox="0 0 100 125" size="48" iconColor="var(--link)")
          IconBookStack
        br
        | Resources for Deeper Understanding
    li.flex.col.mid
      a.btn.naked.xl(@click.prevent="cruiseTo(devsign)")
        IconBase(viewBox="0 0 1000 1250" size="48" iconColor="var(--link)")
          IconWizardsHat
        br
        | Making a Nameless for Itself

  hr.dinkus.fleuron

  section(ref="divine")
    h2 Divination
    h3 How to Consult the Oracle

    p Every path leads to and from the Source. There is no right or wrong way to encounter the divine. But certain methods allow insight to arise more readily. Mindsets and settings carefully prepared and arranged can clear the skies, peel our eyes, and prime our hearts to absorb the truth of the matter in this moment.

    aside.callout
      h4 TL:DR; A Divination Ritual
      ol.ls
        li
          | Commit five to fifty minutes to seeing the truth, then 
          strong stop time.
        li
          strong Gather the kit
          | : cards, coins, candles, crystals, totems, etc.
        li
          | Calm the senses. 
          strong Amass silence.
          |  Hush the lights. Scan for tension.
        li
          | Plant feet, rest upright. Slow the breath. 
          strong Follow it inward.
        li
          | Remain paused as 
          strong the burning question ignites you
          | . Hold it close.
        li
          strong Surrender
          |  to the dance: flip coins, split yarrow, deal the spread.
        li
          | Assume manifold perspectives. Ignore ego. 
          strong Accept what emerges.

    p As a relative novice with a sporadic practice involving the Yìjīng and the Tarot de Marseilles, I am not here as a teacher, but as one who experiences profound revelations when I open my heart to the big questions in the presence of these ancient systems of soothsaying. I am making Nameless to share my joy and enthusiasm for this very old book, and hopefully to usher you toward that softly echoing well of being yawning out of the void of all possibilities housed at heart center.

    p
      | With a cursory search we can turn up manifold sages and mystics who hold (or claim) expertise in this timeless realm of interface with the divine. 
      em If it be authority ye seek, authority ye will find, and not within ye shall it be.
      |  If I may offer a bit of unsolicited advice regarding solicitation, we must, when navigating the sublime, beware the hard sell, the up-sell, and really the sell altogether. The answers we seek cannot be bought or sold, or taught or stolen. But when we find a good teacher, we also often find that it doesn't matter what they teach us.

  hr.dinkus.fleur

  section(ref="define")
    h2 Defining the Yìjīng: Resources for Understanding

    p If you would like to dive deeper into the history and (potential) meaning of the Yìjīng, I can offer little outside of recommending you to the resources that have enriched my journey to the oracle. In no particular order, and expanding as I discover and ingest them:

    ul
      li
        h4
          router-link(to="http://cranf.com/wpen/android/deepware/changes/") Deepware Changes
        p
          | The most in-depth and full-featured digital experience of the I Ching I have found comes to us as an Android app called 
          strong Deepware Changes
          | . With this app, one may resolve a hexagram by taps, or simulated coins, or a painstaking digitization of the meditative but somewhat laborious 
          router-link(to="http://cranf.com/wpen/android/deepware/changes/extensive-documentation/yarrow-stalks-method/") yarrow stalks method
          | . Interestingly you won't be guided to offer a question to the oracle, or to hold the question as you tap or flip or swipe. The authors also attempt to frost and layer the hexagrams with semantic characterizations of body, mind, and spirit for each, the significance of which remains opaque to me. Luckily a bewildered but curious student will also find links to several more web-based resources and various translations and interpretations, including…
      li
        h4
          router-link(to="https://onlineclarity.co.uk") Hilary Barrett's I Ching with Clarity
        p
          | Hilary Barrett presents a wealth of knowledge and guidance about and around the Yìjīng, and offers us a delightful translation and interpretation for the new millennium, free of the trappings of androcracy, careful to treat power as responsibility rather than as dominance, and ready to reveal the light as our eyes adjust to the shining brilliance of the oracle.
        p Early in their wonderful introduction course to the Yìjīng, we learn the meaning of the book's title:
        .flex.space.pad2.top
          h3.ib.text-center
            HanziChar(
              char="易"
              pinyin="Yì"
              size="xl"
              reveal
              translation="Change"
              )
          h3.ib.text-center
            HanziChar(
              char="經"
              pinyin="Jīng"
              size="xl"
              reveal
              translation="Classic Book"
              )
        blockquote
          p Jing, ‘classic book’, is the same word as in ‘Daodejing’ (or ‘Tao Te Ching’), the ‘Book of the Way and its Power’. It literally means the warp threads on the loom. The oracle’s given name is simply Yi: Change.
      li
        h4
          router-link(to="https://divination.com/iching/") Paul O'Brien's Visionary I Ching
        p A wisdom tradition that already spans three thousand years is not particularly fertile soil for superlative contribution. Certain among us like Hilary Barrett and Paul O'Brien undertake a complete recodification of the sourcework. These efforts span decades, lifetimes. Paul's ouevre stands apart with Hilary's as a non-patriarchal renewal of this ancient spirit of clarity and insight.

  hr.dinkus.asterism

  section(ref="devsign")
    h2 Devsigning Nameless
    h3 A New Take on a Timeless Classic
    p
      | Originally conceived in a fever dream deep in a frozen pit of winter, 
      strong Nameless 
      |  seeks to make the Yìjīng (the Classic of Changes known in much of the West as the I Ching) more accessible and understandable to those who might otherwise approach this resource only to ricochet off of its castle wall of a learning curve.

    p
      | The initial vision came all at once as I was leafing through the Wilhelm-Baynes translation/interpretation of the Yìjīng: 
      em The I Ching or the Book of Changes. 
      | My favorite 
      a(href="http://tarot-de-marseille-millennium.com/english/tarot_sacred_code.html") Tarot de Marseilles deck
      |  sat on the desk beside me: 78 cards in a timeless cycle of birth, becoming, decay, and death. And here in the Yìjīng, I found sixty-four hexagrams describing the full set of Changes we,
      strong  the nameless
      | , may experience.
    p
      | Sixty-four, as we know, is the square of eight. Which got me wondering how the Yìjīng might look in an octal 
      code base8
      |  number system.
      strong
        em What if eight were 10,
      |  so to speak?
    p 
      | Examining the hexagrams I also noticed that one can easily transpose them into binary numbers, taking an active or yang line 
      IconBase
        Icon7
      |  as one, and a receptive or yin line 
      IconBase
        Icon8
      |  as zero. I began to assemble a small database.
      
    p For each hexagram I figured its corresponding binary number, then shifted it into octal. Then I plotted the hexagrams in an eight-by-eight grid following their octal sequence. This is the orientiation in which you first encounter the tiles here in Nameless.
    aside.callout
      h4 🕯 A Tip
      p
        | As you may have noticed, if you tap the octal number in the upper right corner of the tile, the board reorders by what is known as the King Wen Sequence. They say that 
        router-link(to="https://www.wikiwand.com/en/King_Wen_of_Zhou") Wen was no king
        | , and it was his son Wu who united the Zhou dynasty from which the Yìjīng has passed to us. For this sequence we tend to use decimal numbers from 1 to 64, rather than 00 to 77 as with the octals.

    hr.dinkus.fleuron

    h3(ref="naming") Naming (or not) Nameless
    p
      | Consult the Yìjīng regularly for any length of time and you may start to conceive of the world as composed of its nameless characters experiencing this extraordinarily finite set of Changes or moments in an infinite manifold of nested, fractal, spatiotemporal, and up-to-ten-dimensional networks. Among the facets of this odd but expansive perspective, I found myself called to seize upon and highlight the profound anonymity of the stories in the Yìjīng. These are barely fables. There be dragons, but seldom 
      router-link(to="/change/42") a tortoise
      |  or a hare.

    p Consulting even the more modern scholarly English interpretations, one will encounter a deeply androcratic bias: the "superior man" makes no less than 73 appearances among the translations around the 64 hexagrams in the ubiquitous and often revered Wilhelm-Baynes version. Given the profound focus placed upon balance between mutually defining opposites throughout the Classic of Changes, I doubt that its authors and early architects intended to portray such a stark power imbalance among genders or along any spectrum. Students of the Yìjīng, along with Hermetics, Taoists, Yogis, and a multitude of mystics, are starkly aware that the pendulum swings to any and every extreme then away to its opposite, sweeping through the shades between.
    p So when it came time to crystallize the spirit of this fresh take on a three thousand year old book, I recognized the moment, then let it go. Later in the shower, I realized that my app was still nameless. And suddenly I realized it has always been Nameless, just like those we meet in the Changes, just like us.

  aside.callout
    h4 ✋⏱ It Does Explain All the Dozens, Doesn't It, 🧭🤌
    p
      | Tracing the anthropomorphic origins of the base 12 and base 60 systems of counting back to the cuneiforms of the Fertile Crescent, from which we have inherited 12-inch feet, 60-minute hours, 360 degree circles and many more measures, one might symmetrically wonder 
      strong
        em what if twelve were 10?
      |  For if we nimbly count our phalanges (the three little bones in each of our four fingers) with our thumbs, we quickly find twelve on a hand, and may find our decimal digits rather cro-magnon in comparison. And we can easily get to sixty by assigning each of the five digits on the other hand to a dozen as we count.
  AppLink.btn(to="https://ko-fi.com/kerrbear") We encourage you to feed the Kerrbear 🐻
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import Page from '../components/Page.vue'
import LogoBrand from '../components/LogoBrand.vue'
import HanziChar from '../components/HanziChar.vue'
import IconBase from '../icons/IconBase.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'
import IconBookStack from '../icons/IconBookStack.vue'
import IconWizardsHat from '../icons/IconWizardsHat.vue'

export default defineComponent({
	name: 'About',
	components: {
		Page,
		IconBase,
		Icon7,
		IconCrystalBall,
		IconBookStack,
		IconWizardsHat,
		Icon8,
		HanziChar,
		LogoBrand,
	},
	setup() {
		const divine = ref<HTMLElement>()
		const devsign = ref<HTMLElement>()
		const define = ref<HTMLElement>()
		const title = ref('About the Oracle')

		return {
			title,
			divine,
			devsign,
			define,
		}
	},
	methods: {
		cruiseTo(el: HTMLElement): void {
			el.scrollIntoView({behavior: 'smooth'})
		},
	},
})
</script>

<style lang="postcss" scoped>
.page.about {
	background-color: var(--silk);
}

blockquote.poem {
	margin: 0;
	padding: 0;
}
</style>
