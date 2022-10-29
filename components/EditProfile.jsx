import { Modal } from 'flowbite-react';
import { useState } from 'react';

const EditProfile = ({
	displayEditProfile,
	updateDisplayName,
	updateUserEmail,
	updateUserPassword,
	deleteProfile,
	profileData,
	closeModal,
}) => {
	const { name, email, password, deleteAccount } = displayEditProfile;

	const [newProfileData, setNewProfileData] = useState({
		newName: '',
		newEmail: '',
		newPassword: '',
		newPassword2: '',
	});

	const { newName, newEmail, newPassword, newPassword2 } = newProfileData;
	const onChange = (e) => {
		setNewProfileData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<Modal show={true} size='lg' popup={true} position='center' onClose={closeModal}>
				<Modal.Header />
				<Modal.Body>
					<div className='flex items-center justify-center'>
						{name && (
							<div>
								<label htmlFor='name'>Name:</label>
								<input
									className='ml-1 rounded-md'
									type='text'
									id='name'
									name='newName'
									value={newName}
									placeholder='hello'
									onChange={onChange}
								/>
								<div className='mt-3 flex justify-center gap-x-4 font-["Source_Sans_Pro"] font-semibold text-white'>
									<button
										onClick={() => [updateDisplayName(newName), closeModal]}
										className='order-1 rounded-lg bg-blue-600 px-3 py-1 dark:bg-rose-300'>
										Done
									</button>
									<button
										className='rounded-lg bg-gray-400 px-3 py-1'
										onClick={closeModal}>
										Cancel
									</button>
								</div>
							</div>
						)}
						{email && (
							<div>
								<label htmlFor='email'>Email:</label>
								<input
									className='ml-1 rounded-md'
									type='email'
									id='email'
									name='newEmail'
									value={newEmail}
									placeholder={profileData.currentEmail}
									onChange={onChange}
								/>
								<div className='mt-3 flex justify-center gap-x-4 font-["Source_Sans_Pro"] font-semibold text-white'>
									<button
										onClick={() => [updateUserEmail(newEmail), closeModal]}
										className='order-1 rounded-lg bg-blue-500 px-3 py-1 dark:bg-rose-300'>
										Done
									</button>
									<button
										className='rounded-lg bg-gray-400 px-3 py-1'
										onClick={closeModal}>
										Cancel
									</button>
								</div>
							</div>
						)}
						{password && (
							<div className='flex flex-col  justify-center'>
								<label htmlFor='password'>Password:</label>
								<input
									className='ml-1 rounded-md'
									type='password'
									id='password'
									name='newPassword'
									value={newPassword}
									placeholder='New Password'
									onChange={onChange}
								/>

								<label className='mt-2' htmlFor='password2'>
									Confirm Password
								</label>
								<input
									className='ml-1 rounded-md'
									type='password'
									id='password2'
									name='newPassword2'
									value={newPassword2}
									placeholder='Confirm Password'
									onChange={onChange}
								/>
								<div className='mt-3 flex justify-center gap-x-4 font-["Source_Sans_Pro"] font-semibold text-white'>
									<button
										onClick={() => [
											updateUserPassword(newPassword, newPassword2),
											closeModal,
										]}
										className='order-1 rounded-lg bg-blue-500 px-3 py-1 dark:bg-rose-300'>
										Done
									</button>
									<button
										className='rounded-lg bg-gray-400 px-3 py-1'
										onClick={closeModal}>
										Cancel
									</button>
								</div>
							</div>
						)}

						{deleteAccount && (
							<div className='text-center'>
								<h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
									Are you sure you want to
									<span className='font-bold tracking-wide text-red-500'>
										{' '}
										permanently delete
									</span>{' '}
									this account?
								</h3>
								<div className='flex justify-center gap-4'>
									<button
										onClick={deleteProfile}
										className='rounded-md bg-red-600 p-1 text-white'>
										Yes, I am sure
									</button>
									<button color='gray' onClick={closeModal}>
										No, cancel
									</button>
								</div>
							</div>
						)}
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default EditProfile;
