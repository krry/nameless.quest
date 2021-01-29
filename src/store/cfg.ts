import {reactive} from 'vue'

export const cfg: {[key: string]: boolean} = reactive({
  wenny: lsd('wenny'), // prefer king wen order
  texty: lsd('texty'), // prefer text over glyphs
  pinny: lsd('pinny'), // prefer pinyin visible
  hermy: lsd('hermy'), // prefer ungendered text
  turny: lsd('turny'), // prefer vertical lines
  navvy: lsd('navvy'), // prefer no more hints
  beeny: lsd('beeny'), // seen the intro pane
  modal: lsd('modal'), // modal mode activated
  drawer: lsd('drawer'), // site nav visible
  oracle: lsd('oracle'), // the oracle is in
  emailVerified: lsd('emailVerified'),
  phoneVerified: lsd('phoneVerified'),
})

export function set(nym: string, val: boolean): void {
  console.log('setting cfg', nym, 'to', val)
  localStorage.setItem(nym, JSON.stringify(val))
  cfg[nym] = val
}

export function tog(nym: string): void {
  cfg[nym] = !cfg[nym]
  localStorage.setItem(nym, JSON.stringify(cfg[nym]))
}

function lsd(nym: string): boolean {
  const storedNym = localStorage.getItem(nym) || 'false'
  try {
    return JSON.parse(storedNym)
  } catch (e) {
    console.error("couldn't parse", nym, storedNym)
    return false
  }
}
