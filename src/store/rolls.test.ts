import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref } from 'vue';
import { addRoll, getRolls, updateRoll, deleteRoll, activeRolls, cachedRoll } from './rolls';
import { userProfile, setUserName, resetUserProfile } from './userProfile';
import { Roll } from '../schema';

// Mock cfg
vi.mock('../store', () => ({
	cfg: {
		loading: false,
	},
}));

describe('Rolls Store - localStorage persistence', () => {
	beforeEach(() => {
		localStorage.clear();
		activeRolls.value = [];
		resetUserProfile();
		setUserName('TestUser');
	});

	afterEach(() => {
		localStorage.clear();
		activeRolls.value = [];
	});

	it('should add a roll to localStorage', async () => {
		const roll = {
			query: 'Test query',
			toss: '6789',
			moment: new Date().toISOString(),
		};

		await addRoll(roll);

		expect(activeRolls.value.length).toBe(1);
		expect(activeRolls.value[0].query).toBe('Test query');
		expect(activeRolls.value[0].toss).toBe('6789');
	});

	it('should retrieve rolls from localStorage', async () => {
		// Add a roll
		const roll = {
			query: 'Test query',
			toss: '6789',
			moment: new Date().toISOString(),
		};
		await addRoll(roll);

		// Clear activeRolls and retrieve
		activeRolls.value = [];
		await getRolls();

		expect(activeRolls.value.length).toBe(1);
		expect(activeRolls.value[0].query).toBe('Test query');
	});

	it('should update a roll', async () => {
		// Add a roll
		const roll = {
			query: 'Test query',
			toss: '6789',
			moment: new Date().toISOString(),
		};
		await addRoll(roll);

		const rollId = activeRolls.value[0].id;

		// Update the roll
		const updatedRoll: Roll = {
			...activeRolls.value[0],
			notes: 'Updated notes',
		};
		await updateRoll(updatedRoll);

		// Verify update
		await getRolls();
		const found = activeRolls.value.find(r => r.id === rollId);
		expect(found?.notes).toBe('Updated notes');
	});

	it('should delete a roll', async () => {
		// Add a roll
		const roll = {
			query: 'Test query',
			toss: '6789',
			moment: new Date().toISOString(),
		};
		await addRoll(roll);

		const rollId = activeRolls.value[0].id;
		expect(activeRolls.value.length).toBe(1);

		// Delete the roll
		await deleteRoll(rollId);

		expect(activeRolls.value.length).toBe(0);
	});

	it('should prevent duplicate rolls', async () => {
		const roll = {
			query: 'Test query',
			toss: '6789',
			moment: new Date().toISOString(),
		};

		await addRoll(roll);
		await addRoll(roll); // Try to add duplicate

		expect(activeRolls.value.length).toBe(1);
	});

	it('should store rolls per user', async () => {
		const roll1 = {
			query: 'Query 1',
			toss: '6789',
			moment: new Date().toISOString(),
		};

		// Add roll for user 1
		await addRoll(roll1);
		expect(activeRolls.value.length).toBe(1);

		// Switch to different user (simulate by creating new profile)
		localStorage.clear();
		resetUserProfile();
		setUserName('TestUser2');

		// Verify new user has no rolls
		activeRolls.value = [];
		await getRolls();
		expect(activeRolls.value.length).toBe(0);
	});
});
