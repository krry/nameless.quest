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
		name: 'Who',
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
		name: 'Who',
		createdAt: new Date().toISOString(),
	};
	saveUserProfile(newProfile);
}

/**
 * Login with a secret phrase (deterministic UID)
 * Allows restoring profile across devices without a backend
 */
export async function loginWithSecret(name: string, secret: string): Promise<void> {
	// Simple hash of the secret to generate UID
	const encoder = new TextEncoder();
	const data = encoder.encode(secret.trim());
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	
	const deterministicProfile: UserProfile = {
		uid: 'user_' + hashHex.substring(0, 16), // Use first 16 chars of hash
		name: name.trim() || 'Who',
		createdAt: userProfile.createdAt || new Date().toISOString(),
	};
	
	saveUserProfile(deterministicProfile);
}
