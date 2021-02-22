import firebase from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAYmeuIr6aDKO7QQi9kTrfbEy6XGZfuCPY',
	authDomain: 'nameless-magic.firebaseapp.com',
	databaseURL: 'https://nameless-magic-default-rtdb.firebaseio.com',
	projectId: 'nameless-magic',
	storageBucket: 'nameless-magic.appspot.com',
	messagingSenderId: '386380781673',
	appId: '1:386380781673:web:265412564c620104f4aaf8',
}
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
auth.useDeviceLanguage()
export type UserCredential = firebase.auth.UserCredential
// export type fbDbRef = firebase.database.Reference
// const userz = db.collection('users')
// const rollz = db.collection('rolls')

export {db, auth}
