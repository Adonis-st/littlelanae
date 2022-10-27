import { useState, useEffect, useRef } from 'react';
import { getAuth, deleteUser, updateEmail, updateProfile, updatePassword } from 'firebase/auth';
import { auth as Auth, upload } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';
import EditProfile from '../components/EditProfile';

export default function Profile() {
	const [profileData, setProfileData] = useState({
		photoUrl: '/images/profile.jpeg',
		displayName: '',
		currentEmail: '',
	});
	const { photoUrl, displayName, currentEmail } = profileData;

	const [displayEditProfile, setDisplayEditProfile] = useState({
		name: false,
		email: false,
		password: false,
		deleteAccount: false,
	});
	const auth = getAuth();
	const [photo, setPhoto] = useState(null);
	const [loading, setLoading] = useState(false);

	const [user] = useAuthState(Auth);
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();
	const inputRef = useRef(null);

	useEffect(() => {
		if (user && user.photoURL) {
			setProfileData((prevState) => ({
				...prevState,
				photoUrl: user.photoURL,
			}));
		}
		if (user) {
			setProfileData((prevState) => ({
				...prevState,
				displayName: user.displayName,
				currentEmail: user.email,
			}));
		}
	}, [user]);

	const updateDisplayName = async (newName) => {
		if (!newName) {
			return alert('Please enter a vaild field');
		} else {
			try {
				await updateProfile(user, { displayName: newName });
				console.log(user);
				alert('Name change was successfull');
				window.location.reload();
			} catch (error) {
				console.log(error.message);
			}
		}
	};

	const updateUserEmail = async (newEmail) => {
		try {
			await updateEmail(auth.currentUser, newEmail);
			console.log(user);
			alert('Email change was successfull');
			window.location.reload();
		} catch (error) {
			if (error.message === 'Firebase: Error (auth/invalid-email).') {
				alert('Invaild email');
			} else {
				alert('log out and log back in');
			}
			console.log(error.message);
		}
	};

	const updateUserPassword = async (newPassword, confirmedPassword) => {
		if (newPassword !== confirmedPassword) {
			alert("Passwords don't match");
		} else if (newPassword.length < 6) {
			alert('Password should be at least 6 characters');
		} else {
			try {
				await updatePassword(auth.currentUser, newPassword);
				console.log(user);
				alert('Password change was successfull');
				window.location.reload();
			} catch (error) {
				console.log(error.message);
			}
		}
	};

	const deleteProfile = async () => {
		try {
			setLoading(true);
			await deleteUser(auth.currentUser);
			setLoading(false);
			router.push('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	};

	const handleClick = () => {
		upload(photo, user, setLoading);
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className='mx-auto mt-6 h-[70vh] w-11/12 max-w-[650px] rounded-lg bg-white shadow-xl dark:shadow-rose-300 sm:mt-10 sm:w-8/12 lg:h-[60vh] lg:text-lg'>
			<h1 className='pt-7 text-center font-["Source_Sans_Pro"] text-2xl sm:text-3xl xl:text-4xl'>
				Edit Profile
			</h1>
			<div className='mb-2 flex items-center justify-center'>
				<div
					onClick={() => inputRef.current.click()}
					className='relative mt-2 flex w-24 shrink-0 grow-0  cursor-pointer items-center justify-center rounded-full p-2 duration-500 ease-in-out hover:scale-[1.08] lg:w-28'>
					<img
						src={photoUrl}
						alt='avatar'
						referrerPolicy='no-referrer'
						className=' inline-block aspect-square w-full shrink-0 grow-0 rounded-full object-cover shadow-xl'
					/>
					<div className='absolute flex h-1/2 w-[70px] shrink-0 items-end self-end rounded-b-full lg:w-[81px] '>
						<div className='h-[48%] w-full rounded-[50%/100%] rounded-t-none bg-black text-center text-sm tracking-wider text-white opacity-80 '>
							Edit
						</div>
					</div>
				</div>
				<button
					onClick={handleClick}
					disabled={loading || !photo}
					className='ml-1 rounded-full bg-blue-600 px-3 py-1 font-semibold tracking-wider text-white shadow-lg hover:bg-blue-400 disabled:hidden dark:bg-rose-300 dark:hover:bg-rose-200'>
					Upload
				</button>
			</div>
			<div className='flex flex-col items-center gap-y-4'>
				<div className='flex w-full items-center justify-center'>
					<h3 className='mr-1 font-light'>Name:</h3>
					<span className='text-sm font-medium lg:text-base'>{displayName}</span>
					<button
						className='ml-5 rounded-full p-1  font-semibold text-blue-500 hover:bg-gray-200 dark:text-rose-300'
						onClick={() => [
							setDisplayEditProfile((prevState) => ({ ...prevState, name: true })),
							setShowModal((prevState) => !prevState),
						]}>
						Edit
					</button>
				</div>

				<div className='flex w-full items-center justify-center'>
					<h3 className='mr-1 font-light'>Email:</h3>
					<span className='text-sm font-medium lg:text-base'>{currentEmail}</span>
					<button
						className='ml-4 rounded-full p-1 font-semibold text-blue-500 hover:bg-gray-200 dark:text-rose-300'
						onClick={() => [
							setDisplayEditProfile((prevState) => ({ ...prevState, email: true })),
							setShowModal((prevState) => !prevState),
						]}>
						Edit
					</button>
				</div>
				<div className='flex w-full items-center justify-center'>
					<h3 className='mr-1 font-light '>Password:</h3>
					<span className='mt-[.35rem] text-sm font-medium lg:text-base'>********</span>
					<button
						className='ml-4 rounded-full p-1 font-semibold text-blue-500 hover:bg-gray-200 dark:text-rose-300'
						onClick={() => [
							setDisplayEditProfile((prevState) => ({ ...prevState, password: true })),
							setShowModal((prevState) => !prevState),
						]}>
						Edit
					</button>
				</div>
				<div className='flex'>
					<label>
						<input type='file' ref={inputRef} className='hidden' onChange={handleChange} />
					</label>
				</div>

				<div>
					<button
						onClick={() => [
							setDisplayEditProfile((prevState) => ({ ...prevState, deleteAccount: true })),
							setShowModal((prevState) => !prevState),
						]}
						className='rounded-lg bg-red-600 px-4 py-2 font-bold text-white shadow-lg hover:bg-red-400'>
						Delete account
					</button>
				</div>

				{showModal && (
					<EditProfile
						setShowModal={setShowModal}
						displayEditProfile={displayEditProfile}
						setDisplayEditProfile={setDisplayEditProfile}
						updateDisplayName={updateDisplayName}
						updateUserEmail={updateUserEmail}
						updateUserPassword={updateUserPassword}
						deleteProfile={deleteProfile}
						profileData={profileData}
					/>
				)}
			</div>
		</div>
	);
}
