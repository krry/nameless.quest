import { supabase } from '../firebase';
import router from '../router';
import { uncache } from '../store/cache';
import { activeRolls } from '../store/rolls';

export const logout = async (): Promise<void> => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("couldn't log out", error);
		} else {
			console.log('logging out');
		}
		uncache('uid');
		uncache('email');
		uncache('name');
		activeRolls.value = [];
		await router.push('/');
	} catch (error) {
		console.error('logout error:', error);
		await router.push('/login');
	}
};
