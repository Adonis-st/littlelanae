// import { useState, useRef } from 'react';
// import { getAuth, updateProfile } from 'firebase/auth';
// import { auth } from '../utils/firebase';
// import { useAuthState, useEffect } from 'react-firebase-hooks/auth';

export default function Profile() {
	// const [input, setInput] = useState(false);
	// const [editable, setEditable] = useState(false);
	// const ref = useRef(null);
	// const [user, loading] = useAuthState(auth);
	// const { displayName, photoURL } = auth.currentUser;

	// const edit = () => {
	// 	setEditable((prevState) => !prevState);
	// 	setTimeout(() => {
	// 		ref.current.focus();
	// 	}, 10);
	// };

	// const editProfile = async (name) => {
	// 	try {
	// 		await updateProfile(auth.currentUser, { displayName: name });
	// 		setEditable((prevState) => !prevState);
	// 		console.log(user);
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// };

	return (
		<div className='mx-auto mt-4 h-[80vh] w-11/12 shadow-xl sm:w-10/12'>
			{/* <div className='flex flex-col items-center'>
				<h1 className=' text-xl'>Edit Profile</h1>
				<div className='relative mt-2 flex w-24 shrink-0 items-center justify-center rounded-full p-2 hover:scale-105'>
					<img
						src={'/images/profile.jpeg'}
						alt='avatar'
						referrerPolicy='no-referrer'
						className=' inline-block aspect-square w-full shrink-0  rounded-full object-cover  shadow-xl'
					/>
					<div className='absolute flex h-1/2 w-[89px] shrink-0 items-end self-end  rounded-b-full  '>
						<div className='h-[40%] w-full rounded-[50%/100%] rounded-t-none bg-black text-center text-sm tracking-wider text-white opacity-[.9] '>
							Edit
						</div>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center gap-y-3'>
				<div>
					<h3>Display Name</h3>
					<span
						contentEditable={editable}
						className=' p-2'
						onInput={(e) => setInput(e.currentTarget.textContent)}
						suppressContentEditableWarning={true}
						ref={ref}>
						{displayName}
					</span>
					{editable ? (
						<button
							className='ml-4 rounded-full bg-blue-500 p-3'
							onClick={() => editProfile(input)}>
							{' '}
							done
						</button>
					) : (
						<button className='ml-4 rounded-full bg-blue-500 p-3' onClick={edit}>
							{' '}
							edit
						</button>
					)}
				</div>
				<div>
					<h3>Email</h3>
					<span>smoove@gmail.com</span>
				</div>
				<div>
					<h3>Password</h3>
					<span>********</span>
				</div>
			</div> */}
		</div>
	);
}
