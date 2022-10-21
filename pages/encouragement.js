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
			<div className='relative mx-auto min-h-[90.5vh]  max-w-[1200px]'>
				{displayAlert && (
					<div className='mt-1'>
						<Alert
							color='success'
							onDismiss={() => setDisplayAlert((prevState) => !prevState)}>
							<span className='text-xs sm:ml-5 sm:text-base'>
								{user.displayName} please leave some word of encourage for Ahsha
							</span>
						</Alert>
					</div>
				)}
				<Chat />
			</div>
		);
	}
}
