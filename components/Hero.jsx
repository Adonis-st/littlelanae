import Image from 'next/image';

const Hero = () => {
	return (
		<>
			<div className='hero mb-10'>
				<div className='hero-text'>
					<h1 className='title text-2xl sm:pb-2 sm:text-5xl'>Little Lanae</h1>
					<p className='text-sm sm:text-lg lg:text-2xl'>
						I had a little bit of free time, so I made this website to show my appreciation
						for you being a <span>somewhat decent </span> aunt.
					</p>
				</div>
				<img className='hero-img sm:hidden' src='/images/hero/mobile.png' alt='' />
				<img
					className='order-[-3] hidden w-[10%] max-w-[90px] rotate-[135deg] self-start sm:inline-block'
					src='/images/hero/right-angle.svg'
					alt=''
				/>
				<img
					className='hero-desk-img mt-10 self-start sm:order-[3]'
					src='/images/hero/desk1.png'
					alt=''
				/>
				<img
					className='hero-desk-img mb-[3.5rem] self-end sm:order-[-1]'
					src='/images/hero/desk2.png'
					alt=''
				/>
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
