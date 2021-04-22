import { ref } from 'vue'
import { Roll } from '../schema'
import { cached } from './cache'
import { db, DocRef, Transaction } from '../firebase'

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
const userRollsPath = cached.uid ? 'users/' + cached.uid + '/rolls' : 'rolls'

export function getRolls(): void {
	activeRolls.value = []
	console.log('getting rolls')
	db.collection(userRollsPath)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				// console.log('roll doc', doc.id, '=>', doc.data())
				activeRolls.value.push({ id: doc.id, ...doc.data() } as Roll)
			})
		})
		.catch((error) => console.error("couldn't retrieve rolls", error))
}

export function addRoll(roll: Roll): DocRef | void {
	console.log('roll to save', roll)
	// TODO: first check the collection for a roll with the same query and toss
	const queryIndex = activeRolls.value.map((roll) => roll.query).indexOf(roll.query)
	const tossIndex = activeRolls.value.map((roll) => roll.toss).indexOf(roll.toss)
	if ((queryIndex !== -1 || tossIndex !== -1) && queryIndex === tossIndex) {
		return
	}
	db.collection(userRollsPath)
		.add(roll)
		.then((docRef) => {
			console.log('roll added to firestore', docRef)
			return docRef
		})
		.catch((error) => console.error("couldn't add roll", error))
}

export function updateRoll(roll: Roll): Promise<void> {
	// console.log('updating roll', roll)
	const rollRef = db.collection(userRollsPath).doc(roll.id)
	return db
		.runTransaction((transaction: Transaction) => {
			return transaction.get(rollRef).then((r) => {
				if (!r.exists) throw new Error("ain't no rolls like dat-a")
				transaction.update(rollRef, roll)
			})
		})
		.then(() => console.log('able to update roll', roll.id))
		.catch((error) => console.error('struggled to update roll', roll, error))
}

export function deleteRoll(id: string): void {
	// tell firebase to wipe this roll from the books
	db.collection(userRollsPath)
		.doc(id)
		.delete()
		.then(() => {
			// console.log('deleted roll', id)
			// TODO: How can we refresh the journal entries after delete?
			getRolls()
		})
		.catch((error) => console.error('struggled to delete roll', id, error))
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
