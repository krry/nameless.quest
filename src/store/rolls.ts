import { ref } from 'vue';
import { Roll } from '../schema';
import { cached } from './cache';
import { db } from '../firebase';
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';

export const cachedRoll = ref<Roll | null>();
export const activeRolls = ref<Roll[]>([]);

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

/* if using Firestore, here's the path through the data model jungle */
const userRollsPath = cached.uid ? 'users/' + cached.uid + '/rolls' : 'rolls';

// CREATE
export async function addRoll(roll: Roll): Promise<void> {
	console.log('roll to save', roll);
	// TODO: first check the collection for a roll with the same query and toss
	const queryIndex = activeRolls.value.map(roll => roll.query).indexOf(roll.query);
	const tossIndex = activeRolls.value.map(roll => roll.toss).indexOf(roll.toss);
	if ((queryIndex !== -1 || tossIndex !== -1) && queryIndex === tossIndex) {
		return;
	}
	const docRef = await addDoc(collection(db, userRollsPath), roll);
	console.log('added roll', docRef.id);
}

// READ
export async function getRolls(): Promise<void> {
	// console.log('getting rolls')
	const querySnapshot = await getDocs(collection(db, userRollsPath));
	if (!querySnapshot) return;
	activeRolls.value = [];
	querySnapshot.forEach(doc => {
		// doc.data() is never undefined for query doc snapshots
		// console.log('roll doc', doc.id, '=>', doc.data())
		activeRolls.value.push({ id: doc.id, ...doc.data() } as Roll);
	});
}

// UPDATE
export async function updateRoll(roll: Roll): Promise<void> {
	// console.log('updating roll', roll)
	if (!roll.id) return;
	const rollRef = doc(db, userRollsPath, roll.id);
	const rollSnap = await getDoc(rollRef);

	if (rollSnap.exists()) {
		const rollData = rollSnap.data();
		if (rollData) {
			const rollDataWithNotes = { ...rollData, notes: roll.notes };
			await updateDoc(rollRef, rollDataWithNotes);
			console.log('updated roll', roll.id);
		}
	} else {
		console.error('roll not found', roll.id);
	}
}

export async function deleteRoll(docId: string): Promise<void> {
	// tell firebase to wipe this roll from the books
	const docRef = doc(db, userRollsPath, docId);
	if (!docRef) return;
	await deleteDoc(doc(db, userRollsPath, docId));
	console.log('deleted roll', docId);
	// TODO: How can we refresh the journal entries after delete?
	getRolls();
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
