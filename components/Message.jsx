import { auth } from '../utils/firebase';
import { GiTrashCan } from 'react-icons/gi';
import { MdMode } from 'react-icons/md';
import { useState } from 'react';
import { ImQuotesLeft as QuoteL } from 'react-icons/im';
import { Button, Modal } from 'flowbite-react';

const Message = ({ message, updateMessage, deleteMessage, likeCounter }) => {
	const [input, setInput] = useState(message.text);
	const presentUser = message.uid === auth.currentUser.uid;
	const user = auth.currentUser;
	const [showModal, setShowModal] = useState(false);
	function displayModal() {
		setShowModal((prevState) => !prevState);
	}

	return (
		<div>
			<div className={``}>
				{!presentUser && (
					<div className='mb-2  flex flex-col items-start justify-start'>
						<div className=' ml-9 flex sm:ml-11'>
							<span className='mr-1 hidden text-xs '>from </span>
							<p className='text-left font-["Source_Sans_Pro"] text-xs italic text-gray-600 sm:text-sm '>
								{message.name}
							</p>
						</div>
						<div className='flex max-w-[79%] sm:max-w-[65%]'>
							<div className=' max-w-full'>
								<div className=' mb-2 flex  rounded-2xl rounded-bl-sm bg-gray-300/[.8] py-[.3rem] px-3 text-gray-800 '>
									<div className='flex'>
										<blockquote className=' text-left  font-semibold sm:text-xl'>
											{message.text}
										</blockquote>
									</div>
								</div>
							</div>
							<div className=' order-[-3] mt-8 mr-1  w-7 self-end sm:w-9'>
								<img
									className='inline-block aspect-square min-w-[1.75rem] rounded-full object-cover sm:min-w-[2.25rem]'
									src={message.photo}
									alt='Avatar'
								/>
							</div>
						</div>
					</div>
				)}

				{presentUser && (
					<div className=' group  mb-3 flex flex-col items-end justify-end'>
						<div>
							<p className='mr-1 text-end font-["Source_Sans_Pro"] text-xs italic sm:text-sm'>
								{message.name}
							</p>
						</div>
						<div className='flex  max-w-[70%] flex-col items-end rounded-full sm:max-w-[60%]'>
							<div className=' max-w-full rounded-2xl rounded-br-sm bg-blue-600 py-[.3rem] px-3   text-white group-hover:rounded-b-none'>
								<blockquote
									contentEditable='true'
									className=' w-full rounded-lg bg-inherit p-0 text-left font-semibold text-white caret-gray-900 ring-4 ring-blue-600 focus:bg-blue-400  focus:ring-white sm:text-xl '
									onInput={(e) => setInput(e.currentTarget.textContent)}
									suppressContentEditableWarning={true}>
									{message.text}
								</blockquote>
							</div>
							<div className=' hidden w-full  items-center justify-evenly rounded-2xl rounded-t-none bg-blue-700 p-1 py-2 group-hover:flex '>
								<button
									onClick={displayModal}
									className=' flex w-[40%] justify-center  rounded-md bg-red-600 p-1  font-semibold text-white'>
									<GiTrashCan className=' text-lg ' />
									<span className='ml-1 tracking-wide'>Delete</span>
								</button>
								<Modal show={showModal} size='lg' popup={true} onClose={displayModal}>
									<Modal.Header />
									<Modal.Body>
										<div className='text-center'>
											<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
												Are you sure you want to <span>permanently delete </span>this
												post?
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

								<button
									onClick={() => updateMessage(message.id, input)}
									className=' duration-400 order-[-1] flex w-[40%] items-center justify-center rounded-md  bg-blue-400/[.35] p-1  font-semibold   text-white/[.9] transition delay-150 ease-in-out hover:translate-x-1 hover:scale-105 hover:text-gray-900'>
									<MdMode className='text-lg' />
									<span className='ml-1 tracking-wide'>Edit</span>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Message;
