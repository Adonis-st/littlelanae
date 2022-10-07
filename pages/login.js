import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import {
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
	const [user, loading] = useAuthState(auth);
	const route = useRouter();
	//Sign in with Google
	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log(result.user);
			route.push('/encouragement');
		} catch (error) {
			console.log(error);
		}
	};
	//Sign in with Facebook
	const fbProvider = new FacebookAuthProvider();
	const FacebookLogin = async () => {
		try {
			const result = await signInWithPopup(auth, fbProvider);
			const credantial = await FacebookAuthProvider.credentialFromResult(result);
			const token = credantial.accessToken;
			let photoUrl = result.user.photoURL + '?height=350&access_token=' + token;
			await updateProfile(auth.currentUser, { photoURL: photoUrl });
			console.log(result);
			route.push('/encouragement');
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (user) {
			route.push('/encouragement');
		} else {
			console.log('login');
		}
	}, [user]);

	return (
		<div className='mt-32 p-10 text-gray-700 shadow-xl '>
			<h1 className='text-3xl'>Login in</h1>
			<button onClick={GoogleLogin} className='flex items-center py-2'>
				<FcGoogle className='text-3xl' />
				<p className='ml-4'>Sign in with Google</p>
			</button>
			<button onClick={FacebookLogin} className='flex items-center py-3'>
				<AiFillFacebook className='text-3xl' />
				<p className='ml-4'>Sign in with Facebook</p>
			</button>
		</div>
	);
}
