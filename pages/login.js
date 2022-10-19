import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import {
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginForm from '../components/login/LoginForm';
import SignUpForm from '../components/login/SignUpForm';

export default function Login() {
	const [user, loading] = useAuthState(auth);
	const route = useRouter();
	const [newUser, setNewUser] = useState(false);

	// Sign in with Google
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

	// Sign in with Facebook
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

	// Register with email & password
	const register = async (email, password) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			console.log(user);
			route.push('/encouragement');
		} catch (error) {
			console.log(error.message);
		}
	};

	// Login with email & password
	const login = async (email, password) => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			console.log(user);
			route.push('/encouragement');
		} catch (error) {
			if (error.message === 'Firebase: Error (auth/wrong-password).') {
				alert(' Please check your password');
			} else if (error.message === 'Firebase: Error (auth/user-not-found).') {
				alert('Please check your email ');
			}
		}
	};

	const toggleForm = () => setNewUser((prevState) => !prevState);

	return (
		<div className='flex h-[90vh]  max-h-[650px] justify-center xl:items-center'>
			{!newUser ? (
				<div className='form-container'>
					<h1 className='mb-3 text-center text-3xl xl:text-4xl '>Login</h1>
					<button onClick={GoogleLogin} className='sign-in-btn mb-[.85rem]'>
						<FcGoogle className='text-2xl sm:text-3xl xl:text-4xl' />
						<span className='ml-2 sm:text-xl xl:text-2xl'>Continue with Google</span>
					</button>
					<button onClick={FacebookLogin} className='sign-in-btn'>
						<AiFillFacebook className='text-2xl text-blue-800 sm:text-3xl xl:text-4xl' />
						<span className='ml-2 sm:text-xl xl:text-2xl'>Continue with Facebook</span>
					</button>
					<div className=' mt-5 h-[1px] w-[73%] max-w-[290px] border-b border-gray-400'></div>
					<LoginForm toggleForm={toggleForm} login={login} />
				</div>
			) : (
				<SignUpForm toggleForm={toggleForm} register={register} />
			)}
		</div>
	);
}
