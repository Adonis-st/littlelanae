import { useState, useEffect, useRef } from "react";
import { auth } from "../../utils/firebase";
import { Message } from "./Message";
import { SendMessage } from "./SendMessage";
import { db } from "../../utils/firebase";
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
} from "firebase/firestore";
import { TheOriginals } from "./TheOriginals";
import { Spinner } from "../Spinner";
import { SeeOriginals } from "./SeeOriginals";

export const Chat = () => {
	const scroll = useRef();
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const [hasAccess, setHasAccess] = useState([]);
	const [seeOrginals, setSeeOrginals] = useState(false);
	const aOriginal = hasAccess.find((isAOrginal) => isAOrginal === auth.currentUser.uid)
		? true
		: false;

	// Show messages
	useEffect(() => {
		setLoading(true);
		const q = query(collection(db, "messages"), orderBy("timeStamp"));
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
		const q = query(collection(db, "theOriginals"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let messages = [];
			querySnapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setHasAccess(messages[0].hasAccess);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	// Update message
	const updateMessage = async (id, updatedMessage) => {
		await updateDoc(doc(db, "messages", id), {
			text: updatedMessage,
		});
	};

	// Delete message
	const deleteMessage = async (id) => {
		await deleteDoc(doc(db, "messages", id));
	};

	// Like message
	const like = async (id, user) => {
		const messages = doc(db, "messages", id);
		await updateDoc(messages, { likes: arrayUnion(user) });
	};

	// Unlike message
	const unLike = async (id, user) => {
		const messages = doc(db, "messages", id);
		await updateDoc(messages, { likes: arrayRemove(user) });
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<SeeOriginals
				aOriginal={aOriginal}
				seeOrginals={seeOrginals}
				setSeeOrginals={setSeeOrginals}
			/>

			{seeOrginals && aOriginal && <TheOriginals />}

			{!seeOrginals && (
				<div>
					<div className="flex flex-col p-[10px]">
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
