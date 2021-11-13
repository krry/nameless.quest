import { ref } from 'vue';
import { cfg } from '../store';
import { doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { Roll } from '../schema';
import { cached } from './cache';
import { db } from '../firebase';

export const cachedRoll = ref<Roll | null>();
export const activeRolls = ref<Roll[]>([]);

/* if using Firestore, here's the path through the data model jungle */
const userRollsPath = ref(cached.uid ? 'users/' + cached.uid + '/rolls' : '');

// CREATE
export async function addRoll(roll: Roll): Promise<void> {
	console.log('roll to save', roll);
	// TODO: first check the collection for a roll with the same query and toss
	const queryIndex = activeRolls.value.map(roll => roll.query).indexOf(roll.query);
	const tossIndex = activeRolls.value.map(roll => roll.toss).indexOf(roll.toss);
	if ((queryIndex !== -1 || tossIndex !== -1) && queryIndex === tossIndex) {
		return;
	}
	if (!userRollsPath.value) {
		console.error('no userRollsPath for adding');
		return;
	}
	const docRef = await addDoc(collection(db, userRollsPath.value), roll);
	console.log('added roll', docRef.id);
}

// READ
export async function getRolls(): Promise<void> {
	console.log('getting rolls');

	if (!userRollsPath.value) {
		console.error('no userRollsPath to get rolls');
		return;
	}

	cfg.loading = true;
	const querySnapshot = await getDocs(collection(db, userRollsPath.value));
	console.log(
		'got rolls',
		querySnapshot.docs.map(doc => doc.data())
	);

	if (!querySnapshot) return;
	activeRolls.value = [];
	cfg.loading = false;
	querySnapshot.forEach(doc => {
		// doc.data() is never undefined for query doc snapshots
		console.log('roll doc', doc.id, '=>', doc.data());
		activeRolls.value.push({ id: doc.id, ...doc.data() } as Roll);
	});
}

// UPDATE
export async function updateRoll(roll: Roll): Promise<void> {
	// console.log('updating roll', roll)
	if (!roll.id || !userRollsPath.value) {
		console.error('no userRollsPath or roll id', roll.id);
		return;
	}
	cfg.loading = true;
	const rollRef = doc(db, userRollsPath.value, roll.id);
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
	cfg.loading = false;
}

export async function deleteRoll(docId: string): Promise<void> {
	// tell firebase to wipe this roll from the books
	if (!userRollsPath.value) {
		console.error('no userRollsPath');
		return;
	}
	const docRef = doc(db, userRollsPath.value, docId);
	if (!docRef) {
		console.error('no doc ref to delete', docId);
		return;
	}

	cfg.loading = true;
	await deleteDoc(doc(db, userRollsPath.value, docId));
	console.log('deleted roll', docId);
	cfg.loading = false;
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
