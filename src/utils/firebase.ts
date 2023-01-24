// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, reload, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage();

// Custom Hook
export function useAuth() {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user: any) => setCurrentUser(user));
		return unsub;
	}, []);

	return currentUser;
}

//Storage
export async function upload(file, currentUser, setLoading, instantReload) {
	const fileRef = ref(storage, currentUser.uid + '.png');
	setLoading(true);
	const snapshot = await uploadBytes(fileRef, file);
	const photoURL = await getDownloadURL(fileRef);
	updateProfile(currentUser, { photoURL });
	setLoading(false);
	if (!instantReload) {
		toast.success('Avatar icon change was successful', {
			autoClose: 2000,
		});
		setTimeout(() => {
			window.location.reload();
		}, 2500);
	} else {
		window.location.reload();
	}
}
