import { ref } from 'vue';
import { cfg } from '../store';
import { userProfile } from './userProfile';
import { Roll } from '../schema';

export const cachedRoll = ref<Roll | null>();
export const activeRolls = ref<Roll[]>([]);

// Storage key for rolls
const getRollsStorageKey = (): string => {
	return `nameless_rolls_${userProfile.uid}`;
};

// Helper to load rolls from localStorage
function loadRollsFromStorage(): Roll[] {
	const key = getRollsStorageKey();
	const stored = localStorage.getItem(key);
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch (e) {
			console.error('Failed to parse rolls from storage', e);
			return [];
		}
	}
	return [];
}

// Helper to save rolls to localStorage
function saveRollsToStorage(rolls: Roll[]): void {
	const key = getRollsStorageKey();
	localStorage.setItem(key, JSON.stringify(rolls));
}

// CREATE
export async function addRoll(roll: Omit<Roll, 'id' | 'user_id' | 'created_at'>): Promise<void> {
	console.log('roll to save', roll);

	if (!userProfile.uid) {
		console.error('No user profile initialized');
		return;
	}

	// Avoid duplicates
	const rolls = loadRollsFromStorage();
	const queryIndex = rolls.map(r => r.query).indexOf(roll.query);
	const tossIndex = rolls.map(r => r.toss).indexOf(roll.toss);
	if (queryIndex !== -1 && queryIndex === tossIndex) {
		console.log('Duplicate roll detected, skipping');
		return;
	}

	cfg.loading = true;
	const newRoll: Roll = {
		...roll,
		id: generateRollID(),
		user_id: userProfile.uid,
		created_at: new Date().toISOString(),
	};

	rolls.push(newRoll);
	saveRollsToStorage(rolls);
	activeRolls.value = rolls;
	console.log('added roll', newRoll);
	cfg.loading = false;
}

// READ
export async function getRolls(): Promise<void> {
	console.log('getting rolls');

	if (!userProfile.uid) {
		console.error('No user profile initialized');
		return;
	}

	cfg.loading = true;
	const rolls = loadRollsFromStorage();
	activeRolls.value = rolls.sort((a, b) => {
		const dateA = new Date(a.created_at || 0).getTime();
		const dateB = new Date(b.created_at || 0).getTime();
		return dateB - dateA;
	});
	console.log('got rolls', activeRolls.value);
	cfg.loading = false;
}

// UPDATE
export async function updateRoll(roll: Roll): Promise<void> {
	if (!roll.id) {
		console.error('no roll id');
		return;
	}

	if (!userProfile.uid) {
		console.error('No user profile initialized');
		return;
	}

	cfg.loading = true;
	const rolls = loadRollsFromStorage();
	const index = rolls.findIndex(r => r.id === roll.id);

	if (index !== -1) {
		rolls[index] = {
			...rolls[index],
			notes: roll.notes,
			updated_at: new Date().toISOString(),
		};
		saveRollsToStorage(rolls);
		activeRolls.value = rolls;
		console.log('updated roll', roll.id);
	} else {
		console.error('Roll not found', roll.id);
	}
	cfg.loading = false;
}

// DELETE
export async function deleteRoll(docId: string): Promise<void> {
	if (!userProfile.uid) {
		console.error('No user profile initialized');
		return;
	}

	cfg.loading = true;
	const rolls = loadRollsFromStorage();
	const filtered = rolls.filter(r => r.id !== docId);
	saveRollsToStorage(filtered);
	activeRolls.value = filtered;
	console.log('deleted roll', docId);
	cfg.loading = false;
}

// Helper to generate a unique roll ID
function generateRollID(): string {
	return 'roll_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
