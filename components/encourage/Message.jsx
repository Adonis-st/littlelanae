import { auth } from '../../utils/firebase';
import { GiTrashCan } from 'react-icons/gi';
import { AiFillHeart } from 'react-icons/ai';
import { MdMode, MdDone } from 'react-icons/md';
import { useState, useRef } from 'react';
import { Button, Modal } from 'flowbite-react';

const Message = ({ message, updateMessage, deleteMessage, like, unLike }) => {
	const [input, setInput] = useState(message.text);
	const [editable, setEditable] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const presentUser = message.uid === auth.currentUser.uid;
	const ref = useRef(null);
	const [displayMe, setDisplayMe] = useState(false);

	const displayModal = () => setShowModal((prevState) => !prevState);

	const editMessage = () => {
		setEditable((prevState) => !prevState);
		setTimeout(() => {
			ref.current.focus();
		}, 10);
	};

	const updatedMessage = () => {
		setEditable((prevState) => !prevState);
		setTimeout(() => {
			updateMessage(message.id, input);
		}, 10);
		messageDisplayClose();
	};

	const deletedMessage = () => {
		deleteMessage(message.id);
		messageDisplayClose();
	};

	// Checking if current user has liked message
	let hasLike;
	if (message.likes) {
		hasLike = message.likes.find((hasLiked) => hasLiked === auth.currentUser.uid) ? true : false;
	}

	const messageDisplayOpen = () => {
		setDisplayMe(true);
	};

	const messageDisplayClose = () => {
		setDisplayMe(false);
	};

	return (
		<div className='select-none'>
			{displayMe && (
				<div
					onClick={messageDisplayClose}
					className='absolute inset-0 z-0 bg-white opacity-70'></div>
			)}
			<div>
				{!presentUser && (
					<div
						className={` ${
							displayMe ? 'relative z-10' : ''
						} mb-2 flex flex-col items-start justify-start lg:mb-5`}>
						<div className='ml-9 flex sm:ml-11 lg:ml-14'>
							<span className='message-name text-left'>{message.name}</span>
						</div>
						<div className='flex max-w-[74%] sm:max-w-[65%] lg:max-w-[58%]'>
							<div className=' flex max-w-full'>
								<div className='mb-2 flex self-start rounded-3xl rounded-bl-sm bg-gray-300/[.8] px-3 pt-2 pb-[.3rem] text-gray-800 shadow-xl sm:px-[.8rem] sm:pt-[.6rem] sm:pb-[.4rem] lg:px-[.9rem] lg:pt-3 lg:pb-2'>
									<div className='align-start flex'>
										<blockquote className='flex text-left font-medium capitalize sm:text-xl'>
											{message.text}
										</blockquote>
									</div>
								</div>

								<div className=' order-[1] ml-1 mt-1 flex'>
									{hasLike ? (
										<AiFillHeart
											className='message-hearts text-red-500'
											onClick={() => unLike(message.id, auth.currentUser.uid)}
										/>
									) : (
										<AiFillHeart
											className='message-hearts opacity-60 '
											onClick={() => like(message.id, auth.currentUser.uid)}
										/>
									)}{' '}
									<small className='font-semi-bold ml-[.15rem] select-none text-[.55rem]'>
										{message.likes.length ? message.likes.length : ''}
									</small>
								</div>
							</div>
							<div className='order-[-10] mt-8 mr-1 w-7 shrink-0 flex-grow-0 select-none self-end  sm:w-9 lg:w-11 '>
								<img
									className='inline-block aspect-square w-full rounded-full object-cover  shadow-xl'
									src={message.avatar}
									alt='Avatar'
								/>
							</div>
						</div>
					</div>
				)}

				{presentUser && (
					<div
						className={`${
							displayMe ? 'relative z-10' : ''
						} mb-3 flex flex-col items-end justify-end lg:mb-5`}>
						<div>
							<p className='message-name  mr-1  text-end lg:mr-2'>{message.name}</p>
						</div>
						<div className='flex max-w-[70%] flex-col items-end rounded-full sm:max-w-[60%] lg:max-w-[52%] '>
							<div className='flex'>
								<div
									onClick={messageDisplayOpen}
									className={`${
										displayMe ? 'rounded-b-none' : ''
									} dark:rose max-w-full rounded-3xl rounded-br-sm bg-blue-600 px-3 pt-2 pb-[.3rem] text-white shadow-xl dark:bg-rose-200  sm:px-[.8rem] sm:pt-[.6rem] sm:pb-[.4rem] lg:px-[.9rem] lg:pt-2`}>
									<blockquote
										contentEditable={editable}
										className='message-text_user '
										onInput={(e) => setInput(e.currentTarget.textContent)}
										suppressContentEditableWarning={true}
										ref={ref}>
										{message.text}
									</blockquote>
								</div>
								<div className=' order-[-1] mr-1  mt-1 flex '>
									{hasLike ? (
										<AiFillHeart
											className='message-hearts text-red-500'
											onClick={() => unLike(message.id, auth.currentUser.uid)}
										/>
									) : (
										<AiFillHeart
											className='message-hearts opacity-60'
											onClick={() => like(message.id, auth.currentUser.uid)}
										/>
									)}{' '}
									<small className='message-likes-count order-[-1]'>
										{message.likes.length ? message.likes.length : ''}
									</small>
								</div>
							</div>
							<div
								className={`${
									displayMe ? 'flex' : 'hidden'
								} w-full items-center justify-evenly rounded-2xl rounded-t-none bg-blue-700 p-1 py-2  dark:bg-rose-300`}>
								<button
									onClick={displayModal}
									className='flex w-[40%] justify-center rounded-md bg-red-600 p-1 font-semibold text-white ring-1 ring-red-300 hover:bg-red-400'>
									<GiTrashCan className='text-lg' />
									<span className='ml-1 tracking-wide'>Delete</span>
								</button>
								<Modal show={showModal} size='lg' popup={true} onClose={displayModal}>
									<Modal.Header />
									<Modal.Body>
										<div className='text-center'>
											<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
												Are you sure you want to
												<span className='font-bold tracking-wide text-red-500'>
													{' '}
													permanently delete
												</span>{' '}
												this post?
											</h3>
											<div className='flex justify-center gap-4'>
												<Button color='failure' onClick={deletedMessage}>
													Yes, I am sure
												</Button>
												<Button color='gray' onClick={displayModal}>
													No, cancel
												</Button>
											</div>
										</div>
									</Modal.Body>
								</Modal>

								{!editable ? (
									<button
										onClick={editMessage}
										className='order-[-1] flex w-[40%] items-center justify-center rounded-md bg-blue-500/[.7] p-1 font-semibold text-white ring-1 ring-blue-300 hover:bg-blue-400 dark:bg-rose-200/[.7] dark:ring-rose-100 dark:hover:bg-rose-100'>
										<MdMode className='text-lg ' />
										<span className='ml-1 tracking-wide'>Edit</span>
									</button>
								) : (
									<button
										onClick={updatedMessage}
										className='order-[-1] flex w-[40%] items-center justify-center rounded-md bg-[#00FF00] p-1 font-semibold text-white ring-1 ring-green-300 hover:bg-[#00FF00]/[.7]'>
										<MdDone className=' text-xl' />
										<span className='ml-1 text-base tracking-wide'>Done</span>
									</button>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Message;
