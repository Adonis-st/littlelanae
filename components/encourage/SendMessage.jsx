import React, { useState, useEffect, useRef } from 'react';
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
			photo: photoURL,

			uid,
			timestamp: serverTimestamp(),
		});
		setInput('');
		scroll.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='aboslute group bottom-0 mt-3 flex h-12 w-full items-center  bg-gray-100 sm:h-20'>
			<form
				onSubmit={sendMessage}
				className='mx-auto  flex h-[80%] w-[95%] max-w-[900px] items-center rounded-full border-[1.5px] border-gray-500 bg-white  text-xl'>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className=' h-full w-full rounded-full border-none p-3 text-xl text-gray-900 caret-blue-400  placeholder:text-center  placeholder:font-["Source_Sans_Pro"] placeholder:text-2xl placeholder:font-semibold placeholder:text-gray-800/[.8] group-hover:w-[80%] group-hover:placeholder:text-xl sm:placeholder:text-3xl group-hover:sm:placeholder:text-2xl'
					type='text'
					placeholder='Leave Some Encouragement'
				/>
				<button
					className='mx-1 hidden h-[90%] w-[20%] items-center justify-center rounded-full bg-blue-600 py-2 text-white/[.9] group-hover:flex sm:py-3'
					type='submit'>
					<MdOutlineUpload className=' text-3xl' />
				</button>
			</form>
		</div>
	);
};

export default SendMessage;
