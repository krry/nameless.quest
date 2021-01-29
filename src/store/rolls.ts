import {ref, Ref} from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'
import {Roll} from '../schema'
import {user} from '../store/user'

export function getRolls(): Ref<Roll[]> {
  const rolls = ref()
  const journalRef = firebase.database().ref('rolls/' + user.uid)

  // attach a subscription to the rolls to an exported ref
  journalRef.on('value', (snapshot) => {
    const data = snapshot.val()
    rolls.value = data
  })
  return rolls
}

export const saveRoll = (roll: Roll): Promise<Roll> => {
  localStorage.setItem('roll', JSON.stringify(roll))
  if (user.uid) {
    const newRollKey = firebase.database().ref().child('rolls').push().key
    const updates: {[key: string]: Roll} = {}
    updates['/rolls/' + newRollKey] = roll
    return firebase.database().ref().update(updates)
  }
}
