import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function encouragement() {
	const [user, loading] = useAuthState(auth);
	const route = useRouter();
	if (loading) return <h1>Loading...</h1>;
	if (!user) route.push('/login');
	if (user)
		return (
			<div>
				<h1 className='text-3xl'>Your in {user.displayName}</h1>
				<img
					src={user.photoURL}
					alt='avatar'
					referrerPolicy='no-referrer'
					className='w-12 rounded-full'
				/>
				<button onClick={() => auth.signOut()}>Sign Out</button>
			</div>
		);
}
