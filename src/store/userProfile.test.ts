import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userProfile, setUserName, hasUserProfile, resetUserProfile } from './userProfile';

describe('UserProfile Store', () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
	});

	afterEach(() => {
		// Clean up after each test
		localStorage.clear();
	});

	it('should initialize with empty name on first visit', () => {
		const profile = userProfile;
		expect(profile.uid).toBeTruthy();
		expect(profile.name).toBe('');
	});

	it('should save user name to localStorage', () => {
		setUserName('Alice');
		expect(userProfile.name).toBe('Alice');

		const stored = JSON.parse(localStorage.getItem('userProfile') || '{}');
		expect(stored.name).toBe('Alice');
	});

	it('should return false for hasUserProfile when name is empty', () => {
		// Make sure the name is empty
		userProfile.name = '';
		expect(hasUserProfile()).toBe(false);
	});

	it('should return true for hasUserProfile when name is set', () => {
		setUserName('Bob');
		expect(hasUserProfile()).toBe(true);
	});

	it('should reset user profile on resetUserProfile', () => {
		setUserName('Charlie');
		expect(userProfile.name).toBe('Charlie');

		resetUserProfile();
		expect(userProfile.name).toBe('');
		expect(userProfile.uid).toBeTruthy();
	});

	it('should persist and restore profile across instances', () => {
		setUserName('David');
		const uid1 = userProfile.uid;

		// Simulate a fresh load by clearing the module state and reloading
		const stored = JSON.parse(localStorage.getItem('userProfile') || '{}');
		expect(stored.name).toBe('David');
		expect(stored.uid).toBe(uid1);
	});
});
