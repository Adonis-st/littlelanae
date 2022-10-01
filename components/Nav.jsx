import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdMenu, MdOutlineLightMode, MdDarkMode, MdMenuOpen } from 'react-icons/md';

const Nav = () => {
	const [darkMode, setDarkMode] = useState(null);

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

	const handleThemeSwitch = () => {
		setDarkMode(darkMode === 'dark' ? 'light' : 'dark');
	};

	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleClick = () => {
		setIsOpen((prevState) => !prevState);
	};
	return (
		<>
			<nav className='navbar'>
				<button className='ml-1 sm:hidden' onClick={handleClick}>
					{isOpen ? <MdMenuOpen className='h-6 w-6 ' /> : <MdMenu className='h-6 w-6' />}
				</button>
				<button className='mr-3 sm:order-3' onClick={handleThemeSwitch}>
					{darkMode === 'dark' ? (
						<MdDarkMode className='h-5 w-5' />
					) : (
						<MdOutlineLightMode className='h-5 w-5 text-rose-300' />
					)}
				</button>
				<div
					className={`${isOpen ? '' : 'hidden'} w-full sm:inline-flex sm:w-auto sm:flex-grow`}>
					<div className='ml-3 flex flex-col pt-2 sm:flex-row'>
						<Link href='/'>
							<a className={`${router.pathname === '/' ? 'active' : ''} navbar-item`}>
								Home
							</a>
						</Link>
						<Link href='/encouragement'>
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
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
