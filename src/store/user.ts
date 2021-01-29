import {reactive} from 'vue'

/** a simple reactive store
 * drawing on a concept I forked
 * https://codesandbox.io/s/vue-3-global-stores-forked-5iscw
 */

export const user: {[key: string]: string} = reactive({
  uid: lsd('uid'),
  name: lsd('name'),
  email: lsd('email'),
  phone: lsd('phone'),
  query: lsd('query'),
  theme: lsd('theme'),
  toss: lsd('toss'),
  text: lsd('text'),
})

export const setu = (nym: string, val: string): void => {
  console.log('setting user data', nym, 'from', user[nym], 'to', val)
  localStorage.setItem(nym, val)
  user[nym] = val
}

export const clearu = (nym: string): void => {
  console.log('clearing user data for', nym)
  localStorage.removeItem(nym)
  user[nym] = ''
}

function lsd(nym: string): string {
  return localStorage.getItem(nym) || ''
}
