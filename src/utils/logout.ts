import router from '../router';
import { resetUserProfile } from '../store/userProfile';
import { activeRolls } from '../store/rolls';

export const logout = async (): Promise<void> => {
	try {
		console.log('logging out');
		resetUserProfile();
		activeRolls.value = [];
		await router.push('/journal');
	} catch (error) {
		console.error('logout error:', error);
		await router.push('/journal');
	}
};
