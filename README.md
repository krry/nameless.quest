# nameless

## Dev API

`yarn`: Install deps
`yarn dev`: Compiles and hot-reloads for development
`yarn build`: Compiles and minifies for production
`yarn test`: Run your tests
`yarn lint`: Lints and fixes files
See [Configuration Reference](https://cli.vuejs.org/config/): Customize configuration

## TODO

### or rather To Dev

- [x] set up precommit TODO rake with husky
- [x] offer divination or coin toss in modal dialog
- [x] keep cards in the window
- [x] add global controls to the app
  - [x] show/hide tile details
  - [x] theme switch: light, dark, organic, digital
- [x] show card in fullscreen for mobile
- [x] show card in center or other half centered
- [x] close card with x in card
- [x] lint and format eeryting
- [x] show modal at first load
- [x] extract theme array to a new constants store - src/components/ThemeSwitch.vue:25:
- [x] go through [Vue Composition API](https://composition-api.vuejs.org/api.html) docs more closely
- [x] load gua svgs as components
- [x] show gua svgs as user enters coin toss
- [x] ask user for question to resolve
- [x] annotate vue files with inline notes and comments
- [x] highlight chosen hexagram tile
- [x] fix card position on md and lg
- [x] freeze card on top while tiles shuffle ==> src/components/HexaNames.vue:64
- [x] fix backface visibility on iOS Safari
- [x] store lots in localStorage for a day
- [x] offer the ability to move the AppCtrls to the other side
- [x] add fontsource typefaces to themes
  - [x] consolidate typefaces to lower load
- [x] refurbish the card text/glyph animations - do without this positioning or the dreaded snap; src/components/HexaCross.vue:169:
- [x] reload lots if present in LocalStorage
- [x] BUG: why doesn't the roll show the corresponding tile/card?
- [x] BUG: reloading saved results tries to determine quadrant before tiles are mounted
- [x] BUG: when two cards are shown in results, one is on top and obscures the other
  - [x] bring the card in focus on top
- [x] linesShown on initial lot and not on final lot
- [x] indicate which card is changing into the other
- [x] move logo to header or sidebar with drawer
  - [x] or add rolldown menu of options within the appCtrls
- [x] keyboard navigation within grid (currently tab works)
- [x] close one card at a time
- [x] place unsplash backgrounds behind each theme
  - [Unsplash JS Lib](https://github.com/unsplash/unsplash-js)
  - [API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines)
  - [My Nameless Collection](https://unsplash.com/collections/76974635/nameless)
- [x] rearchitect for multiple pages
  - [x] consider [page.js](http://visionmedia.github.io/page.js/)
  - [x] consider [vue-router with vue 3](https://next.router.vuejs.org/)
  - with nav to pages
    - [x] about nameless
    - [x] about the I Ching, yarrow stalks, coins, translations, etc.
    - [x] how to divine: what to ask, how to roll
- [x] consider Vite as a build
- [x] try to hide the browser address bar
- [x] activate and polish floating [feedback fish](https://feedback.fish/app/b186633d70b54b/settings) button and flow
- [x] Config/Settings page (behind login)
- [x] handle attribution for images and vectors on a credits page
- [x] [maybe leverage this](https://github.com/gedrick/vue-node-passport)
- [x] [consider this](https://github.com/florianheinemann/passwordless)
- [x] [compare this](https://github.com/mxstbr/passport-magic-login)
- [x] build a simple API server to auth users? no
- [x] why aren't env vars accessible from the client? oh, vite, not vue cli, right!
- [x] BUG: why doesnt the spinnable respond to the mouse?
- [x] arrow keys to move between changes
- [x] use Magic.link
- [x] on tap, let those hexagrams spin! naw, not as cool as I thought.
- [x] BUG: escape doesn't hide cards after a resort b/c focus was lost; refocus card after resort?
- [x] firebase backend
  - [ ] enable passwordless login through passport.js?
  - [ ] [read this](https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb)
  - [ ] [log the Magic.link process](./docs/passwordless.md) for a lib and a post on Atmanautica.com
- [ ] add a user model to the App
  - [ ] allow login to save rolls and results
  - [ ] integrate Twilio for phone codes
- [ ] add alternative/additional texts (via API?)
  - [ ] Visionary from Paul O'Brien
  - [ ] Online Clarity from Hilary Barrett
- [ ] hotkeys
  - [ ] arrow keys to move between tiles
    - [ ] while card is showing
    - [ ] add tappable arrows on sides of card
- [ ] consider Nuxt as a router
- [ ] consider Vuex as a store
- [ ] zzfx on reveal answer and show oracle
- [ ] Shift or meta click on tiles to keep the others open
- [ ] consider a [Geomancy](https://www.wikiwand.com/en/Geomantic_figures) clone
- [ ] give the oracle its own root level route
- [ ] store users in Sanity?
- [ ] TODO: make the Face components DRYer
- [ ] TODO: capture how user got to login and send them back there: src/views/Login.vue:122
- [ ] TODO: recover from SMS fail by resetting recaptcha: src/views/Login.vue:158
- [ ] TODO: only show marks when two cards: src/components/ChangeNode.vue:100
- [ ] TODO: only show changing lines on first card: src/components/ChangeNode.vue:101
- [ ] TODO: trigger onboarding flow: src/router.ts:111
- [ ] make this a progressive web app
- [ ] fill in config page with global settings
  - [ ] pinny - pinyin or not
  - [ ] wenny - king wen or not
  - [ ] texty - text or glyphs first
  - [ ] primary text?
  - [ ] hermagrams or hexagrams
