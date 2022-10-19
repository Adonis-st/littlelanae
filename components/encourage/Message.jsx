import { auth } from '../../utils/firebase';
import { GiTrashCan } from 'react-icons/gi';
import { MdMode, MdDone } from 'react-icons/md';
import { useState, useRef } from 'react';
import { Button, Modal } from 'flowbite-react';

const Message = ({ message, updateMessage, deleteMessage }) => {
	const [input, setInput] = useState(message.text);
	const [editable, setEditable] = useState(false);
	const presentUser = message.uid === auth.currentUser.uid;
	const user = auth.currentUser;
	const [showModal, setShowModal] = useState(false);
	const displayModal = () => setShowModal((prevState) => !prevState);

	const ref = useRef(null);

	const edit = () => {
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
	};

	return (
		<div>
			<div>
				{!presentUser && (
					<div className='mb-2 flex flex-col items-start justify-start lg:mb-4'>
						<div className='ml-9 flex sm:ml-11 lg:ml-14'>
							<span className='mr-1 hidden text-xs'>from </span>
							<p className='message-name text-left'>{message.name}</p>
						</div>
						<div className='flex max-w-[74%]  sm:max-w-[65%] lg:max-w-[58%]'>
							<div className='max-w-full '>
								<div className='mb-2 flex rounded-3xl rounded-bl-sm bg-gray-300/[.8] px-3 pt-2 pb-[.3rem] text-gray-800 shadow-xl  sm:px-[.8rem] sm:pt-[.6rem] sm:pb-[.4rem]  lg:px-[.9rem] lg:pt-3 lg:pb-2'>
									<div className='align-start flex '>
										<blockquote className='flex text-left font-semibold capitalize sm:text-xl lg:text-2xl'>
											{message.text}
										</blockquote>
									</div>
								</div>
							</div>
							<div className=' order-[-3] mt-8 mr-1 w-7  shrink-0 self-end  sm:w-9 lg:w-14'>
								<img
									className='inline-block aspect-square rounded-full object-cover shadow-xl'
									src={message.photo}
									alt='Avatar'
								/>
							</div>
						</div>
					</div>
				)}

				{presentUser && (
					<div className='mb-3 flex flex-col items-end justify-end'>
						<div>
							<p className=' message-name  mr-1  text-end lg:mr-2'>{message.name}</p>
						</div>
						<div className=' group flex max-w-[70%] flex-col items-end rounded-full sm:max-w-[60%] lg:max-w-[52%]'>
							<div className=' max-w-full rounded-3xl rounded-br-sm bg-blue-600  px-3 pt-2 pb-[.3rem] text-white shadow-xl group-hover:rounded-b-none sm:px-[.8rem]  sm:pt-[.6rem] sm:pb-[.4rem] lg:px-[.9rem]  lg:pt-2 '>
								<blockquote
									contentEditable={editable}
									className='message-text_user '
									onInput={(e) => setInput(e.currentTarget.textContent)}
									suppressContentEditableWarning={true}
									ref={ref}>
									{message.text}
								</blockquote>
							</div>
							<div className=' hidden w-full  items-center justify-evenly rounded-2xl rounded-t-none bg-blue-700 p-1 py-2 group-hover:flex'>
								<button
									onClick={displayModal}
									className=' flex w-[40%] justify-center  rounded-md bg-red-600 p-1 font-semibold text-white ring-1 ring-red-300 hover:bg-red-400'>
									<GiTrashCan className=' text-lg ' />
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
												<Button
													color='failure'
													onClick={() => deleteMessage(message.id)}>
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
										onClick={edit}
										className='order-[-1] flex w-[40%] items-center justify-center rounded-md bg-blue-500/[.7] p-1 font-semibold text-white ring-1 ring-blue-300 hover:bg-blue-400'>
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
