import { useState } from 'react';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from '../components/encourage/Chat';
import { Alert } from 'flowbite-react';

export default function Encouragement() {
	const [user, loading] = useAuthState(auth);
	const [displayAlert, setDisplayAlert] = useState(true);

	if (user) {
		return (
			<div className='mx-auto max-w-[960px]'>
				{displayAlert && (
					<div className='mt-1'>
						<Alert
							color='success'
							onDismiss={() => setDisplayAlert((prevState) => !prevState)}>
							<span className='text-xs sm:ml-5 sm:text-base'>
								Please leave some word of encourage for Ahsha
							</span>
						</Alert>
					</div>
				)}
				<Chat />
			</div>
		);
	}
}
