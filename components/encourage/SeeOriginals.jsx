const SeeOriginals = ({ aOriginal, seeOrginals, setSeeOrginals }) => {
	return (
		<div className='mx-auto flex justify-center pb-1 pt-3 sm:py-6 lg:py-7'>
			<div className='group flex rounded-full border border-blue-500  text-xs shadow-lg  dark:border-rose-300 sm:text-sm xl:text-base  '>
				{aOriginal ? (
					<>
						<button
							onClick={() => setSeeOrginals(false)}
							className={`${
								seeOrginals
									? 'bg-white text-blue-500   dark:text-rose-300'
									: 'bg-blue-500 text-white dark:bg-rose-300'
							}  rounded-full px-2 py-1`}>
							A.F. Fanclub
						</button>

						<button
							onClick={() => setSeeOrginals(true)}
							className={`${
								seeOrginals
									? 'bg-blue-500 text-white dark:bg-rose-300'
									: 'bg-white text-blue-500  dark:text-rose-300'
							} group relative rounded-full px-2  py-1`}>
							The Originals
							<span className='absolute z-[1] mt-[-3rem] hidden w-max rounded-full border border-blue-500 bg-white px-1 text-[.6rem] text-blue-500 group-hover:block dark:border-rose-300 dark:text-rose-300 lg:mt-[-3.5rem] lg:text-xs'>
								Access Granted
							</span>
						</button>
					</>
				) : (
					<>
						<button className='rounded-full bg-blue-500 px-2 py-1 text-white dark:bg-rose-300'>
							A.F. Fanclub
						</button>
						<button className='group relative cursor-not-allowed rounded-full bg-white px-2 py-1 text-blue-500 dark:text-rose-300'>
							The Originals
							<span className='absolute z-[1] mt-[-3rem] hidden  w-max rounded-2xl bg-red-500 px-1 text-[.6rem] text-white group-hover:block lg:mt-[-3.5rem] lg:text-xs'>
								Access Denied
							</span>
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default SeeOriginals;
