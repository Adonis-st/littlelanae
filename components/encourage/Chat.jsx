import { useState, useEffect, useRef } from 'react';
import { auth } from '../../utils/firebase';
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
	arrayUnion,
	arrayRemove,
} from 'firebase/firestore';
import TheOriginals from './TheOriginals';
import Spinner from '../Spinner';

const Chat = () => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const [hasAccess, setHasAccess] = useState([]);
	const [originalPost, setOriginalPost] = useState([]);
	const scroll = useRef();

	// Show messages
	useEffect(() => {
		setLoading(true);
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

	useEffect(() => {
		const q = query(collection(db, 'theOriginals'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let messages = [];
			querySnapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setHasAccess(messages[0].hasAccess);
			setOriginalPost(messages[0]);
			setLoading(false);
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

	// Like message
	const like = async (id, user) => {
		const messages = doc(db, 'messages', id);
		await updateDoc(messages, { likes: arrayUnion(user) });
	};

	// unlike a message
	const unLike = async (id, user) => {
		const messages = doc(db, 'messages', id);
		await updateDoc(messages, { likes: arrayRemove(user) });
	};

	const [seeOrginals, setSeeOrginals] = useState(false);
	const aOriginal = hasAccess.find((isAOrginal) => isAOrginal === auth.currentUser.uid)
		? true
		: false;

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div className='mx-auto flex justify-center pb-1 pt-3 sm:py-6 lg:py-7'>
				<div className='group flex rounded-full border border-blue-500  text-xs shadow-lg  dark:border-rose-300 sm:text-sm xl:text-base  '>
					{aOriginal ? (
						<>
							<button
								onClick={() => setSeeOrginals(false)}
								className={`${
									seeOrginals
										? 'bg-white text-blue-500   dark:text-rose-300'
										: 'bg-blue-500 text-white dark:bg-rose-300'
								}  rounded-full px-2 py-1`}>
								A.F. Fanclub
							</button>

							<button
								onClick={() => setSeeOrginals(true)}
								className={`${
									seeOrginals
										? 'bg-blue-500 text-white dark:bg-rose-300'
										: 'bg-white text-blue-500  dark:text-rose-300'
								} group relative rounded-full px-2  py-1`}>
								The Originals
								<span className='absolute z-[1] mt-[-3rem] hidden w-max rounded-full border border-blue-500 bg-white px-1 text-[.6rem] text-blue-500 group-hover:block dark:border-rose-300 dark:text-rose-300 lg:mt-[-3.5rem] lg:text-xs'>
									Access Granted
								</span>
							</button>
						</>
					) : (
						<>
							<button className='rounded-full bg-blue-500 px-2 py-1 text-white dark:bg-rose-300'>
								A.F. Fanclub
							</button>
							<button className='group relative cursor-not-allowed rounded-full bg-white px-2 py-1 text-blue-500 dark:text-rose-300'>
								The Originals
								<span className='absolute z-[1] mt-[-3rem] hidden  w-max rounded-2xl bg-red-500 px-1 text-[.6rem] text-white group-hover:block lg:mt-[-3.5rem] lg:text-xs'>
									Access Denied
								</span>
							</button>
						</>
					)}
				</div>
			</div>

			{seeOrginals && aOriginal && <TheOriginals />}

			{!seeOrginals && (
				<div>
					<div className='flex flex-col p-[10px]'>
						{messages &&
							messages.map((message) => (
								<Message
									key={message.id}
									message={message}
									updateMessage={updateMessage}
									deleteMessage={deleteMessage}
									like={like}
									unLike={unLike}
								/>
							))}
					</div>
					<SendMessage scroll={scroll} />
					<span ref={scroll}></span>
				</div>
			)}
		</>
	);
};

export default Chat;
