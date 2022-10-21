import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const SignUpForm = ({ toggleForm, register }) => {
	const [registerForm, setRegisterForm] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = registerForm;
	const onChange = (e) => {
		setRegisterForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			alert("Passwords don't match");
		} else if (password.length < 6) {
			alert('Password should be at least 6 characters');
		} else {
			register(name, email, password);
		}
	};
	return (
		<div className='form-container '>
			<button
				onClick={toggleForm}
				className='ml-4 cursor-pointer  self-start rounded-full  p-1  hover:bg-gray-200 sm:ml-6 sm:text-lg lg:ml-8 lg:text-2xl '>
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
						id='name'
						name='name'
						value={name}
						placeholder='Enter Name'
						onChange={onChange}
						required
					/>
					<input
						className='login-input mb-[.65rem]  '
						type='email'
						id='email'
						name='email'
						value={email}
						placeholder='Email'
						onChange={onChange}
						required
					/>
					<input
						className='login-input mb-3'
						type='password'
						id='password'
						name='password'
						value={password}
						placeholder='Password'
						onChange={onChange}
						required
					/>
					<input
						className='login-input mb-3'
						type='password'
						id='password2'
						name='password2'
						value={password2}
						placeholder='Confirm Password'
						onChange={onChange}
						required
					/>
					<button type='submit' className='login-btn'>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
