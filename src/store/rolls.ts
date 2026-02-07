import { ref } from 'vue';
import { cfg } from '../store';
import { supabase, getAuthUser } from '../firebase';
import { Roll } from '../schema';

export const cachedRoll = ref<Roll | null>();
export const activeRolls = ref<Roll[]>([]);

// CREATE
export async function addRoll(roll: Omit<Roll, 'id' | 'user_id' | 'created_at'>): Promise<void> {
	console.log('roll to save', roll);

	// Avoid duplicates
	const queryIndex = activeRolls.value.map(r => r.query).indexOf(roll.query);
	const tossIndex = activeRolls.value.map(r => r.toss).indexOf(roll.toss);
	if (queryIndex !== -1 && queryIndex === tossIndex) {
		console.log('Duplicate roll detected, skipping');
		return;
	}

	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { data, error } = await supabase
		.from('rolls')
		.insert({
			...roll,
			user_id: user.id,
		})
		.select();

	if (error) {
		console.error('Error adding roll:', error);
	} else {
		console.log('added roll', data);
	}
	cfg.loading = false;
}

// READ
export async function getRolls(): Promise<void> {
	console.log('getting rolls');

	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { data, error } = await supabase
		.from('rolls')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching rolls:', error);
	} else {
		console.log('got rolls', data);
		activeRolls.value = (data || []) as Roll[];
	}
	cfg.loading = false;
}

// UPDATE
export async function updateRoll(roll: Roll): Promise<void> {
	if (!roll.id) {
		console.error('no roll id');
		return;
	}

	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { error } = await supabase
		.from('rolls')
		.update({ notes: roll.notes })
		.eq('id', roll.id)
		.eq('user_id', user.id);

	if (error) {
		console.error('Error updating roll:', error);
	} else {
		console.log('updated roll', roll.id);
	}
	cfg.loading = false;
}

// DELETE
export async function deleteRoll(docId: string): Promise<void> {
	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { error } = await supabase.from('rolls').delete().eq('id', docId).eq('user_id', user.id);

	if (error) {
		console.error('Error deleting roll:', error);
	} else {
		console.log('deleted roll', docId);
		await getRolls(); // Refresh
	}
	cfg.loading = false;
}
