import { useState, useEffect } from 'react';
import { auth, db, useAuth } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { MdOutlineUpload } from 'react-icons/md';

const SendMessage = ({ scroll }) => {
	const [input, setInput] = useState('');
	const currentUser = useAuth();
	const [photoURL, setPhotoURL] = useState('/images/profile.jpeg');

	useEffect(() => {
		if (currentUser && currentUser.photoURL) {
			setPhotoURL(currentUser.photoURL);
		}
	}, [currentUser]);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (input === '') {
			alert('Please enter a valid message');
			return;
		}
		const { uid, displayName } = auth.currentUser;
		await addDoc(collection(db, 'messages'), {
			text: input,
			name: displayName,
			avatar: photoURL,
			likes: [],
			uid,
			timestamp: serverTimestamp(),
		});
		setInput('');
		scroll.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className=' flex flex-col items-center '>
			<div className='min-h-[10vh] sm:min-h-[15vh] lg:min-h-[20vh]'></div>
			<div className='send-message-form-container group'>
				<form onSubmit={sendMessage} className='send-message-form'>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className='send-message-input'
						type='text'
						placeholder='Leave Some Encouragement'
					/>
					<button className='send-message-btn' type='submit'>
						<span className='hidden text-sm lg:block xl:text-base'>Send</span>
						<MdOutlineUpload className='sm:text-2xl lg:text-xl xl:text-2xl' />
					</button>
				</form>
			</div>
		</div>
	);
};

export default SendMessage;
