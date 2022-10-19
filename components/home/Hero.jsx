import { useState } from 'react';

const Hero = () => {
	const [displayImg, setDisplayImg] = useState({
		img1: '/images/hero/desk.png',
		img2: '/images/hero/desk3.png',
	});
	return (
		<>
			<div className='hero mb-10 '>
				<button className='hero-text group'>
					<h1 className='title text-2xl sm:pb-2 sm:text-5xl'>Little Lanae</h1>

					<p className='mx-2 block text-sm group-focus:hidden sm:text-lg lg:text-2xl'>
						I had a little bit of free time, so I made this website to show my appreciation
						for you being a <span>somewhat decent </span> aunt.
					</p>

					<p className='mx-2 hidden text-sm  group-focus:block sm:text-lg lg:text-2xl'>
						All Jokes aside I really do love you and I&#39;m truly amzaed at how far you have
						come
					</p>
				</button>

				<img className='hero-img sm:hidden ' src='/images/hero/mobile.png' alt='' />

				<img
					className='order-[-3] hidden w-[10%] max-w-[90px] rotate-[135deg] self-start sm:inline-block'
					src='/images/hero/right-angle.svg'
					alt=''
				/>
				<div className='group relative order-[3] mt-10 flex w-[125%] max-w-[250px] self-start '>
					<img
						className='hero-img_desk hero-img-animation opacity-100 blur-0 group-hover:opacity-20 group-hover:blur-md'
						src={displayImg.img1}
						alt=''
					/>
					<img
						className='hero-img_desk hero-img-animation absolute opacity-0 blur-md group-hover:opacity-100 group-hover:blur-none'
						src='/images/hero/desk5.png'
						alt=''
					/>
				</div>
				<div className='group relative order-[-1]  mb-[3.5rem] flex w-[125%] max-w-[250px] self-end'>
					<img
						className='hero-img_desk hero-img-animation opacity-100 blur-0 group-hover:opacity-20 group-hover:blur-md'
						src={displayImg.img2}
						alt=''
					/>
					<img
						className='hero-img_desk hero-img-animation absolute opacity-0 blur-md group-hover:opacity-100 group-hover:blur-none'
						src='/images/hero/desk4.png'
						alt=''
					/>
				</div>

				<img
					className='order-[4] hidden w-[10%] max-w-[90px] rotate-[315deg] self-end sm:inline-block'
					src='/images/hero/right-angle.svg'
					alt=''
				/>
			</div>
		</>
	);
};

export default Hero;
