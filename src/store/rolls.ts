import {ref} from 'vue'
import {Roll} from '../schema'
import {cached} from './cache'
import {db} from '../firebase'

export const cachedRoll = ref<Roll | null>()
export const activeRolls = ref<Roll[]>([])

/* if using Firebase Realtime Database
const pathToUserRolls = '/rolls/' + cached.uid + '/'
const userRollRef = db.ref(pathToUserRolls)

export function getRolls(): void {
	userRollRef.once('value').then((snapshot) => {
		console.log('snapping a shot', snapshot.val())
		activeRolls.value = snapshot.val()
		console.log('activeRolls gotten', activeRolls.value)
	})
}

export const saveRoll = (roll: Roll): void => {
	const newRollKey = db.ref().child(pathToUserRolls).push().key
	const rolls: {[key: string]: Roll} = {}
	if (newRollKey) rolls[pathToUserRolls + newRollKey] = roll
	console.log('bout to save this roll', roll, 'as', newRollKey)
	db.ref().update(rolls, (error) => {
		if (error) {
			console.error('updating rolls failed', error)
		} else {
			console.log('rolls updated in db')
		}
	})
}
*/

/* if using Firestore */
export function getRolls(): void {
	db.collection('users/' + cached.uid + '/rolls')
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log('roll doc', doc.id, '=>', doc.data())
				activeRolls.value.push(doc.data() as Roll)
			})
		})
		.catch((error) => console.error("couldn't retrieve rolls", error))
}

export function addRoll(roll: Roll): void {
	console.log('roll to save', roll)
	db.collection('users/' + cached.uid + '/rolls')
		.add(roll)
		.then((docRef) => {
			console.log('roll added to firestore', docRef)
		})
		.catch((error) => console.error("couldn't add roll", error))
}

// export function saveRoll(id: string, roll: Roll): void {
// 	console.log('roll to save', roll)
// 	db.collection('users/' + cached.uid + '/rolls')
// 		.doc(id)
// 		.set(roll)
// 		.then(() => {
// 			console.log('roll saved to firestore', id)
// 		})
// 		.catch((error) => console.error("couldn't save roll", error))
// }
