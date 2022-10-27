import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdMenu, MdOutlineLightMode, MdDarkMode, MdMenuOpen } from 'react-icons/md';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

const Nav = () => {
	const [user, loading] = useAuthState(auth);
	const [darkMode, setDarkMode] = useState(null);
	const [hamburgerMenu, setHamburgerMenu] = useState(false);
	const router = useRouter();

	// Dark Mode
	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setDarkMode('dark');
		} else {
			setDarkMode('light');
		}
	}, []);

	useEffect(() => {
		if (darkMode === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);
	const handleThemeSwitch = () => setDarkMode(darkMode === 'dark' ? 'light' : 'dark');

	// Added encouragement as a protected route
	useEffect(() => {
		if (!user) {
			if (router.pathname === '/encouragement') {
				router.push('/login');
			}
		} else {
			console.log('login');
		}
	}, [user]);

	const signOut = () => {
		auth.signOut();
		router.push('/login');
	};

	return (
		<>
			<div className='bg-gray-50 shadow-md  dark:bg-rose-200'>
				<nav className='navbar'>
					<button
						className='ml-1 sm:hidden'
						onClick={() => setHamburgerMenu((prevState) => !prevState)}>
						{hamburgerMenu ? (
							<MdMenuOpen className='h-8 w-8' />
						) : (
							<MdMenu className='h-8 w-8' />
						)}
					</button>
					{!user && (
						<button className='mr-4 sm:order-3 xl:mr-4' onClick={handleThemeSwitch}>
							{darkMode === 'dark' ? (
								<MdDarkMode className='h-7 w-7 lg:h-8 lg:w-8' />
							) : (
								<MdOutlineLightMode className='h-7 w-7 text-rose-300 lg:h-8 lg:w-8' />
							)}
						</button>
					)}

					{/* Dropdown menu */}
					{user && (
						<div className='mr-4 sm:order-3'>
							<button className='group relative flex cursor-pointer flex-col focus-within:bg-rose-50  focus-within:dark:bg-[#FFFFFFB3]'>
								<div className='shrink-0 grow-0 rounded-md p-2 hover:bg-rose-50 dark:hover:bg-[#FFFFFFB3]'>
									<img
										src={user.photoURL ? user.photoURL : 'images/profile.jpeg'}
										alt='avatar'
										referrerPolicy='no-referrer'
										className='inline-block aspect-square w-7 rounded-full object-cover lg:w-8 xl:w-9'
									/>
								</div>

								<div className='nav-dropdown hidden group-focus:block  max-lg:group-hover:block'>
									{/* <div className='hidden '></div> */}
									<ul>
										<li className='nav-dropdown-item '>
											<div
												onClick={handleThemeSwitch}
												className=' nav-dropdown-padding flex items-center'>
												{darkMode === 'dark'}
												<MdOutlineLightMode className='h-4 w-4  lg:h-7 lg:w-7 ' />
												<div className='mx-1 w-[43px] rounded-full bg-white py-[.2rem] lg:mx-2 lg:w-[53px]'>
													<div
														className={`aspect-square w-4 rounded-full  ${
															darkMode === 'dark'
																? 'translate-x-6 bg-rose-300 duration-300 ease-in-out lg:translate-x-8'
																: 'translate-x-1 bg-gray-600 duration-300 ease-in-out'
														}`}></div>
												</div>
												<MdDarkMode className='h-4 w-4 text-rose-300 lg:h-7  lg:w-7  ' />
											</div>
										</li>

										<li className='nav-dropdown-item'>
											<Link href='/profile'>
												<div className='nav-dropdown-padding w-full'>Edit Profile</div>
											</Link>
										</li>

										<li className='nav-dropdown-item'>
											<div className='nav-dropdown-padding w-full' onClick={signOut}>
												Sign Out
											</div>
										</li>
									</ul>
								</div>
							</button>
						</div>
					)}

					<div
						className={`${
							hamburgerMenu ? '' : 'hidden'
						} w-full sm:inline-flex sm:w-auto sm:flex-grow`}>
						<div className='ml-3 flex flex-col pt-2  sm:flex-row'>
							<Link href='/'>
								<a className={`${router.pathname === '/' ? 'active' : ''} navbar-item`}>
									Home
								</a>
							</Link>
							<Link href={!user ? '/login' : '/encouragement'}>
								<a
									className={`${
										router.pathname === '/encouragement' ? 'active' : ''
									} navbar-item`}>
									Encouragement
								</a>
							</Link>
							<Link href='/quiz'>
								<a className={`${router.pathname === '/quiz' ? 'active' : ''} navbar-item`}>
									Quiz
								</a>
							</Link>
							{!user && (
								<Link href='/login'>
									<a
										className={`${
											router.pathname === '/login' ? 'active' : ''
										} navbar-item`}>
										Login
									</a>
								</Link>
							)}
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Nav;
