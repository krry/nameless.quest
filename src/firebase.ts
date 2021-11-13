import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAYmeuIr6aDKO7QQi9kTrfbEy6XGZfuCPY',
	authDomain: 'nameless-magic.firebaseapp.com',
	databaseURL: 'https://nameless-magic-default-rtdb.firebaseio.com',
	projectId: 'nameless-magic',
	storageBucket: 'nameless-magic.appspot.com',
	messagingSenderId: '386380781673',
	appId: '1:386380781673:web:265412564c620104f4aaf8',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
auth.useDeviceLanguage();

export { db, auth, firebaseApp };
