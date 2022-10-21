const Hero = () => {
	return (
		<div className='hero'>
			<button className='hero-text group'>
				<h1 className='title text-2xl sm:pb-2 sm:text-5xl'>Little Lanae</h1>

				<p className='mx-2 block text-sm group-focus:hidden sm:text-lg lg:text-2xl'>
					I had a little bit of free time, so I made this website to show my appreciation for
					you being a <span>somewhat decent </span> aunt.
				</p>

				<p className='mx-2 hidden text-sm group-focus:block sm:text-lg lg:text-2xl'>
					All Jokes aside I really do love you and I&#39;m truly amzaed at how far you have
					come
				</p>
			</button>

			<img className='hero-img sm:hidden' src='/images/hero/mobile.png' alt='Ahsha Ford' />

			<img
				className='order-[-3] hidden w-[10%] max-w-[90px] rotate-[135deg] self-start sm:inline-block'
				src='/images/hero/right-angle.svg'
				alt=''
			/>
			<div className='group relative order-[3] mt-10 hidden w-[125%] max-w-[250px] self-start sm:flex'>
				<img
					className='hero-img_desk hero-img-animation opacity-100 blur-0 group-hover:opacity-20 group-hover:blur-md'
					src='/images/hero/desk.png'
					alt='Ahsha Ford'
				/>
				<img
					className='hero-img_desk hero-img-animation absolute opacity-0 blur-md group-hover:opacity-100 group-hover:blur-none'
					src='/images/hero/desk5.png'
					alt='Ahsha Ford'
				/>
			</div>
			<div className='group  relative order-[-1] mb-[3.5rem] hidden w-[125%] max-w-[250px] self-end sm:flex'>
				<img
					className='hero-img_desk hero-img-animation opacity-100 blur-0 group-hover:opacity-20 group-hover:blur-md'
					src='/images/hero/desk3.png'
					alt='Ahsha Ford'
				/>
				<img
					className='hero-img_desk hero-img-animation absolute opacity-0 blur-md group-hover:opacity-100 group-hover:blur-none'
					src='/images/hero/desk4.png'
					alt='Ahsha Ford'
				/>
			</div>

			<img
				className='order-[4] hidden w-[10%] max-w-[90px] rotate-[315deg] self-end sm:inline-block'
				src='/images/hero/right-angle.svg'
				alt=''
			/>
		</div>
	);
};

export default Hero;
