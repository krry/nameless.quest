import { reactive } from 'vue';

/**
 * localStorage-based user profile store
 * Replaces Supabase auth for the Nameless journal
 */

export interface UserProfile {
	uid: string; // unique identifier (generated on first visit)
	name: string; // user's display name
	createdAt: string; // ISO timestamp
}

function generateUID(): string {
	return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Initialize user profile from localStorage or create new one
function initializeUserProfile(): UserProfile {
	const stored = localStorage.getItem('userProfile');
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch (e) {
			console.error('Failed to parse userProfile', e);
		}
	}

	// Create new profile for first-time user
	const newProfile: UserProfile = {
		uid: generateUID(),
		name: '',
		createdAt: new Date().toISOString(),
	};
	localStorage.setItem('userProfile', JSON.stringify(newProfile));
	return newProfile;
}

function saveUserProfile(profile: UserProfile): void {
	localStorage.setItem('userProfile', JSON.stringify(profile));
	Object.assign(userProfile, profile);
}

export const userProfile = reactive(initializeUserProfile());

export function setUserName(name: string): void {
	userProfile.name = name;
	saveUserProfile(userProfile);
}

export function hasUserProfile(): boolean {
	return !!userProfile.uid && !!userProfile.name;
}

export function resetUserProfile(): void {
	const newProfile: UserProfile = {
		uid: generateUID(),
		name: '',
		createdAt: new Date().toISOString(),
	};
	saveUserProfile(newProfile);
}
