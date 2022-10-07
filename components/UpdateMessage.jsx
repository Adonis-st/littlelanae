import React, { useState } from 'react';
import { auth, db } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const UpdateMessage = () => {
	const [input, setInput] = useState('');

	const updateMessage = async (e, id) => {
		e.preventDefault();
		if (input === '') {
			alert('Please enter a valid message');
			return;
		}
		await updateDoc(doc(db, 'messages', id), {
			text: input,
		});
		setInput('');
	};
	return (
		<form onSubmit={updateMessage} className=''>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				type='text'
				placeholder='update'
			/>
			<button type='submit'>update qoute</button>
		</form>
	);
};

export default UpdateMessage;
