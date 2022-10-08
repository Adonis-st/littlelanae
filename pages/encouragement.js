import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from '../components/Chat';

export default function encouragement() {
	// const [user, loading] = useAuthState(auth);
	// if (user) {
	// 	return (
	// 		<div>
	// 			<h1 className='mx-auto text-3xl'>
	// 				Your in {user.displayName}{' '}
	// 				<span>
	// 					<img
	// 						src={user.photoURL}
	// 						alt='avatar'
	// 						referrerPolicy='no-referrer'
	// 						className='inline-block aspect-square w-10 rounded-full object-cover'
	// 					/>
	// 				</span>
	// 			</h1>
	// 			<button
	// 				className='rounded-full bg-blue-600 py-2 px-3 font-bold text-white/[.9]'
	// 				onClick={() => auth.signOut()}>
	// 				Sign Out
	// 			</button>
	// 			<Chat />
	// 		</div>
	// 	);
	// } else {
	// 	return <div>Please wait</div>;
	// }

	return <Chat />;
}
