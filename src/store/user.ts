import {reactive} from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'

/** a simple reactive store
 * drawing on a concept I forked
 * https://codesandbox.io/s/vue-3-global-stores-forked-5iscw
 */

export const user: {[key: string]: string} = reactive({
  uid: lsd('uid'),
  name: lsd('name'),
  email: lsd('email'),
  phone: lsd('phone'),
  theme: lsd('theme'),
  query: lsd('query'),
  toss: lsd('toss'),
  // text: lsd('text'),
})

export const setu = (nym: string, val: string): void => {
  console.log('setting user data', nym, 'from', user[nym], 'to', val)
  localStorage.setItem(nym, val)
  user[nym] = val
  if (user.uid) saveToFb(nym, val)
}

export const clearu = (nym: string): void => {
  console.log('clearing user data for', nym)
  localStorage.removeItem(nym)
  user[nym] = ''
}

function lsd(nym: string): string {
  return localStorage.getItem(nym) || ''
}

function saveToFb(nym: string, val: string): void {
  firebase
    .database()
    .ref('users/' + user.uid)
    .set({
      nym: val,
    })
}
