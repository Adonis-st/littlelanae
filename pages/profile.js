export default function profile() {
	return (
		<div className='mx-auto mt-4 h-[80vh] w-11/12 shadow-xl sm:w-10/12'>
			<div className='flex flex-col items-center'>
				<h1 className=' text-xl'>Edit Profile</h1>
				<div className='relative mt-2 flex w-32 shrink-0 items-center justify-center rounded-full p-2 hover:scale-105'>
					<img
						src='/images/profile.jpeg'
						alt='avatar'
						referrerPolicy='no-referrer'
						className=' inline-block aspect-square w-full shrink-0  rounded-full object-cover  shadow-xl'
					/>
					<div className='absolute flex h-1/2 w-[89px] shrink-0 items-end self-end  rounded-b-full  '>
						<div className='h-[40%] w-full rounded-[50%/100%] rounded-t-none bg-black text-center text-sm tracking-wider  text-white opacity-[.9] '>
							Edit
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
