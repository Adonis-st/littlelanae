import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { db } from '../../utils/firebase';
import {
	query,
	collection,
	orderBy,
	onSnapshot,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore';

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const scroll = useRef();

	// Show messages
	useEffect(() => {
		const q = query(collection(db, 'messages'), orderBy('timestamp'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let messages = [];
			querySnapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setMessages(messages);
		});
		return () => unsubscribe();
	}, []);

	// Update message
	const updateMessage = async (id, updatedMessage) => {
		await updateDoc(doc(db, 'messages', id), {
			text: updatedMessage,
		});
	};

	// Delete message
	const deleteMessage = async (id) => {
		await deleteDoc(doc(db, 'messages', id));
	};

	return (
		<div>
			<div className='flex flex-col p-[10px]'>
				{messages &&
					messages.map((message) => (
						<Message
							key={message.id}
							message={message}
							updateMessage={updateMessage}
							deleteMessage={deleteMessage}
						/>
					))}
			</div>
			<SendMessage scroll={scroll} />
			<span ref={scroll}></span>
		</div>
	);
};

export default Chat;
