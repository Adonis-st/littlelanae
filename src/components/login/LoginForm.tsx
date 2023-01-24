import { useState } from "react";
import { loginFormSchema, LoginFormInput } from "../../utils/form.schema";
import z from "zod";

export const LoginForm = ({ toggleForm, login }) => {
	const [loginForm, setLoginForm] = useState({
		email: "d",
		password: "d",
	});
	const { email, password } = loginForm;

	const onChange = (e) => {
		setLoginForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const formData: LoginFormInput = { email, password };
		const results = loginFormSchema.safeParse(formData);
		if (!results.success) {
			// const formattedErrors = results.error.format();
		} else {
		}
		login(formData);
	};

	return (
		<div className="mx-auto mt-5 w-full">
			<form onSubmit={onSubmit} className="flex flex-col items-center">
				<input
					className="login-input mb-[.65rem]"
					type="email"
					name="email"
					value={email}
					placeholder="Email"
					onChange={onChange}
				/>
				<input
					className="login-input mb-3"
					type="password"
					name="password"
					value={password}
					placeholder="Password"
					onChange={onChange}
					required
				/>
				<button type="submit" className="login-btn">
					Login
				</button>

				<div className="mt-5 text-xs xl:text-sm">
					<small>Don&#39;t have an account yet?</small>
					<button
						onClick={toggleForm}
						className='ml-1 cursor-pointer font-["Source_Sans_Pro"] font-semibold text-blue-600 hover:text-blue-400 dark:text-rose-300 dark:hover:text-rose-200'>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};
