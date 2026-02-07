import { createClient, type User, type AuthError } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a function to get the current user
export async function getAuthUser(): Promise<User | null> {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

// Export a function to sign out
export async function signOut(): Promise<AuthError | null> {
	const { error } = await supabase.auth.signOut();
	return error;
}
