import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import router from '../router';
import { uncache } from '../store/cache';

export const logout = (): void => {
	const user = auth.currentUser;
	signOut(auth)
		.then(() => {
			console.log('logging out', user);
			return router.push('/');
		})
		.catch(error => {
			console.error("couldn't log out", error);
			return router.push('/login');
		});
	uncache('uid');
};
