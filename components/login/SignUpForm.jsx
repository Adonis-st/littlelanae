import { useState, useRef, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = ({ toggleForm, register }) => {
	const imageMimeType = /image\/(png|jpg|jpeg)/i;
	const [registerForm, setRegisterForm] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = registerForm;

	const [registerDashboard, setRegisterDashboard] = useState(false);
	const inputRef = useRef(null);
	const [photo, setPhoto] = useState(null);
	const [seephoto, setSeePhoto] = useState(null);

	const onChange = (e) => {
		setRegisterForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (name.length < 3) {
			return toast.error('Name must be at least be 3 characters long');
		} else if (password !== password2) {
			return toast.error("Passwords don't match");
		} else if (password.length < 6) {
			return toast.error('Password should be at least 6 characters');
		} else {
			setRegisterDashboard((prevState) => !prevState);
		}
	};

	const getPhoto = (e) => {
		const file = e.target.files[0];
		if (!file.type.match(imageMimeType)) {
			return toast.error('Image type is not valid');
		} else if (file) {
			setPhoto(file);
		} else {
			toast.error('Error');
		}
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (photo) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setSeePhoto(result);
				}
			};
			fileReader.readAsDataURL(photo);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [photo]);

	return (
		<div className='form-container '>
			<ToastContainer position='top-center' />{' '}
			{!registerDashboard && (
				<>
					<button
						onClick={toggleForm}
						className='ml-4 cursor-pointer self-start rounded-full p-1 hover:bg-gray-200 sm:ml-6 sm:text-lg lg:ml-8 lg:text-2xl'>
						<IoArrowBack />
					</button>
					<div>
						<h1 className='text-center text-3xl xl:text-4xl'>Sign Up </h1>
					</div>
					<div className='mx-auto mt-3 w-full'>
						<form onSubmit={onSubmit} className='flex flex-col items-center'>
							<input
								className='login-input mb-[.65rem]  '
								type='text'
								name='name'
								value={name}
								placeholder='Enter Name'
								onChange={onChange}
								required
							/>
							<input
								className='login-input mb-[.65rem]  '
								type='email'
								name='email'
								value={email}
								placeholder='Email'
								onChange={onChange}
								required
							/>
							<input
								className='login-input mb-3'
								type='password'
								name='password'
								value={password}
								placeholder='Password'
								onChange={onChange}
								required
							/>
							<input
								className='login-input mb-3'
								type='password'
								name='password2'
								value={password2}
								placeholder='Confirm Password'
								onChange={onChange}
								required
							/>
							<button type='submit' className='login-btn'>
								Next
							</button>
						</form>
					</div>
				</>
			)}
			{registerDashboard && (
				<>
					<button
						onClick={() => setRegisterDashboard((prevState) => !prevState)}
						className='ml-4 mb-5 cursor-pointer self-start rounded-full p-1 hover:bg-gray-200 sm:ml-6 sm:text-lg lg:ml-8 lg:text-2xl'>
						<IoArrowBack />
					</button>
					<div className='mb-12'>
						<div className=''>
							<div>
								<h2 className='flex flex-col text-base font-medium sm:text-xl lg:text-2xl '>
									<span className='text-center text-2xl font-bold sm:text-3xl lg:text-4xl'>
										{name}
									</span>
									change your avatar icon
								</h2>
							</div>

							<div className='mb-2 flex items-center justify-center'>
								<div
									onClick={() => inputRef.current.click()}
									className='relative mt-2 flex w-36 shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full p-2 duration-500 ease-in-out hover:scale-[1.08] '>
									<img
										src={seephoto ? seephoto : '/images/profile.jpeg'}
										alt='Default Avatar'
										className=' inline-block aspect-square w-full rounded-full object-cover shadow-xl'
									/>

									<div className='absolute flex h-1/2 w-[103px] shrink-0 items-end self-end rounded-b-full '>
										<div className='h-[44%] w-full rounded-[50%/100%] rounded-t-none bg-black text-center text-base font-medium leading-7 tracking-wider text-white opacity-[.85] '>
											Edit
										</div>
									</div>
								</div>
							</div>
							<input
								type='file'
								onChange={getPhoto}
								accept='.png, .jpg, .jpeg'
								ref={inputRef}
								className='hidden'
							/>
						</div>

						<div className='mx-auto mt-10 flex  justify-around'>
							<button
								onClick={() => register(name, email, password)}
								disabled={photo}
								className='register-avatar-btn disabled:opcity-60 bg-gray-400 hover:bg-gray-600 focus:bg-gray-600 disabled:pointer-events-none disabled:text-opacity-80 dark:bg-gray-400 dark:hover:bg-gray-600 dark:focus:bg-gray-600'>
								Skip
							</button>
							<button
								onClick={() => register(name, email, password, photo)}
								disabled={!photo}
								className='register-avatar-btn disabled:pointer-events-none  disabled:text-opacity-80 disabled:opacity-60'>
								Done
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SignUpForm;
