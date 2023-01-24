import { useState, useEffect } from "react";
import Head from "next/head";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, upload } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoginForm } from "../components/login/LoginForm";
import { SignUpForm } from "../components/login/SignUpForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "../components/Spinner";
import { loginFormSchema, LoginFormInput } from "../utils/form.schema";

export default function LoginPage() {
	const [user] = useAuthState(auth);
	const [newUser, setNewUser] = useState(false);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	// Sign in with Google
	const googleProvider = new GoogleAuthProvider();
	const GoogleLogin = async () => {
		setLoading(true);
		try {
			await signInWithPopup(auth, googleProvider);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			return toast.error(error);
		}
	};

	// Sign in with Facebook
	const fbProvider = new FacebookAuthProvider();
	const FacebookLogin = async () => {
		setLoading(true);
		try {
			const result = await signInWithPopup(auth, fbProvider);
			const credantial = await FacebookAuthProvider.credentialFromResult(result);
			const token = credantial.accessToken;
			let photoUrl = result.user.photoURL + "?height=350&access_token=" + token;
			await updateProfile(auth.currentUser, { photoURL: photoUrl });
			setLoading(false);
		} catch (error) {
			setLoading(false);
			return toast.error(error);
		}
	};

	// Register with email & password
	const register = async (name, email, password, photo) => {
		setLoading(true);

		try {
			await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, { displayName: name });
			if (photo) {
				await upload(photo, auth.currentUser, setLoading, true);
			}
		} catch (error) {
			setLoading(false);
			return toast.error(error.message);
		}
	};

	// Login with email & password
	const login = async ({ email, password }: LoginFormInput) => {
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			if (error.message === "Firebase: Error (auth/wrong-password).") {
				return toast.error(" Please check your password");
			} else if (error.message === "Firebase: Error (auth/user-not-found).") {
				return toast.error("Please check your email");
			} else {
				return toast.error(error.message);
			}
		}
	};

	useEffect(() => {
		if (user) {
			router.push("/encouragement");
		} else {
			console.log("login");
		}
	}, [user]);

	const toggleForm = () => setNewUser((prevState) => !prevState);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<Head>
				<title>Login</title>
				<meta name="description" content="Login" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="flex h-[90vh] max-h-[650px] justify-center xl:items-center">
				<ToastContainer position="top-center" />
				{!newUser ? (
					<div className="form-container">
						<h1 className="mb-3 text-center text-3xl xl:text-4xl ">Login</h1>
						<button onClick={GoogleLogin} className="sign-in-btn mb-[.85rem]">
							<FcGoogle className="text-2xl sm:text-3xl xl:text-4xl" />
							<span className="ml-2 sm:text-xl xl:text-2xl">Continue with Google</span>
						</button>
						<button onClick={FacebookLogin} className="sign-in-btn">
							<AiFillFacebook className="text-2xl text-blue-800 sm:text-3xl xl:text-4xl" />
							<span className="ml-2 sm:text-xl xl:text-2xl">Continue with Facebook</span>
						</button>
						<div className="mt-5 h-[1px] w-[73%] max-w-[290px] border-b border-gray-400"></div>
						<LoginForm toggleForm={toggleForm} login={login} />
					</div>
				) : (
					<SignUpForm toggleForm={toggleForm} register={register} />
				)}
			</div>
		</>
	);
}
