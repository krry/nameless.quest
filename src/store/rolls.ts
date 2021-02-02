import {ref} from 'vue'
import {Roll} from '../schema'
import {cached} from './cache'
import {db} from '../firebase'

const userRollRef = db.ref('/rolls/' + cached.uid)

export const activeRolls = ref<Roll[]>([])

export function getRolls(): void {
	userRollRef.once('value').then((snapshot) => {
		activeRolls.value = snapshot.val()
		console.log('snapping a shot', snapshot.val())
	})
}

export const saveRoll = (roll: Roll): void => {
	const newRollKey = db.ref().child('rolls').push().key
	const rolls: {[key: string]: Roll} = {}
	if (newRollKey) rolls['/rolls/' + newRollKey] = roll
	db.ref().update(rolls)
}
